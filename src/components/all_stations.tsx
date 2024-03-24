import { Station } from './type';

type Props = {
  stations: Station[];
  changeStationId: (newStationId: number) => void;
};

const AllStations = ({ stations, changeStationId }: Props) => {
  return (
    <section className="overflow-x-scroll overflow-y-hidden mb-2 p-2 bg-header">
      <ul className="flex gap-x-2">
        {stations
          .filter(station => station.ir)
          .map(station => (
            <li
              className="grid min-w-28 grid-rows-[2.2rem_1rem] border-[1px] border-black"
              key={station.stationId}
              onClick={() => changeStationId(station.stationId)}
            >
              <span className="place-self-center">{station.stationName}</span>
              <span className="bg-main"></span>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default AllStations;
