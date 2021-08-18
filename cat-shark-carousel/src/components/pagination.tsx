import React from 'react';

interface IProps {
    array: any[];
    activeItem: any;
    pages?: number;
    onClick: (index: number) => void;
}

const Pagination = ({ array, activeItem, pages = 5, onClick }: IProps) => {
    let pageOffset = pages;
    if (pages % 2 === 0) {
        pageOffset += 1
    }

    if (array.length === 0) {
        return null;
    }

    let offset = (pageOffset - 1) / 2;
    let firstDots = true;
    let lastDots = true;
    let snippet = [];

    let activeIndex = array.findIndex((value) => value === activeItem);
    let middleItem = activeIndex;
    let startingIndex = middleItem - offset - 1;
    if (pages < array.length) {
        if (startingIndex < 0) {
            middleItem = offset;
            firstDots = false
        }
        if (activeIndex + offset >= array.length - 1) {
            middleItem = array.length - 1 - offset;
            lastDots = false;
        }
        startingIndex = middleItem - offset;
        snippet = array.slice(startingIndex, startingIndex + pages);
    } else {
        snippet = array;
        startingIndex = 0;
        firstDots = false
        lastDots = false;
    }

    return <ul className="pagination flex justify-center">
        {firstDots ?
            <React.Fragment>
                <li className="p-1" onClick={() => onClick(0)}>1</li>
                <li className="p-1">...</li>
            </React.Fragment>
            : null
        }
        {snippet.map((value, index) =>
            <li key={value}
                className={`p-1 ${value === activeItem ? "active" : ""}`}
                onClick={() => onClick(index + startingIndex)}
            >
                {startingIndex + index + 1}
            </li>
        )}
        {lastDots ?
            <React.Fragment>
                <li className="p-1">...</li>
                <li className="p-1" onClick={() => onClick(array.length - 1)}>{array.length}</li>
            </React.Fragment>
            : null
        }
    </ul>
}

export default Pagination;