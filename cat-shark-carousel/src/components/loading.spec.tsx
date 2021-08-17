import React from 'react';
import { render, screen, } from '@testing-library/react';
import Loading from './loading';

it('renders loading icon with child', () => {
    render(
        <Loading isLoading={true}>
            Some content
        </Loading>
    );
    expect(screen.getByText('Some content')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
});

it('Renders child without loading icon', () => {
    render(
        <Loading isLoading={false}>
            Some content
        </Loading>
    );
    expect(screen.getByText('Some content')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
})