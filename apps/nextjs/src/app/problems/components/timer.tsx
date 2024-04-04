import * as React from "react";

interface TimerProps {
  time: number;
}

function Timer({ time }: TimerProps) {
  const [min, setMin] = React.useState<number>(0);
  const [sec, setSec] = React.useState<number>(0);

  const makeTimeForm = (time: number): void => {
    if (time < 60) {
      setMin(0);
      setSec(time);
    } else {
      const min = Math.floor(time / 60);
      const sec = time - min * 60;
      setSec(sec);
      setMin(min);
    }
  };
  React.useEffect((): void => {
    makeTimeForm(time);
  }, [time]);

  return (
    <div>
      <span className="time">{min}</span>
      <span className="unit text-xs">min : </span>
      <span className="time right">{sec}</span>
      <span className="unit text-xs">sec</span>
    </div>
  );
}

export default Timer;
