import React, { useEffect } from 'react';
import useKeyboard from '../hooks/useKeyboard';
import { Key } from '../types/keyboard';
import Pagination from './pagination';
// import ChevronLeft from '../assets/chevron_left.svg';
// import ChevronRight from '../assets/chevron_right.svg';

export enum IChange {
    UP = 1,
    DOWN = -1
}

interface IProps {
    images: string[];
    activeIndex: number;
    onCarousel: (change: IChange) => void;
    onJump: (index: number) => void;
}

const Carousel = ({ images, activeIndex, onCarousel, onJump }: IProps) => {
    useKeyboard((event: KeyboardEvent) => {
        const { key } = event;
        if (key === Key.ArrowLeft) {
            onCarousel(IChange.DOWN);
        } else if (key === Key.ArrowRight) {
            onCarousel(IChange.UP);
        }
    });

    const computeClassname = (index: number): string => {
        if (index === activeIndex) {
            return "active";
        } else if (activeIndex - 1 === index || (activeIndex - 1 < 0 && index === images.length - 1)) {
            return "previous";
        } else if (activeIndex + 1 === index || (activeIndex + 1 >= images.length && index === 0)) {
            return "next";
        }
        return "";
    }

    return <section className="flex justify-around">
        <button onClick={() => onCarousel(IChange.DOWN)}>
            {/* <ChevronLeft /> */}
            Left
        </button>
        <div>
            <ul className="carousel">
                {images.map((src, index) =>
                    <li className={`slide ${computeClassname(index)}`} data-testid={src} key={src}>
                        <img src={src} alt="" />
                    </li>
                )}
            </ul>
            <Pagination array={images} activeItem={images[activeIndex]} onClick={onJump} />
        </div>
        <button onClick={() => onCarousel(IChange.UP)}>
            {/* <ChevronRight /> */}
            Right
        </button>
    </section>
}

export default Carousel;