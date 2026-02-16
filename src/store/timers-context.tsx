import { createContext, useContext, useReducer } from "react";

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

type Action = {
  type: "ADD_TIMER" | "START_TIMERS" | "STOP_TIMERS";
  payload?: {
    name: string;
    duration: number;
  };
};

function reducer(state: TimersState, action: Action): TimersState {
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [...state.timers],
    };
  }
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
  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ctx: TimersContextValue = {
    timers: state.timers,
    isRunning: state.isRunning,
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

type Timer = {
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
