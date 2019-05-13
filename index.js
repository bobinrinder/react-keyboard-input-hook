import { useEffect, useState } from "react";
import "./Buttons.js";

export default function useKeyUp(handleKeyUpCallback = null) {
  const [state, setState] = useState({
    keyCode: null,
    keyCodeHistory: [],
    code: null,
    codeHistory: []
  });

  useEffect(() => {
    const handleKeyUp = e => {
      // get key details from event
      const keyCode = e.detail.keyCode;
      const code = e.detail.code || "UnknownKey";
      // update state with new key details
      setState(prevState => {
        return {
          keyCode,
          keyCodeHistory: [...prevState.keyCodeHistory, keyCode],
          code,
          codeHistory: [...prevState.codeHistory, code]
        };
      });

      // handle callback (if exists)
      if (handleKeyUpCallback && typeof handleKeyUpCallback == "function") {
        handleKeyUpCallback({
          keyName: code,
          keyCode
        });
      }
    };

    // register event listener
    window.addEventListener("keyUp", handleKeyUp);
    // cleanup event listener
    return () => window.removeEventListener("keyUp", handleKeyUp);
  }, [handleKeyUpCallback]);

  return {
    currentKeyCode: state.keyCode,
    keyCodeHistory: state.keyCodeHistory,
    currentKeyName: state.code,
    codeHistory: state.codeHistory
  };
}
