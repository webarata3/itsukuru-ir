import { searchStation } from './station_util';
import { Station } from './type';

type Props = {
  stationId: number;
  stations: Station[];
  changeStationId: (newStationId: number) => void;
};

const StationBoard = ({ stationId, stations, changeStationId }: Props) => {
  const station = searchStation(stationId, stations);
  let eastStation: Station | null = null;
  let westStation: Station | null = null;
  if (station !== null) {
    const index =
      stations
        .map((s, i) => (s.stationId === station.stationId ? i : null))
        .filter(v => v !== null)[0] ?? 0;
    if (stations[index + 1] !== undefined && stations[index + 1].ir) {
      eastStation = stations[index + 1];
    }
    if (stations[index - 1] !== undefined && stations[index - 1].ir) {
      westStation = stations[index - 1];
    }
  }

  return (
    <section className="grid grid-rows-[5rem_2rem] w-72 mx-auto text-center border-black border-[1px] mb-4">
      <h2 className="text-3xl place-self-center">{station?.stationName ?? ''}</h2>
      <div className="bg-main flex justify-between text-white px-2">
        {westStation ? (
          <button onClick={() => changeStationId(westStation!.stationId)}>
            {westStation.stationName}
          </button>
        ) : (
          <span />
        )}
        {eastStation ? (
          <button onClick={() => changeStationId(eastStation!.stationId)}>
            {eastStation.stationName}
          </button>
        ) : (
          <span />
        )}
      </div>
    </section>
  );
};

export default StationBoard;
