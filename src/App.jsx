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
import config from './config';

function App() {
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedFreezeFrame, setCapturedFreezeFrame] = useState('');
  const [isFreezeFrameVisible, setIsFreezeFrameVisible] = useState(false);
  const [isReportPopupVisible, setReportPopupVisible] = useState(false);
  const [ws, setWs] = useState(null);
  const [response, setResponse] = useState({ "location": { "x": 0, "y": 0, "z": 0 }, "datetime": 0, "velocity": 0, "measurements": { "0": 0 } });
  const [zoom, setZoom] = useState(1.0);
  const [capturedImage, setCapturedImage] = useState(null);
  const zoomStep = 0.5;
  const queryParams = new URLSearchParams(location.search);
  const flightID = queryParams.get('flightID');
  const operatorID = queryParams.get('operatorID');
  const teamID = queryParams.get('teamID');
  const platoonID = queryParams.get('platoonID');
  const [reportDetails, setReportDetails] = useState({
    objectID: 0,
    flightID: flightID,
    operatorId: operatorID,
    teamId: teamID,
    platoonId: platoonID,
    objectCategory: "",
    comment: "",
    timestamp: null,
    image: null,
    x: null,
    y: null,
    z: null
  });

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + zoomStep);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(1.0, prevZoom - zoomStep));
  };

  const handleShowReportPopup = () => {
    setReportDetails({
      x: response.location.x.toFixed(6),
      y: response.location.y.toFixed(6),
      z: response.location.z.toFixed(6)
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

  const handleFlightFinish = async () => {
    const payload = {
      flightID: flightID, 
      endTime: new Date().toISOString()
    };
  
    try {
      const response = await fetch(config.FLIGHT_END_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Flight finish response:", data);
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error sending flight finish:", error);
    }
  };

  const handleSendReport = async () => {
    let base64String = null;
    if (videoRef.current) {
      const imgDataUrl = videoRef.current.capture();
      setCapturedImage(imgDataUrl);
      base64String = imgDataUrl.split(',')[1];
      console.log("Captured image from video:", base64String);
    }
    
    const data = {
      X: response.location.x.toFixed(6),
      Y: response.location.y.toFixed(6),
      Z: response.location.z.toFixed(6),
      ObjectId: reportDetails.objectID, 
      OperatorId: operatorID,
      ObjectCategory: reportDetails.objectCategory,
      TeamId: teamID,
      PlatoonId: platoonID,
      FlightId: flightID,
      Timestamp: reportDetails.timestamp,
      Comment: reportDetails.comment,
      Image: base64String
    };
  
    setReportPopupVisible(false);
    console.log("Final report data:", data);

    try {
      const response = await fetch(config.TARGET_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const response_data = await response.json();
      alert("Target response: " + JSON.stringify(response_data));
    } catch (error) {
      console.error("Error sending flight finish:", error);
    }
  };
  

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

      {isReportPopupVisible && reportDetails && (
        <ReportPopup
        reportDetails={reportDetails}
        setReportDetails={setReportDetails}
        onSendReport={handleSendReport}
        onClose={() => setReportPopupVisible(false)}
      />
      )}
    </div>
  );
}

export default App;
