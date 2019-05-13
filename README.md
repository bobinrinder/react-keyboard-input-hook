# react-keyboard-input-hook [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
A [React Hook](https://reactjs.org/docs/hooks-intro.html) to easily work with keyboard inputs.

## Install

`yarn add bobinrinder/react-keyboard-input-hook`

## Usage

```jsx
import React from "react";
import useKeyUp from "react-keyboard-input-hook";

function App() {
  const handleKeyUp = keyName => {
    console.log('the ' + keyName + ' was just pressed!');
  };

  const { currentKeyName, currentKeyCode, keyCodeHistory } = useKeyUp(
    handleKeyUp
  );

  return (
    <div>
        <h1>Last pressed key: {currentKeyCode}</h1>
        <h1>Last pressed key code: {currentKeyName}</h1>
        <h6>History of pressed keys: {keyCodeHistory.map(item => item + ", ")}</h6>
    </div>
  );
}

export default App;
```

## License
MIT
