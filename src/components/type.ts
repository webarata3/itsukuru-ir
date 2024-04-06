type Station = {
  stationId: number;
  stationName: string;
  east: string | null;
  west: string | null;
  latitude: number | null;
  longitude: number | null;
  ir: boolean;
};

type StationTime = {
  stationId: number;
  time: string;
};

enum SuspendedType {
  All = 0,
  Holiday = 1,
  HolidayTsubata = 2,
  Weekday = 3,
}

type Timetable = {
  suspendedType: SuspendedType;
  stationTimes: StationTime[];
};

type TrainTime = {
  time: string;
  toStationName: string;
};

export type { Station, StationTime, Timetable, TrainTime };

export { SuspendedType };
