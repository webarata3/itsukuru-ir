import { Station, Timetable } from './type';

const searchTimetable = (timetables: Timetable[], stationId: number, time: string): Timetable[] =>
  timetables
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

const searchStationName = (stationId: number, stations: Station[]): string => {
  const findStations = stations.filter(station => station.stationId === stationId);
  if (findStations.length !== 1) return '?????';
  return findStations[0].stationName;
};

export { dateToIsoDate, dateToIsoTime, searchStationName, searchTimetable };
