type Station = {
  stationId: number;
  stationName: string;
  east: string | null;
  west: string | null;
  latitude: number | null;
  longitude: number | null;
};

type StationTime = {
  stationId: number;
  time: string;
};

type Timetable = {
  suspendedType: number;
  stationTimes: StationTime[];
};

type TrainTime = {
  time: string;
  toStationName: string;
};

export type { Station, StationTime, Timetable, TrainTime };
