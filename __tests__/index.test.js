/**
 * @jest-environment jsdom
 */

import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import useKey, {
  useKeyUp,
  useKeyDown,
  useKeyCombo,
  useFireTvKeyUp,
  useFireTvKeyDown,
  checkIfArrayItemsinArray,
} from "../index";

const UseKeyTestComponent = ({ callback, keyEvent, whitelist, blacklist }) => {
  useKey(callback, keyEvent, whitelist, blacklist);
  return <div />;
};

const UseKeyUpTestComponent = ({ callback, whitelist, blacklist }) => {
  useKeyUp(callback, whitelist, blacklist);
  return <div />;
};

const UseKeyDownTestComponent = ({ callback, whitelist, blacklist }) => {
  useKeyDown(callback, whitelist, blacklist);
  return <div />;
};

const UseFireTvKeyUpTestComponent = ({ callback, whitelist, blacklist }) => {
  useFireTvKeyUp(callback, whitelist, blacklist);
  return <div />;
};

const UseFireTvKeyDownTestComponent = ({ callback, whitelist, blacklist }) => {
  useFireTvKeyDown(callback, whitelist, blacklist);
  return <div />;
};

const UseKeyComboTestComponent = ({ keyCodes, callback }) => {
  useKeyCombo(keyCodes, callback);
  return <div />;
};

afterEach(cleanup);

describe("useKey setup", () => {
  test("if whitelist and blacklist are given it passes with warnings", () => {
    console.warn = jest.fn();
    render(
      <UseKeyUpTestComponent
        callback={jest.fn()}
        whitelist={[38]}
        blacklist={[40]}
      />
    );
    expect(console.warn).toHaveBeenCalledWith(
      "White- and blacklist arrays > 0, emptied blacklist!"
    );
  });

  test("if key event is invalid it passes with warnings", () => {
    console.warn = jest.fn();
    render(<UseKeyTestComponent callback={jest.fn()} keyEvent="keypress" />);
    expect(console.warn).toHaveBeenCalledWith(
      "useKey keyEvent invalid, assumed keyEvent 'keydown' as fallback!"
    );
  });

  test("if key codes array for combo is too short it passes with warnings", () => {
    console.warn = jest.fn();
    render(<UseKeyComboTestComponent callback={jest.fn()} keyCodes={[38]} />);
    expect(console.warn).toHaveBeenCalledWith(
      "Invalid arguments for usekeyCombo!"
    );
  });

  test("if array check function gets called with zero elements it return false", () => {
    const checkIfArrayItemsinArrayResult = checkIfArrayItemsinArray([], []);
    expect(checkIfArrayItemsinArrayResult).toBe(false);
  });
});

describe("events", () => {
  test("callback is called with the right values on keyup event", async () => {
    const callback = jest.fn();
    const { container } = render(<UseKeyUpTestComponent callback={callback} />);
    const keyUpEvent = new KeyboardEvent("keyup", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    fireEvent(container, keyUpEvent);
    expect(callback).toHaveBeenCalledWith({
      e: keyUpEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback is called with the right values on keydown event", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseKeyDownTestComponent callback={callback} />
    );
    const keyDownEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    fireEvent(container, keyDownEvent);
    expect(callback).toHaveBeenCalledWith({
      e: keyDownEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback is called with the right values on fire tv keyup event", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseFireTvKeyUpTestComponent callback={callback} />
    );
    const keyUpEvent = new KeyboardEvent("keyup", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    fireEvent(container, keyUpEvent);
    expect(callback).toHaveBeenCalledWith({
      e: keyUpEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback is called with the right values on fire tv keydown event", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseFireTvKeyDownTestComponent callback={callback} />
    );
    const keyDownEvent = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    fireEvent(container, keyDownEvent);
    expect(callback).toHaveBeenCalledWith({
      e: keyDownEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback is called with the right values on keyup event with whitelist items", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseKeyUpTestComponent callback={callback} whitelist={[39, 40]} />
    );
    const keyUpEvent = new KeyboardEvent("keyup", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    const keyUpEvent2 = new KeyboardEvent("keyup", {
      key: "ArrowLeft",
      bubbles: true,
      keyCode: 37,
      which: 37,
      code: "ArrowLeft",
    });
    const keyUpEvent3 = new KeyboardEvent("keyup", {
      key: "ArrowDown",
      bubbles: true,
      keyCode: 40,
      which: 40,
      code: "ArrowDown",
    });
    fireEvent(container, keyUpEvent);
    fireEvent(container, keyUpEvent2);
    fireEvent(container, keyUpEvent3);
    expect(callback).toHaveBeenCalledWith({
      e: keyUpEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledWith({
      e: keyUpEvent,
      keyCode: 40,
      keyName: "ArrowDown",
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test("callback is called with the right values on keyup event with blacklist items", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseKeyUpTestComponent callback={callback} blacklist={[39, 40]} />
    );
    const keyUpEvent = new KeyboardEvent("keyup", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    const keyUpEvent2 = new KeyboardEvent("keyup", {
      key: "ArrowLeft",
      bubbles: true,
      keyCode: 37,
      which: 37,
      code: "ArrowLeft",
    });
    const keyUpEvent3 = new KeyboardEvent("keyup", {
      key: "ArrowDown",
      bubbles: true,
      keyCode: 40,
      which: 40,
      code: "ArrowDown",
    });
    fireEvent(container, keyUpEvent);
    fireEvent(container, keyUpEvent2);
    fireEvent(container, keyUpEvent3);
    expect(callback).toHaveBeenCalledWith({
      e: keyUpEvent,
      keyCode: 37,
      keyName: "ArrowLeft",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("callback is called with the right values when two keys are pressed at the same time", async () => {
    const callback = jest.fn();
    const { container } = render(
      <UseKeyComboTestComponent keyCodes={[37, 39]} callback={callback} />
    );
    const keyDownEvent = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      bubbles: true,
      keyCode: 37,
      which: 37,
      code: "ArrowLeft",
    });
    const keyDownEvent2 = new KeyboardEvent("keyup", {
      key: "ArrowLeft",
      bubbles: true,
      keyCode: 37,
      which: 37,
      code: "ArrowLeft",
    });
    const keyDownEvent3 = new KeyboardEvent("keydown", {
      key: "ArrowLeft",
      bubbles: true,
      keyCode: 37,
      which: 37,
      code: "ArrowLeft",
    });
    const keyDownEvent4 = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      keyCode: 39,
      which: 39,
      code: "ArrowRight",
    });
    fireEvent(container, keyDownEvent);
    fireEvent(container, keyDownEvent2);
    fireEvent(container, keyDownEvent3);
    fireEvent(container, keyDownEvent4);
    expect(callback).toHaveBeenCalledWith({
      e: keyDownEvent,
      keyCode: 39,
      keyName: "ArrowRight",
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
