import { Station, SuspendedType, Timetable } from './type';

const canOperate = (
  day: number,
  suspendedType: SuspendedType,
  stationId: number,
  isNationalHoliday: boolean,
): boolean => {
  switch (suspendedType) {
    case SuspendedType.All:
      return true;
    case SuspendedType.Holiday:
      return day >= 1 && day <= 5 && !isNationalHoliday;
    case SuspendedType.HolidayTsubata:
      if (day >= 1 && day <= 5 && !isNationalHoliday) return true;
      // 金沢津幡間のみ運休
      return stationId < 16 || stationId > 19;
    case SuspendedType.Weekday:
      return day === 0 || day === 6 || isNationalHoliday;
  }
};

const canOperateTrain = (
  date: string,
  suspendedType: SuspendedType,
  stationId: number,
  nationalHolidays: string[],
): boolean => {
  const day = parseInt(date.split('-')[2]);
  const isNationalHoliday = nationalHolidays.includes(date);
  return canOperate(day, suspendedType, stationId, isNationalHoliday);
};

const searchTimetable = (
  timetables: Timetable[],
  stationId: number,
  time: string,
  date: string,
  nationalHolidays: string[],
): Timetable[] =>
  timetables
    .filter(timetable =>
      canOperateTrain(date, timetable.suspendedType, stationId, nationalHolidays),
    )
    .filter(
      timetable =>
        timetable.stationTimes.filter(
          stationTime =>
            stationTime.stationId === stationId &&
            (stationTime.time.length === 5
              ? stationTime.time >= time
              : '0' + stationTime.time >= time),
        ).length === 1,
    )
    .filter(
      timetable =>
        timetable.stationTimes[timetable.stationTimes.length - 1].stationId !== stationId,
    );

const dateToIsoDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;

const dateToIsoTime = (date: Date): string =>
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const searchStation = (stationId: number, stations: Station[]): Station | null => {
  const findStations = stations.filter(station => station.stationId === stationId);
  if (findStations.length !== 1) return null;
  return findStations[0];
};

const searchStationName = (stationId: number, stations: Station[]): string => {
  const result = searchStation(stationId, stations);
  if (result === null) return '????';
  return result.stationName;
};

export {
  canOperateTrain,
  dateToIsoDate,
  dateToIsoTime,
  searchStation,
  searchStationName,
  searchTimetable,
};
