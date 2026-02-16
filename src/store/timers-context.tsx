import { createContext, useContext, useReducer } from "react";

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

function timerReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMERS") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }

  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timerState.timers,
    isRunning: timerState.isRunning,

    addTimer(timerData: Timer) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

type StartTimersAction = {
  type: "START_TIMERS";
};

type StopTimersAction = {
  type: "STOP_TIMERS";
};

type AddTimerAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

type TimersContextProviderProps = {
  children: React.ReactNode;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const context = useContext(TimersContext);
  if (!context) {
    throw new Error(
      "useTimersContext must be used within a TimersContextProvider",
    );
  }
  return context;
}
