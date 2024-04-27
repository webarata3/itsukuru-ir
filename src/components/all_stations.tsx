import React from 'react';
import { Station } from './type';

type Props = {
  stations: Station[];
  changeStationId: (newStationId: number) => void;
};

const AllStations = ({ stations, changeStationId }: Props) => {
  const ref = React.createRef<HTMLAnchorElement>();
  const scrollToBottomOfList = React.useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: 'instant',
      inline: 'center',
    });
  }, [ref]);

  React.useEffect(() => {
    scrollToBottomOfList();
  }, []);

  return (
    <section className="overflow-x-scroll overflow-y-hidden mb-2 p-2 bg-header">
      <div className="flex gap-x-2">
        {stations
          .filter(station => station.ir)
          .map(station => (
            <a
              className="grid min-w-28 grid-rows-[2.2rem_1rem] border-[1px] border-black"
              key={station.stationId}
              onClick={() => changeStationId(station.stationId)}
              ref={station.stationId === 16 ? ref : null}
            >
              <span className="place-self-center">{station.stationName}</span>
              <span className="bg-main"></span>
            </a>
          ))}
      </div>
    </section>
  );
};

export default AllStations;
