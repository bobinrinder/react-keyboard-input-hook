import React from 'react';

import { render, cleanup, fireEvent } from 'react-testing-library'
;
import { useKeyUp, useKeyDown, useKeyCombo, useFireTvKeyUp, useFireTvKeyDown } from '../index';

const UseKeyUpTestComponent = ({ callback, whitelist, blacklist }) => {
    useKeyUp(callback, whitelist, blacklist)
    return <div />;
}

const UseKeyDownTestComponent = ({ callback, whitelist, blacklist }) => {
    useKeyDown(callback, whitelist, blacklist)
    return <div />;
}

const UseFireTvKeyUpTestComponent = ({ callback, whitelist, blacklist }) => {
    useFireTvKeyUp(callback, whitelist, blacklist)
    return <div />;
}

const UseFireTvKeyDownTestComponent = ({ callback, whitelist, blacklist }) => {
    useFireTvKeyDown(callback, whitelist, blacklist)
    return <div />;
}

const UseKeyComboTestComponent = ({ keyCodes, callback }) => {
    useKeyCombo(keyCodes, callback)
    return <div />;
}

afterEach(cleanup);

describe('useKey setup', () => {
    test('if whitelist and blacklist are given it passes with warnings', () => {
        console.warn = jest.fn();
        render(<UseKeyUpTestComponent callback={jest.fn()} whitelist={[38]} blacklist={[40]} />);
        expect(console.warn).toHaveBeenCalledWith('White- and blacklist arrays > 0, emptied blacklist!');
    });
});

describe('events', () => {
    test('callback is called with the right values on keyup event', async () => {
        const callback = jest.fn();
        const { container } = render(<UseKeyUpTestComponent callback={callback} />);
        const keyUpEvent = new KeyboardEvent('keyup', {
            key: 'ArrowRight',
            bubbles: true,
            keyCode: 39,
            which: 39,
            code: 'ArrowRight'
        })
        fireEvent(container, keyUpEvent);
        expect(callback).toHaveBeenCalledWith({ "e": keyUpEvent, "keyCode": 39, "keyName": "ArrowRight" });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callback is called with the right values on keydown event', async () => {
        const callback = jest.fn();
        const { container } = render(<UseKeyDownTestComponent callback={callback} />);
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            bubbles: true,
            keyCode: 39,
            which: 39,
            code: 'ArrowRight'
        })
        fireEvent(container, keyDownEvent);
        expect(callback).toHaveBeenCalledWith({ "e": keyDownEvent, "keyCode": 39, "keyName": "ArrowRight" });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callback is called with the right values on fire tv keyup event', async () => {
        const callback = jest.fn();
        const { container } = render(<UseFireTvKeyUpTestComponent callback={callback} />);
        const keyUpEvent = new KeyboardEvent('keyup', {
            key: 'ArrowRight',
            bubbles: true,
            keyCode: 39,
            which: 39,
            code: 'ArrowRight'
        })
        fireEvent(container, keyUpEvent);
        expect(callback).toHaveBeenCalledWith({ "e": keyUpEvent, "keyCode": 39, "keyName": "ArrowRight" });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callback is called with the right values on fire tv keydown event', async () => {
        const callback = jest.fn();
        const { container } = render(<UseFireTvKeyDownTestComponent callback={callback} />);
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            bubbles: true,
            keyCode: 39,
            which: 39,
            code: 'ArrowRight'
        })
        fireEvent(container, keyDownEvent);
        expect(callback).toHaveBeenCalledWith({ "e": keyDownEvent, "keyCode": 39, "keyName": "ArrowRight" });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callback is called with the right values when two keys are pressed at the same time', async () => {
        const callback = jest.fn();
        const { container } = render(<UseKeyComboTestComponent keyCodes={[37,39]} callback={callback} />);
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'ArrowLeft',
            bubbles: true,
            keyCode: 37,
            which: 37,
            code: 'ArrowLeft'
        })
        const keyDownEvent2 = new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            bubbles: true,
            keyCode: 39,
            which: 39,
            code: 'ArrowRight'
        })
        fireEvent(container, keyDownEvent);
        fireEvent(container, keyDownEvent2);
        expect(callback).toHaveBeenCalledWith({ "e": keyDownEvent, "keyCode": 39, "keyName": "ArrowRight" });
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
