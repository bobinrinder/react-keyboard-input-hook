# react-keyboard-input-hook [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
A [React Hook](https://reactjs.org/docs/hooks-intro.html) to easily work with keyboard inputs.

## Install

`yarn add react-keyboard-input-hook`

## Usage

```jsx
import React from "react";
import { useKeyUp } from "react-keyboard-input-hook";

function App() {
  // wrapping in useCallback is usually recommended
  const handleKeyUp = ({ keyName }) => {
    console.log('the ' + keyName + ' was just pressed!');
  };

  // only destructure what you need, callback is optional
  const { keyName, keyCode, keyCodeHistory } = useKeyUp(handleKeyUp);

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

## License
MIT
