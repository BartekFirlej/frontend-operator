import React, { useState } from 'react';
import './App.css';
import ReportPopup from './components/ReportPopup';
import SignalPanel from './components/SignalPanel';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VideoStream from './components/VideoStream';

function App() {
  const [isReportPopupVisible, setReportPopupVisible] = useState(false);
  const [reportPopupData, setReportPopupData] = useState(null);
  const [ws, setWs] = useState(null);
  const [response, setResponse] = useState({ "location": { "x": 0, "y": 0, "z": 0 }, "datetime": 0, "velocity": 0, "measurements": { "0": 0 } });
  const [zoom, setZoom] = useState(1.0);
  const zoomStep = 0.5;

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + zoomStep);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(1.0, prevZoom - zoomStep));
  };

  const handleShowReportPopup = () => {
    setReportPopupData({
      x: response.location.x.toFixed(6),
      y: response.location.y.toFixed(6)
    });
    setReportPopupVisible(true);
  };

  return (
    <div className="App" class="m-0 p-0 w-full h-full overflow-hidden flex justify-center items-center bg-black text-center">

      <LeftPanel
        flightNumber={response.flightNumber}
        location={response.location}
        velocity={response.velocity}
      />

      <RightPanel
        zoom={zoom}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleShowReportPopup={handleShowReportPopup}
      />

      <VideoStream
        zoom={zoom}
      />

      <div id="finish-flight-container" class="absolute bottom-2.5 left-2.5 flex flex-col gap-2.5">
        <button id="finish-flight-button" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 z-[2] hover:opacity-100">Zakończ lot</button>
      </div>

      <SignalPanel
        setResponse={setResponse}
        measurements={response.measurements}
        setWs={setWs}
      />

      {isReportPopupVisible && reportPopupData && (
        <ReportPopup
          onClose={() => {
            setReportPopupVisible(false);
            setReportPopupData(null);
          }}
          x={reportPopupData.x}
          y={reportPopupData.y}
        />
      )}
    </div>
  );
}

export default App;
