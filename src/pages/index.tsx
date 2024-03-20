import { dateToIsoDate, dateToIsoTime, searchStationName } from '@/components/station_util';
import TrainBoards from '@/components/train_boards';
import { Station, Timetable } from '@/components/type';
import { promises as fs } from 'fs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { AppProps } from 'next/app';
import { Kosugi_Maru } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const kosugiMaru = Kosugi_Maru({
  weight: ['400'],
  subsets: ['latin'],
});

type Param = {
  stations: Station[];
  eastTimetables: Timetable[];
  westTimetables: Timetable[];
};

export const getStaticProps = (async context => {
  const file1 = await fs.readFile(process.cwd() + '/api/station.json', 'utf8');
  const stations: Station[] = JSON.parse(file1);
  const file2 = await fs.readFile(process.cwd() + '/api/east.json', 'utf8');
  const eastTimetables: Timetable[] = JSON.parse(file2);
  const file3 = await fs.readFile(process.cwd() + '/api/west.json', 'utf8');
  const westTimetables: Timetable[] = JSON.parse(file3);
  const param = { stations, eastTimetables, westTimetables };
  return { props: { param } };
}) satisfies GetStaticProps<{
  param: Param;
}>;

const Home = ({
  Component,
  pageProps,
  param,
}: AppProps & InferGetStaticPropsType<typeof getStaticProps>) => {
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [stationId, setStationId] = useState<number>(16);

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
    }, 100);
    return () => clearTimeout(timerId);
  }, []);

  const currentPosition = (position: GeolocationPosition) => {
    const s = getNearStationId(position.coords.latitude, position.coords.longitude, param.stations);
    setStationId(s);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>いつくるIR</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#1296dc" />
      </Head>
      <main className={`${kosugiMaru.className}`}>
        <div>
          <span>{date}</span>
          <span> </span>
          <span>{time}</span>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(currentPosition);
            }}
          >
            現在地
          </button>
        </div>
        <div>{searchStationName(stationId, param.stations)}</div>
        <div>東</div>
        {time && (
          <TrainBoards
            isHoliday={false}
            stationId={stationId}
            stations={param.stations}
            time={time}
            timetables={param.eastTimetables}
          ></TrainBoards>
        )}
        <div>西</div>
        {time && (
          <TrainBoards
            isHoliday={false}
            stationId={stationId}
            stations={param.stations}
            time={time}
            timetables={param.westTimetables}
          ></TrainBoards>
        )}
      </main>
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

export default Home;
