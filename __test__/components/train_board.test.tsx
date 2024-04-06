import TrainBoard from '@/components/train_board';
import { TrainTime } from '@/components/type';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

test('Page', () => {
  const trainTime: TrainTime = {
    time: '09:13',
    toStationName: '金沢',
  };
  render(<TrainBoard time={'09:01'} trainTime={trainTime} />);
  expect(screen.getByRole('heading', { level: 3, name: '09:13 発' })).toBeDefined();
});
