import { useState } from "react";

const useVisualMode = (FIRST) => {
  const [mode, setMode] = useState(FIRST);
  const [history, setHistory] = useState(mode);

  const transition = (SECOND) => {
    setMode(SECOND);
    setHistory(mode)
  };

  

  const back = () => {

  };

  return { 
    mode,
    transition 
  };
};

export { useVisualMode }

