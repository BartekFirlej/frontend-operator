import React, { useState, useEffect } from 'react';
import SignalBar from './SignalBar';
import config from'../config';
import '../styles/style.css'

const SignalPanel = ({ setResponse, setWs, measurements }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(config.WS_ENDPOINT);

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
    <>
      {isVisible && (
        <div className="absolute bottom-10 right-2.5 flex flex-col">
          {measurements &&
            Object.entries(measurements).map(([freq, power]) => (
              <SignalBar key={freq} freq={freq} power={Number(power).toFixed(2)} />
            ))}
        </div>
      )}

      <button
        onClick={() => setIsVisible(prev => !prev)}
        className="absolute bottom-[5px] right-2.5 h-[35px] w-[120px] flex items-center justify-center text-white uppercase font-bold text-xl tracking-wide p-2.5 border-0 z-[2] osd-text"
      >
        {isVisible ? "UKRYJ" : "POKAŻ"}
      </button>
    </>
  );
};

export default SignalPanel;