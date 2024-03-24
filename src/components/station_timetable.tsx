import { useState } from 'react';
import StationBoard from './station_board';
import TrainBoards from './train_boards';
import { Station, Timetable } from './type';

type Params = {
  time: string | null;
  stations: Station[];
  eastTimetables: Timetable[];
  westTimetables: Timetable[];
};

const StationTimetable = ({
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
      <StationBoard stationId={stationId} stations={stations} changeStationId={changeStationId} />
      {time && (
        <TrainBoards
          isHoliday={false}
          stationId={stationId}
          stations={stations}
          time={time}
          timetables={eastTimetables}
          isEast={true}
        ></TrainBoards>
      )}
      {time && (
        <TrainBoards
          isHoliday={false}
          stationId={stationId}
          stations={stations}
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