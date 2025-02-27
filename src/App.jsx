import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import ReportPopup from './components/ReportPopup';
import SignalPanel from './components/SignalPanel';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VideoStream from './components/VideoStream';
import FreezeFrame from './components/FreezeFrame';
import FinishFlight from './components/FinishFlight';

function App() {
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedFreezeFrame, setCapturedFreezeFrame] = useState('');
  const [isFreezeFrameVisible, setIsFreezeFrameVisible] = useState(false);
  const [isReportPopupVisible, setReportPopupVisible] = useState(false);
  const [reportPopupData, setReportPopupData] = useState(null);
  const [ws, setWs] = useState(null);
  const [response, setResponse] = useState({ "location": { "x": 0, "y": 0, "z": 0 }, "datetime": 0, "velocity": 0, "measurements": { "0": 0 } });
  const [zoom, setZoom] = useState(1.0);
  const zoomStep = 0.5;
  const queryParams = new URLSearchParams(location.search);
  const flightID = queryParams.get('flightID');

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

  const handleCaptureFreezeFrame = () => {
    const videoImg = videoRef.current;
    videoImg.crossOrigin = "anonymous";
    const canvas = canvasRef.current;
    if (!videoImg || !canvas) return;
    if (videoImg.naturalWidth === 0 || videoImg.naturalHeight === 0) {
      console.warn("Image not fully loaded yet.");
      return;
    }
    const context = canvas.getContext('2d');
    canvas.width = videoImg.naturalWidth;
    canvas.height = videoImg.naturalHeight;
    context.drawImage(videoImg, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedFreezeFrame(dataUrl);
    setIsFreezeFrameVisible(true);
  };

  const handleCloseFreezeFrame = () => {
    setIsFreezeFrameVisible(false);
    setCapturedFreezeFrame('');
  };

  const handleFlightFinish = () => {}


  return (
    <div className="App" class="m-0 p-0 w-full h-full overflow-hidden flex justify-center items-center bg-black text-center">

      <LeftPanel
        flightNumber={flightID}
        location={response.location}
        velocity={response.velocity}
      />

      <RightPanel
        zoom={zoom}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleShowReportPopup={handleShowReportPopup}
        handleCapture={handleCaptureFreezeFrame}
      />

      <VideoStream
        zoom={zoom}
        ref={videoRef}
      />

      <canvas ref={canvasRef} className="hidden" />

      {isFreezeFrameVisible && (
        <FreezeFrame imageUrl={capturedFreezeFrame} onClose={handleCloseFreezeFrame} />
      )}

      <FinishFlight
        onFinish={handleFlightFinish}
      />

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
