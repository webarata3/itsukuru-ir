import { useState } from 'react';
import AllStations from './all_stations';
import StationBoard from './station_board';
import TrainBoards from './train_boards';
import { Station, Timetable } from './type';

type Params = {
  date: string | null;
  time: string | null;
  stations: Station[];
  eastTimetables: Timetable[];
  westTimetables: Timetable[];
};

const StationTimetable = ({
  date,
  time,
  stations,
  eastTimetables,
  westTimetables,
}: Params): React.ReactElement => {
  const [stationId, setStationId] = useState<number>(16);

  const currentPosition = (position: GeolocationPosition) => {
    const s = getNearStationId(position.coords.latitude, position.coords.longitude, stations);
    changeStationId(s);
  };

  const changeStationId = (newStationId: number) => setStationId(newStationId);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            navigator.geolocation.getCurrentPosition(currentPosition);
          }}
        ></button>
      </div>
      <AllStations stations={stations} changeStationId={changeStationId} />
      <StationBoard stationId={stationId} stations={stations} changeStationId={changeStationId} />
      {date && time && (
        <TrainBoards
          stationId={stationId}
          stations={stations}
          date={date}
          time={time}
          timetables={eastTimetables}
          isEast={true}
        ></TrainBoards>
      )}
      {date && time && (
        <TrainBoards
          stationId={stationId}
          stations={stations}
          date={date}
          time={time}
          timetables={westTimetables}
          isEast={false}
        ></TrainBoards>
      )}
    </>
  );
};

const getNearStationId = (latitude: number, longitude: number, stations: Station[]): number =>
  stations
    .filter(s => s.latitude !== null)
    .map(s => {
      return {
        stationId: s.stationId,
        distance: calcDistance(latitude, longitude, s.latitude!, s.longitude!),
      };
    })
    .sort((a, b) => a.distance - b.distance)[0].stationId;

const calcDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const x = (x2 - x1) ** 2;
  const y = (y2 - y1) ** 2;
  return Math.sqrt(x + y);
};

export default StationTimetable;
