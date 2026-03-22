import { createContext, useContext, ReactNode } from "react";
import { useRadioPlayer } from "./useRadioPlayer";

type RadioPlayerContextValue = ReturnType<typeof useRadioPlayer>;

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const player = useRadioPlayer();
  return (
    <RadioPlayerContext.Provider value={player}>
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayerContext(): RadioPlayerContextValue {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx)
    throw new Error(
      "useRadioPlayerContext must be used within RadioPlayerProvider",
    );
  return ctx;
}
