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
      <h3 className="inline">
        <time className="text-orange text-2xl">{trainTime.time}</time>
        <span className="text-white ml-1">発</span>
      </h3>
      <h3 className="ml-2 w-32 inline-block">
        <span className="text-green text-2xl">{trainTime.toStationName}</span>
        <span className="text-white ml-1">行</span>
      </h3>
      <h3 className="text-white inline">
        <span>あと</span>
        <span className="text-xl mx-1 text-right inline-block w-9">{afterMinute}</span>
        <span>分</span>
      </h3>
    </section>
  );
};

export default TrainBoard;
