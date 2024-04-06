import {
  canOperateTrain,
  dateToIsoDate,
  dateToIsoTime,
  searchStation,
  searchStationName,
} from '@/components/station_util';
import { Station, SuspendedType, Timetable } from '@/components/type';
import { expect, test, vi } from 'vitest';

const nationalHolidays = ['2024-01-01', '2024-01-08', '2024-02-12'];

test('canOperateTrain 休日運休 土日以外', () => {
  const result = canOperateTrain('2024-04-01', SuspendedType.Holiday, 1, nationalHolidays);

  expect(result).toBe(true);
});

test('canOperateTrain 休日運休 土', () => {
  const result = canOperateTrain('2024-04-06', SuspendedType.Holiday, 1, nationalHolidays);

  expect(result).toBe(false);
});

test('canOperateTrain 休日運休 日', () => {
  const result = canOperateTrain('2024-03-31', SuspendedType.Holiday, 1, nationalHolidays);

  expect(result).toBe(false);
});

test('canOperateTrain 休日運休 祝日', () => {
  const result = canOperateTrain('2024-01-8', SuspendedType.Holiday, 1, nationalHolidays);

  expect(result).toBe(false);
});

test('canOperateTrain 金沢津幡休日運休 平日 金沢津幡以外', () => {
  const result = canOperateTrain('2024-04-02', SuspendedType.HolidayTsubata, 1, nationalHolidays);

  expect(result).toBe(true);
});

test('canOperateTrain 金沢津幡休日運休 祝日 金沢津幡以外', () => {
  const result = canOperateTrain('2024-01-02', SuspendedType.HolidayTsubata, 1, nationalHolidays);

  expect(result).toBe(true);
});

test('canOperateTrain 金沢津幡休日運休 平日 金沢津幡', () => {
  const result = canOperateTrain('2024-04-02', SuspendedType.HolidayTsubata, 16, nationalHolidays);

  expect(result).toBe(true);
});

test('canOperateTrain 金沢津幡休日運休 休日 金沢津幡以外', () => {
  const result = canOperateTrain('2024-03-31', SuspendedType.HolidayTsubata, 15, nationalHolidays);

  expect(result).toBe(true);
});

test('canOperateTrain 金沢津幡休日運休 休日 金沢', () => {
  const result = canOperateTrain('2024-03-31', SuspendedType.HolidayTsubata, 16, nationalHolidays);

  expect(result).toBe(false);
});

test('canOperateTrain 金沢津幡休日運休 休日 津幡', () => {
  const result = canOperateTrain('2024-03-31', SuspendedType.HolidayTsubata, 19, nationalHolidays);

  expect(result).toBe(false);
});

test('canOperateTrain 金沢津幡休日運休 祝日 津幡', () => {
  const result = canOperateTrain('2024-01-08', SuspendedType.HolidayTsubata, 19, nationalHolidays);

  expect(result).toBe(false);
});

const timetables: Timetable[] = [
  {
    suspendedType: 0,
    stationTimes: [
      {
        stationId: 1,
        time: '01:01',
      },
      {
        stationId: 2,
        time: '01:11',
      },
      {
        stationId: 3,
        time: '01:22',
      },
    ],
  },
  {
    suspendedType: 0,
    stationTimes: [
      {
        stationId: 1,
        time: '01:11',
      },
      {
        stationId: 2,
        time: '01:22',
      },
      {
        stationId: 3,
        time: '01:33',
      },
    ],
  },
  {
    suspendedType: 0,
    stationTimes: [
      {
        stationId: 1,
        time: '02:11',
      },
      {
        stationId: 2,
        time: '02:22',
      },
      {
        stationId: 3,
        time: '02:33',
      },
    ],
  },
];

test('searchTimeTable 平日 01:00', () => {});

test('dateToIsoDate', () => {
  vi.setSystemTime(new Date('2024/01/02 03:04:56'));
  const result = dateToIsoDate(new Date());

  expect(result).toBe('2024-01-02');
});

test('dateToIsoTime', () => {
  vi.setSystemTime(new Date('2024/01/02 03:04:56'));
  const result = dateToIsoTime(new Date());

  expect(result).toBe('03:04');
});

const stations: Station[] = [
  {
    stationId: 1,
    stationName: '1番駅',
    east: '1番駅の東',
    west: '1番駅の西',
    ir: true,
    latitude: 10.0,
    longitude: 10.0,
  },
  {
    stationId: 3,
    stationName: '3番駅',
    east: '3番駅の東',
    west: '3番駅の西',
    ir: true,
    latitude: 10.0,
    longitude: 10.0,
  },
];

test('searchStation id=1', () => {
  const station = searchStation(1, stations);
  expect(station).not.toBe(null);
  expect(station!.stationId).toBe(1);
  expect(station!.stationName).toBe('1番駅');
});

test('searchStation id=3', () => {
  const station = searchStation(3, stations);
  expect(station).not.toBe(null);
  expect(station!.stationId).toBe(3);
  expect(station!.stationName).toBe('3番駅');
});

test('searchStation error', () => {
  const station = searchStation(2, stations);
  expect(station).toBe(null);
});

test('searchStationName id=1', () => {
  const stationName = searchStationName(1, stations);
  expect(stationName).toBe('1番駅');
});

test('searchStationName id=3', () => {
  const stationName = searchStationName(3, stations);
  expect(stationName).toBe('3番駅');
});

test('searchStationName error', () => {
  const station = searchStationName(2, stations);
  expect(station).toBe('????');
});
