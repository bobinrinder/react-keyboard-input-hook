import { useEffect, useState } from "react";
import "./Buttons.js";

export default function useKey(
  handleKeyCallback = null,
  type = "Up",
  whitelist = [],
  blacklist = []
) {
  // ensure valid event type
  if (type !== "Up" && type !== "Down" && type !== "Repeat") {
    console.warn("useKey event type invalid, assumed type 'Up' instead");
    type = "Up";
  }
  // ensure only white- OR blacklist are set
  if (whitelist.length > 0 && blacklist.length > 0) {
    console.warn("White- and blacklist arrays > 0, emptied blacklist!");
    blacklist = [];
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

      // check if white or blacklisted
      if (whitelist.length > 0 && whitelist.indexOf(keyCode) === -1) {
        return;
      }
      if (blacklist.length > 0 && blacklist.indexOf(keyCode) > -1) {
        return;
      }

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
  }, [handleKeyCallback, type, blacklist, whitelist]);

  return {
    keyCode: state.keyCode,
    keyCodeHistory: state.keyCodeHistory,
    keyName: state.code,
    keyNameHistory: state.codeHistory
  };
}

export function useKeyUp(
  handleKeyUpCallback = null,
  whitelist = [],
  blacklist = []
) {
  return useKey(handleKeyUpCallback, "Up", whitelist, blacklist);
}

export function useKeyDown(
  handleKeyDownCallback = null,
  whitelist = [],
  blacklist = []
) {
  return useKey(handleKeyDownCallback, "Down", whitelist, blacklist);
}

export function useKeyRepeat(
  handleKeyRepeatCallback = null,
  whitelist = [],
  blacklist = []
) {
  return useKey(handleKeyRepeatCallback, "Repeat", whitelist, blacklist);
}
