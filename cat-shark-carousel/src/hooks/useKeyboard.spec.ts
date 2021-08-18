import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Key } from '../types/keyboard';
import useKeyboard from './useKeyboard';
import userEvent from '@testing-library/user-event';

test('should emit keyboard event', () => {
    const keyLeft = jest.fn();
    const keyRight = jest.fn();
    const event = (event: KeyboardEvent) => {
        const { key } = event;
        if (key === Key.ArrowLeft) {
            keyLeft();
        } else if (key === Key.ArrowRight) {
            keyRight();
        }
    }
    renderHook(() => useKeyboard(event))
    expect(keyLeft).toBeCalledTimes(0);
    expect(keyRight).toBeCalledTimes(0);
    userEvent.keyboard('[ArrowLeft][ArrowRight]')
    expect(keyLeft).toBeCalledTimes(1);
    expect(keyRight).toBeCalledTimes(1);
})