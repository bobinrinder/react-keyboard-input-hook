import { useEffect, useState } from "react";
import "./Buttons.js";

export default function useKey(handleKeyCallback = null, type = "Up") {
  // ensure valid event type
  if (type !== "Up" && type !== "Down" && type !== "Repeat") {
    type = "Up";
  }
  // init state
  const [state, setState] = useState({
    keyCode: null,
    keyCodeHistory: [],
    code: null,
    codeHistory: []
  });

  useEffect(() => {
    const handleKey = e => {
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
      if (handleKeyCallback && typeof handleKeyCallback == "function") {
        handleKeyCallback({
          keyName: code,
          keyCode
        });
      }
    };

    // register event listener
    window.addEventListener("key" + type, handleKey);
    // cleanup event listener
    return () => window.removeEventListener("key" + type, handleKey);
  }, [handleKeyCallback, type]);

  return {
    keyCode: state.keyCode,
    keyCodeHistory: state.keyCodeHistory,
    keyName: state.code,
    codeHistory: state.codeHistory
  };
}

export function useKeyUp(handleKeyUpCallback = null) {
  return useKey(handleKeyUpCallback, "Up");
}

export function useKeyDown(handleKeyDownCallback = null) {
  return useKey(handleKeyDownCallback, "Down");
}

export function useKeyRepeat(handleKeyRepeatCallback = null) {
  return useKey(handleKeyRepeatCallback, "Repeat");
}
