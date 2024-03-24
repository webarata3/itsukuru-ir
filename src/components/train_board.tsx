import { TrainTime } from './type';

type Params = {
  time: string;
  trainTime: TrainTime;
};

const TrainBoard = ({ time, trainTime }: Params): React.ReactElement => {
  const [hour, minute] = time.split(':').map(t => parseInt(t));
  const [trainHour, trainMinute] = trainTime.time.split(':').map(t => parseInt(t));
  const afterMinute = trainMinute - minute + (trainHour - hour) * 60;

  return (
    <section className="p-1 text-center">
      <span>
        <time className="text-orange text-3xl">{trainTime.time}</time>
        <span className="text-white ml-1">発</span>
      </span>
      <span className="ml-2 w-32 inline-block">
        <span className="text-green text-2xl">{trainTime.toStationName}</span>
        <span className="text-white ml-1">行</span>
      </span>
      <span className="text-white">
        <span>あと</span>
        <span className="text-2xl mx-1 text-right inline-block w-9">{afterMinute}</span>
        <span>分</span>
      </span>
    </section>
  );
};

export default TrainBoard;
