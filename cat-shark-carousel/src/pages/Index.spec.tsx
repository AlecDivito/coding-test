import React from 'react';
import { render, screen, waitForElementToBeRemoved, } from '@testing-library/react';
import Index from './Index';
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event';
import { allResponseData, handlers, sharkResponseData } from '../testHandlers';

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('should render Index page', () => {
    render(<Index />);
    expect(screen.getByText("🐈 Pictures of Ferocious Beasts 🦈")).toBeInTheDocument();
    expect(screen.getByText("The ultimate repository, currently showing cats and sharks")).toBeInTheDocument();
    expect(screen.getByText('🐈 Cats')).toBeInTheDocument();
    expect(screen.getByText('🦈 Sharks')).toBeInTheDocument();
});

test('should click on cats and sharks button which results in 0 pictures', async () => {
    render(<Index />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByRole('alert'));
    let images = allResponseData.map(src => screen.getByTestId(src));
    expect(images.length).toStrictEqual(4);

    const catButton = screen.getByText('🐈 Cats');
    userEvent.click(catButton);
    await waitForElementToBeRemoved(() => screen.getByRole('alert'));
    images = sharkResponseData.map(src => screen.getByTestId(src));
    expect(images.length).toStrictEqual(2);

    const sharkButton = screen.getByText('🦈 Sharks');
    userEvent.click(sharkButton);
    await waitForElementToBeRemoved(() => screen.getByRole('alert'));
    const text = screen.getByText("Please select the 🐈 Cat or the 🦈 Shark buttons to get started");
    expect(text).toBeInTheDocument();
});

test('should cycle through pictures using carousel', async () => {
    render(<Index />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByRole('alert'));

    const pictures = allResponseData;

    const leftButton = screen.getByText('Previous');
    userEvent.click(leftButton);
    expect(screen.getByTestId(pictures[2]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[3]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide next");

    const rightButton = screen.getByText('Next');
    userEvent.click(rightButton);
    expect(screen.getByTestId(pictures[3]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[1]).className).toStrictEqual("slide next");

    userEvent.click(rightButton);
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[1]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[2]).className).toStrictEqual("slide next");

    userEvent.click(rightButton);
    expect(screen.getByTestId(pictures[1]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[2]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[3]).className).toStrictEqual("slide next");
});

test('should jump to correct picture using carousel index buttons', async () => {
    render(<Index />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByRole('alert'));

    const pictures = allResponseData;

    expect(screen.getByTestId(pictures[3]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[1]).className).toStrictEqual("slide next");

    const secondPicture = screen.getByText('2');
    userEvent.click(secondPicture);
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[1]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[2]).className).toStrictEqual("slide next");

    const fourthPicture = screen.getByText('4');
    userEvent.click(fourthPicture);
    expect(screen.getByTestId(pictures[2]).className).toStrictEqual("slide previous");
    expect(screen.getByTestId(pictures[3]).className).toStrictEqual("slide active");
    expect(screen.getByTestId(pictures[0]).className).toStrictEqual("slide next");
})