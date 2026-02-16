import { useTimersContext } from "../store/timers-context.tsx";
import Timer from "./Timer.tsx";

export default function Timers() {
  const { timers } = useTimersContext();

  return (
    <ul>
      {timers.map((timer) => (
        <Timer {...timer} />
      ))}
    </ul>
  );
}
