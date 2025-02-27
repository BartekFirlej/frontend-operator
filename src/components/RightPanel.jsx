import React from "react";
import { osdTextXL } from '../style';
import '../styles/style.css'

const RightPanel = ({ zoom, handleZoomIn, handleZoomOut, handleShowReportPopup, handleCapture }) => {
    return (
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2.5">
            <div className={`${osdTextXL} osd-text`}>
                Zoom: {zoom.toFixed(1)}
            </div>

            <button className={`${osdTextXL} osd-text`}
                onClick={handleZoomIn}>
                Przybliż
            </button>

            <button className={`${osdTextXL} osd-text`}
                onClick={handleZoomOut}>
                Oddal
            </button>

            <button className={`${osdTextXL} osd-text`}
                onClick={handleCapture}>
                Stopklatka
            </button>

            <button className={`${osdTextXL} osd-text`}
                onClick={handleShowReportPopup}>
                Zgłoś
            </button>
        </div>
    );
};

export default RightPanel;
