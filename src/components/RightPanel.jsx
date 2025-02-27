import React from "react";

const RightPanel = ({ zoom, handleZoomIn, handleZoomOut, handleShowReportPopup, handleCapture  }) => {
    return (
        <div id="video-controls" class="absolute top-2.5 right-2.5 flex flex-col gap-2.5">
            <button id="zoom" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100">Zoom: {zoom.toFixed(1)}</button>
            <button onClick={handleZoomIn} class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100">Przybliż</button>
            <button onClick={handleZoomOut} class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100">Oddal</button>
            <button onClick={handleCapture} class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100">Stopklatka</button>
            <button id="report" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100"
                onClick={handleShowReportPopup}>
                Zgłoś</button>
        </div>
    );
};

export default RightPanel;