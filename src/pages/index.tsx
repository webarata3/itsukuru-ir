import '@/app/globals.css';
import Clock from '@/components/clock';
import Header from '@/components/header';
import StationTimetable from '@/components/station_timetable';
import { Station, Timetable } from '@/components/type';
import { promises as fs } from 'fs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { AppProps } from 'next/app';
import { Kosugi_Maru } from 'next/font/google';
import Head from 'next/head';
import { useState } from 'react';

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
      <div
        className={`flex flex-col h-[100dvh] pb-iphone max-w-lg w-screen mx-auto box-border ${kosugiMaru.className}`}
      >
        <main className="flex flex-col h-full w-full text-zinc-700 bg-white">
          <Header></Header>
          <Clock date={date} time={time} setDate={setDate} setTime={setTime} />
          <StationTimetable
            date={date}
            time={time}
            stations={param.stations}
            eastTimetables={param.eastTimetables}
            westTimetables={param.westTimetables}
          ></StationTimetable>
        </main>
      </div>
    </>
  );
};

export default Home;
