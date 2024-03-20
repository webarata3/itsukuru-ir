import { TrainTime } from './type';

type Params = {
  time: string;
  trainTime: TrainTime;
};

const TrainBoard = ({ time, trainTime }: Params): React.ReactElement => {
  return (
    <div>
      <span>{trainTime.time}</span>
      <span>:</span>
      <span>{trainTime.toStationName}</span>
    </div>
  );
};

export default TrainBoard;
