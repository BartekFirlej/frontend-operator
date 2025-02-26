import React, { useState, useEffect } from 'react';
import './App.css';
import ReportPopup from './ReportPopup';
import SignalBar from './SignalBar';

function App() {
  const [isReportPopupVisible, setReportPopupVisible] = useState(false);
  const [isSignalContainerVisible, setSignalContainerVisible] = useState(true);
  const [ws, setWs] = useState(null);
  const [response, setResponse] = useState({ "location": { "x": 0, "y": 0, "z": 0 }, "datetime": 0, "velocity": 0, "measurements": { "0": 0 } });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onopen = () => {
      console.log("Connected to the server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResponse(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="App" class="m-0 p-0 w-full h-full overflow-hidden flex justify-center items-center bg-black text-center">

      <div id="left-panel" class="absolute top-2.5 left-2.5 gap-2.5 w-[200px] border-r border-[#ccc] flex flex-col">
        <div class="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">Identyfikator lotu: <span id="flight-number"></span></div>
        <div class="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">Szerokość: <span id="latitude">{response.location.x.toFixed(6)}</span> N</div>
        <div class="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">Długość: <span id="longitude">{response.location.y.toFixed(6)}</span> E</div>
        <div class="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">Wysokość: <span id="altitude">{response.location.z.toFixed(2)}</span> m</div>
        <div class="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">Predkość: <span id="velocity">{response.velocity.toFixed(2)}</span> m/s</div>
      </div>

      <div id="video-controls" class="absolute top-2.5 right-2.5 flex flex-col gap-2.5">
        <button id="zoom" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100">Zoom: 1.0</button>
        <button id="zoom-in" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100">Przybliż</button>
        <button id="zoom-out" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100">Oddal</button>
        <button id="play-pause" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100">Stopklatka</button>
        <button id="report" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100"
          onClick={() => setReportPopupVisible(true)}>
          Zgłoś</button>
      </div>

      <div id="finish-flight-container" class="absolute bottom-2.5 left-2.5 flex flex-col gap-2.5">
        <button id="finish-flight-button" class="w-[120px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100">Zakończ lot</button>
      </div>

      {isSignalContainerVisible && (
        <div id="signal-container" class="absolute bottom-10 right-2.5 flex flex-col">
          {response.measurements && Object.entries(response.measurements).map(([freq, power]) => (
            <SignalBar key={freq} freq={freq} power={power.toFixed(2)} />
          ))}
        </div>
      )}

      <button
        id="signal-button"
        onClick={() => setSignalContainerVisible(prev => !prev)}
        className="absolute bottom-[5px] right-2.5 h-[35px] w-[120px] flex items-center justify-center opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 cursor-pointer transition-opacity duration-300 hover:opacity-100"
      >
        {isSignalContainerVisible ? "Ukryj pomiary" : "Pokaż "}
      </button>

      {isReportPopupVisible && (
        <ReportPopup onClose={() => setReportPopupVisible(false)} />
      )}
    </div>
  );
}

export default App;
