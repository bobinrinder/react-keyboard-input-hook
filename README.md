# react-keyboard-input-hook [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.com/bobinrinder/react-keyboard-input-hook.svg?branch=master)](https://travis-ci.org/bobinrinder/react-keyboard-input-hook) [![Coverage Status](https://coveralls.io/repos/github/bobinrinder/react-keyboard-input-hook/badge.svg)](https://coveralls.io/github/bobinrinder/react-keyboard-input-hook) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/bobinrinder/react-keyboard-input-hook/pulls)

A [React Hook](https://reactjs.org/docs/hooks-intro.html) to easily work with keyboard inputs. This library was originally built for controlling input from a Fire TV remote but it is now flexible for any keyboard input that works with key codes.

Note: As the `keypress` event is [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event) this library does not support it.

## Demo

An example and quick start is at [https://github.com/bobinrinder/react-fire-tv-web-app-example](https://github.com/bobinrinder/react-fire-tv-web-app-example)

## Install

`yarn add react-keyboard-input-hook`

## Example Usage

```jsx
import React from "react";
import { useKeyUp, useKeyDown, useKeyCombo } from "react-keyboard-input-hook";

function App() {
  // wrapping in useCallback is usually recommended
  const handleKeyUp = ({ keyName }) => {
    console.log("the " + keyName + " was just released!");
  };
  const handleKeyDown = ({ keyName }) => {
    console.log("the " + keyName + " was just pressed down!");
  };
  const handleKeyCombo = () => {
    console.log("a combo of up and down arrow was just pressed!");
  };

  // only destructure what you need, callback is optional
  const { keyCode, keyCodeHistory, keyName, keyNameHistory } = useKeyUp();
  useKeyUp(handleKeyUp);
  useKeyDown(handleKeyDown);
  useKeyCombo([38, 40], handleKeyCombo);

  return (
    <div>
      <h1>Last pressed key code: {keyCode}</h1>
      <h1>Last pressed key name: {keyName}</h1>
      <h6>
        History of pressed keys: {keyCodeHistory.map((item) => item + ", ")}
      </h6>
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
  Callback argument object:

```js
{
  keyName, // string of pressed key
    keyCode, // integer of pressed keyCode
    e; // event e.g. for e.PreventDefault()
}
```

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
    keyNameHistory; // array of strings of recently pressed keys
}
```

### useKeyDown

Same as `useKeyUp`.

### useKeyCombo

#### Parameters:

- **keyCodes** (required):
  Array of at least 2 integer key codes that make up the key down combination.
- **callback** (required):
  Callback function that gets executed once for each combo.
  Callback argument object:

```js
{
  keyName, // string of last pressed key of combo
    keyCode, // integer of last pressed keyCode of combo
    e; // event e.g. for e.PreventDefault()
}
```

### useFireTvKeyUp

Same as `useKeyUp` but with `whitelist` parameter defaulting to Fire TV key codes only (8, 13, 37, 38, 39, 40, 179, 227, 228).

### useFireTvKeyDown

Same as `useKeyUp` but with `whitelist` parameter defaulting to Fire TV key codes only (8, 13, 37, 38, 39, 40, 179, 227, 228).

## License

MIT
