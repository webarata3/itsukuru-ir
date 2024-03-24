import { searchStationName, searchTimetable } from './station_util';
import TrainBoard from './train_board';
import { Station, Timetable, TrainTime } from './type';

type Params = {
  isHoliday: boolean;
  stationId: number;
  time: string;
  stations: Station[];
  timetables: Timetable[];
  isEast: boolean;
};

const TrainBoards = ({
  isHoliday,
  stationId,
  time,
  stations,
  timetables,
  isEast,
}: Params): React.ReactElement => {
  const tables = searchTimetable(timetables, stationId, time);

  const to = stations.filter(station => station.stationId === stationId)[0][
    isEast ? 'east' : 'west'
  ];

  const trains: TrainTime[] = [];
  if (tables.length >= 1) {
    const first = {
      time: tables[0].stationTimes.filter(v => v.stationId === stationId)[0].time,
      toStationName: searchStationName(
        tables[0].stationTimes[tables[0].stationTimes.length - 1].stationId,
        stations,
      ),
    };
    trains.push(first);
  }
  if (tables.length >= 2) {
    const first = {
      time: tables[1].stationTimes.filter(v => v.stationId === stationId)[0].time,
      toStationName: searchStationName(
        tables[1].stationTimes[tables[1].stationTimes.length - 1].stationId,
        stations,
      ),
    };
    trains.push(first);
  }

  return (
    <section className="mx-auto w-96 bg-black p-2 mb-2">
      <h2 className="text-white text-2xl text-center">{to}方面</h2>
      {trains.map(train => (
        <TrainBoard time={time} trainTime={train} key={to} />
      ))}
    </section>
  );
};

export default TrainBoards;
