import { useState } from "react";

const useVisualMode = (FIRST) => {
  const [mode, setMode] = useState(FIRST);
  const [history, setHistory] = useState([FIRST]);

  const transition = (SECOND, replace) => {
    setMode(SECOND);
    if(replace && history.length !== 1){
      setHistory(prev => ([...prev].slice(0, history.length - 1)));
    }
    setHistory(prev => ([...prev, SECOND]));
  };


  const back = () => {
    if (history.length !== 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  };
  

  return { 
    mode,
    transition,
    back 
  };
};

export { useVisualMode }

