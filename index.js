import { useEffect, useState } from "react";
import "./Buttons.js";

export const UP = 38;
export const DOWN = 40;
export const LEFT = 37;
export const RIGHT = 39;
export const SELECT = 13;
export const BACK = 8;
export const REWIND = 227;
export const PLAY_PAUSE = 179;
export const FAST_FORWARD = 228;

// define all keyNames
export const keyNames = [];
keyNames[38] = "UP";
keyNames[40] = "DOWN";
keyNames[37] = "LEFT";
keyNames[39] = "RIGHT";
keyNames[13] = "SELECT";
keyNames[8] = "BACK";
keyNames[227] = "REWIND";
keyNames[179] = "PLAY_PAUSE";
keyNames[228] = "FAST_FORWARD";

export function getKeyNameFromKeyCode(keyCode) {
  if (!keyCode) {
    return null;
  }
  if (keyNames[keyCode]) {
    return keyNames[keyCode];
  } else {
    return "UNKNOWN";
  }
}

export default function useKeyUp(handleKeyUpCallback = null) {
  const [currentKeyCode, setCurrentKeyCode] = useState(null);
  const [keyCodeHistory, setKeyCodeHistory] = useState([]);
  const currentKeyName = getKeyNameFromKeyCode(currentKeyCode);

  useEffect(() => {
    const handleKeyUp = e => {
      const keyCode = e.detail.keyCode;
      setCurrentKeyCode(keyCode);
      setKeyCodeHistory(prevState => [...prevState, keyCode]);

      if (handleKeyUpCallback && typeof handleKeyUpCallback == "function") {
        handleKeyUpCallback(getKeyNameFromKeyCode(keyCode));
      }
    };

    // register event listener
    window.addEventListener("keyUp", handleKeyUp);
    // cleanup event listener
    return () => window.removeEventListener("keyUp", handleKeyUp);
  }, [handleKeyUpCallback]);

  return { currentKeyCode, currentKeyName, keyCodeHistory };
}
