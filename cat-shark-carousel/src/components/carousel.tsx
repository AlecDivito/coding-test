import React from 'react';
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

const Carousel: React.FC<IProps> = ({ images, activeIndex, onCarousel, onJump }) => {

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
                    <li className={`slide ${computeClassname(index)}`} key={src}>
                        <img src={src} alt="" />
                    </li>
                )}
            </ul>
            <ul className="flex justify-center">
                {images.map((_, index) => <li className="p-1" onClick={() => onJump(index)}>{index}</li>)}
            </ul>
        </div>
        <button onClick={() => onCarousel(IChange.UP)}>
            {/* <ChevronRight /> */}
            Right
        </button>
    </section>
}

export default Carousel;