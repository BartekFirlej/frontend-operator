import React from 'react';
import { osdTextXL } from '../style';
import '../styles/style.css'

const FinishFlight = ({ onFinish }) => {
    return (
        <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-2.5">
            <button
                onClick={onFinish}
                className={`${osdTextXL} osd-text`}>
                Zakończ
            </button>
        </div>
    );
};

export default FinishFlight;
