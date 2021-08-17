import React from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Button from './button';

it('should click button which emits onClick event', () => {
    const onClick = jest.fn()
    render(
        <Button text="some button" active={false} onClick={onClick} />
    );
    const button = screen.getByText('some button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains("btn--active")).toBeFalsy();

    userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
});
