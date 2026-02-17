import type { Timer } from "../store/timers-context.tsx";
import Container from "./UI/Container.tsx";
import { useEffect, useRef, useState } from "react";

export default function Timer({ name, duration }: Timer) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    const timer = setInterval(function () {
      setRemainingTime((prevTime) => prevTime - 50);
    }, 50);

    interval.current = timer;

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress value={remainingTime} max={duration * 1000}></progress>
      </p>
      <p>{formattedRemainingTime} seconds</p>
    </Container>
  );
}
