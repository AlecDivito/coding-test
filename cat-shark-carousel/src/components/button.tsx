import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    active: boolean;
    plain?: boolean;
    onClick: () => void;
}

const Button = ({ children, active, plain = false, onClick }: IProps) => (
    <button
        onClick={onClick}
        className={`btn ${active ? "btn--active" : ""} ${plain ? "btn--plain" : ""}`}
    >
        {children}
    </button>
)

export default Button;