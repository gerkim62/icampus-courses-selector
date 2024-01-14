import React from 'react';
import { RiLoader4Line } from 'react-icons/ri';

const LoadingPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center fullHeight">
            <RiLoader4Line className="animate-spin text-4xl text-gray-500" />
        </div>
    );
};

export default LoadingPage;
