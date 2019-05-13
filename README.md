# react-keyboard-input-hook [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
A [React Hook](https://reactjs.org/docs/hooks-intro.html) to easily work with keyboard inputs.

## Install

`yarn add react-keyboard-input-hook`

## Example Usage

```jsx
import React from "react";
import { useKeyUp, useKeyDown, useKeyRepeat } from "react-keyboard-input-hook";

function App() {
  // wrapping in useCallback is usually recommended
  const handleKeyUp = ({ keyName }) => {
    console.log('the ' + keyName + ' was just released!');
  };
  const handleKeyDown = ({ keyName }) => {
    console.log('the ' + keyName + ' was just pressed down!');
  };
  const handleKeyRepeat = ({ keyName }) => {
    console.log('the ' + keyName + ' was just pressed down and held!');
  };

  // only destructure what you need, callback is optional
  const { keyCode, keyCodeHistory, keyName, keyNameHistory } = useKeyUp();
  useKeyUp(handleKeyUp);
  useKeyDown(handleKeyDown);
  useKeyRepeat(handleKeyRepeat);

  return (
    <div>
        <h1>Last pressed key code: {keyCode}</h1>
        <h1>Last pressed key name: {keyName}</h1>
        <h6>History of pressed keys: {keyCodeHistory.map(item => item + ", ")}</h6>
    </div>
  );
}

export default App;
```

## Reference

### useKeyUp
#### Parameters: 
- **callback** (optional, default `null`):
Callback function that gets executed on every event.
- **whitelist** (optional, default `[]`):
Whitelist of keyboard keyCodes (integer array) that are relevant, all other keys will be ignored.
Note: Can only be used if `blacklist` paramater is an empty array.
- **blacklist** (optional, default `[]`):
Blacklist of keyboard keyCodes (integer array) that are irrelevant and therefore will be ignored.
Note: Can only be used if `whitelist` paramater is an empty array.

#### Return Object: 
```jsx
{ 
  keyCode, // integer of last pressed keyCode
  keyCodeHistory, // array of integers of recently pressed keyCodes
  keyName, // string of last pressed key
  keyNameHistory // array of strings of recently pressed keys
}
```

### useKeyDown
Same as `useKeyUp`

### useKeyRepeat
Same as `useKeyUp`

## License
MIT
