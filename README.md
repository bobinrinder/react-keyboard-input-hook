# react-keyboard-input-hook [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
A [React Hook](https://reactjs.org/docs/hooks-intro.html) to easily work with keyboard inputs.

## Install

`yarn add bobinrinder/react-keyboard-input-hook`

## Usage

```jsx
import React from "react";
import useKeyUp from "./useKeyboardInput";

function App() {
  const handleKeyUp = keyName => {
    console.log('the ' + keyName + ' was just pressed!');
  };

  const { currentKeyName, currentKeyCode, keyCodeHistory } = useKeyUp(
    handleKeyUp
  );

  return (
    <div className="App">
        <h1>{currentKeyCode}</h1>
        <h1>{currentKeyName}</h1>
        <h6>{keyCodeHistory.map(item => item + ", ")}</h6>
    </div>
  );
}

export default App;
```

## License
MIT
