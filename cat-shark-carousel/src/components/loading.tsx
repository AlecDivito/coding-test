import React, { ReactNode } from 'react';
import LoadingIcon from '../assets/loading.svg';

interface IProps {
    isLoading: boolean;
    children: ReactNode
}

const Loading = ({ isLoading, children }: IProps) => (
    <React.Fragment>
        {children}
        {isLoading ?
            <div className="loading flex align-center justify-center"
                role="alert" aria-label="loading new pictures" aria-busy="true" aria-live="polite"
            >
                <img src={LoadingIcon} alt="Loading Icon" />
            </div>
            : null}
    </React.Fragment>
)

export default Loading;