import { useEffect, useState } from "react";

export const FIRE_TV_KEY_CODES = [8, 13, 37, 38, 39, 40, 179, 227, 228];

export default function useKey(
  handleKeyCallback = null,
  keyEvent = "keyup",
  whitelist = [],
  blacklist = []
) {
  // ensure valid event keyEvent
  if (keyEvent !== "keyup" && keyEvent !== "keydown") {
    console.warn(
      "useKey keyEvent invalid, assumed keyEvent 'keydown' as fallback."
    );
    keyEvent = "keydown";
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
    // check if window and dom available (to exit early on Server-Side-Rendering)
    if (
      !(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
      )
    ) {
      return null;
    }

    const handleKey = e => {
      // get key details from event
      const keyCode = e.keyCode;
      const code = e.code || "UnknownKey";

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
          keyCode,
          e
        });
      }
    };

    // register event listener
    window.addEventListener(keyEvent, handleKey);
    // cleanup event listener
    return () => window.removeEventListener(keyEvent, handleKey);
  }, [handleKeyCallback, keyEvent, blacklist, whitelist]);

  return {
    keyCode: state.keyCode,
    keyCodeHistory: state.keyCodeHistory,
    keyName: state.code,
    codeHistory: state.codeHistory
  };
}

export function useKeyUp(
  handleKeyUpCallback = null,
  whitelist = [],
  blacklist = []
) {
  return useKey(handleKeyUpCallback, "keyup", whitelist, blacklist);
}

export function useKeyDown(
  handleKeyDownCallback = null,
  whitelist = [],
  blacklist = []
) {
  return useKey(handleKeyDownCallback, "keydown", whitelist, blacklist);
}

export function useFireTvKeyUp(
  handleKeyDownCallback = null,
  whitelist = FIRE_TV_KEY_CODES,
  blacklist = []
) {
  return useKey(handleKeyDownCallback, "keyup", whitelist, blacklist);
}

export function useFireTvKeyDown(
  handleKeyDownCallback = null,
  whitelist = FIRE_TV_KEY_CODES,
  blacklist = []
) {
  return useKey(handleKeyDownCallback, "keydown", whitelist, blacklist);
}
