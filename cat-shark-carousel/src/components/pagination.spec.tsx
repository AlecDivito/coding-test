import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Pagination from './pagination';
import { allResponseData } from '../testHandlers';

test('It should render a small list', () => {
    const onClick = jest.fn();
    render(
        <Pagination array={allResponseData}
            activeItem={allResponseData[0]}
            pages={5}
            onClick={onClick} />
    );

    allResponseData.forEach((_, index) => {
        expect(screen.getByText(index + 1)).toBeInTheDocument();
    });
});

test('It should render a large list', () => {
    const onClick = jest.fn();
    render(
        <Pagination array={[...allResponseData, ...['1.png', '2.png', '3.png', '4.png', '5.png',]]}
            activeItem={allResponseData[0]}
            pages={5}
            onClick={onClick} />
    );

    [0, 1, 2, 3, 4].forEach((value) => {
        expect(screen.getByText(value + 1)).toBeInTheDocument();
    });
    expect(screen.queryByText(6)).toBeNull()
    expect(screen.queryByText(9)).toBeInTheDocument()
});

test('It should render the middle or a large list', () => {
    const onClick = jest.fn();
    render(
        <Pagination array={[...allResponseData, ...['1.png', '2.png', '3.png', '4.png', '5.png',]]}
            activeItem='1.png'
            pages={3}
            onClick={onClick} />
    );

    [3, 4, 5].forEach((value) => {
        expect(screen.getByText(value + 1)).toBeInTheDocument();
    });
    expect(screen.queryByText(1)).toBeInTheDocument()
    expect(screen.queryByText(7)).toBeNull()
    expect(screen.queryByText(9)).toBeInTheDocument()
});

test('It should render the end or a large list', () => {
    const onClick = jest.fn();
    render(
        <Pagination array={[...allResponseData, ...['1.png', '2.png', '3.png', '4.png', '5.png',]]}
            activeItem='5.png'
            pages={3}
            onClick={onClick} />
    );

    [6, 7, 8].forEach((value) => {
        expect(screen.getByText(value + 1)).toBeInTheDocument();
    });
    expect(screen.queryByText(1)).toBeInTheDocument()
    expect(screen.queryByText(6)).toBeNull()
});

test('It should emit OnClick when clicking on an item', () => {
    const onClick = jest.fn();
    render(
        <Pagination array={[...allResponseData, ...['1.png', '2.png', '3.png', '4.png', '5.png',]]}
            activeItem='1.png'
            pages={3}
            onClick={onClick} />
    );

    const middleButton = screen.getByText('5');
    userEvent.click(middleButton);
    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(4);
})