import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Carousel, { IChange } from './carousel';


describe('carousel smoke test', () => {

    const images = ["image1.png", "image2.png", "image3.png"];
    let jump: any = undefined;
    let carousel: any = undefined;

    beforeEach(() => {
        carousel = jest.fn();
        jump = jest.fn();
        render(
            <Carousel images={images}
                activeIndex={0}
                onCarousel={carousel}
                onJump={jump} />
        )
    });

    it('should render the carousel', () => {
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        images.forEach((_, index) => {
            expect(screen.getByText(index + 1)).toBeInTheDocument();
        })
    });

    it('should emit onCarousel event when right button is clicked', () => {
        const rightButton = screen.getByText('Next');
        expect(rightButton).toBeInTheDocument();
        userEvent.click(rightButton);
        expect(carousel).toBeCalledWith(IChange.UP);
    });

    it('should emit onCarousel event when left button is clicked', () => {
        const leftButton = screen.getByText('Previous');
        expect(leftButton).toBeInTheDocument();
        userEvent.click(leftButton);
        expect(carousel).toBeCalledWith(IChange.DOWN);
    });

    it('should emit onJump event when bottom page index is clicked', () => {
        const listItem = screen.getByText('1');
        expect(listItem).toBeInTheDocument();
        userEvent.click(listItem);
        expect(jump).toBeCalledWith(0);
    })
})

