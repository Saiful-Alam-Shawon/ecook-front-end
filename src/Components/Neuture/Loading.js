import React from 'react';
import { RotatingLines } from 'react-loader-spinner';


const Loading = () => {
    return (
        <div  >
            <RotatingLines
                strokeColor="#36d767"
                strokeWidth="5"
                animationDuration="1.15"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loading;