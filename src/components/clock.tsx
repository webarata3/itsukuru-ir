import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { dateToIsoDate, dateToIsoTime } from './station_util';

type Param = {
  date: string | null;
  time: string | null;
  setDate: Dispatch<SetStateAction<string | null>>;
  setTime: Dispatch<SetStateAction<string | null>>;
};

const Clock = ({ date, time, setDate, setTime }: Param): React.ReactElement => {
  const [second, setSecond] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setDate(current => {
        const newDate = dateToIsoDate(now);
        if (current === newDate) return current;
        return newDate;
      });
      setTime(current => {
        const newTime = dateToIsoTime(now);
        if (current === newTime) return current;
        return newTime;
      });
      setSecond(current => {
        const newSecond = String(now.getSeconds()).padStart(2, '0');
        if (current === newSecond) return current;
        return newSecond;
      });
      setDay(current => {
        const newDay = now.getDay();
        if (current === newDay) return current;
        return newDay;
      });
    }, 100);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <section>
      <section className="grid grid-cols-[8rem_1fr_8rem]">
        <time dateTime={`${date}T${time}:${second}`}>{viewDate(date, day)}</time>
        <time
          dateTime={`${date}T${time}:${second}`}
          className="justify-self-center place-self-center"
        >
          {viewTime(time, second)}
        </time>
      </section>
    </section>
  );
};

const viewDate = (date: string | null, day: number | null): React.ReactElement => {
  if (date === null) return <></>;
  const splitDates = date.split('-');
  return (
    <>
      <div>
        <span className="text-xl">{parseInt(splitDates[0])}</span>
        <span className="text-sm mx-1">年</span>
      </div>
      <div>
        <span className="text-xl">{parseInt(splitDates[1])}</span>
        <span className="text-sm mx-1">月</span>
        <span className="text-xl">{parseInt(splitDates[2])}</span>
        <span className="text-sm mx-1">日</span>
      </div>
      <div>
        <span className="text-main text-2xl">{getYobiLabel(day)}</span>
        <span className="text-sm mx-1">曜日</span>
      </div>
    </>
  );
};
const viewTime = (time: string | null, second: string | null): React.ReactElement => {
  if (time === null || second === null) return <></>;
  const splitTimes = time.split(':');
  return (
    <>
      <span className="text-main text-7xl">{splitTimes[0]}</span>
      <span className="mx-1 text-5xl">:</span>
      <span className="text-main text-7xl">{splitTimes[1]}</span>
      <span className="text-2xl ml-2">{second}</span>
    </>
  );
};

const getYobiLabel = (day: number | null) => ['日', '月', '火', '水', '木', '金', '土'][day ?? 0];

export default Clock;
