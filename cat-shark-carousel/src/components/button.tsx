import React from 'react';

interface IProps {
    text: string;
    active: boolean;
    onClick: () => void;
}

const Button = ({ text, active, onClick }: IProps) => (
    <button
        onClick={onClick}
        className={`btn ${active ? "btn--active" : ""}`}
    >
        {text}
    </button>
)

export default Button;