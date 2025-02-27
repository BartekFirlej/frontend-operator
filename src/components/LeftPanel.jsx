import React from 'react';

const LeftPanel = ({ flightNumber, location, velocity }) => {
  return (
    <div className="absolute top-2.5 left-2.5 gap-2.5 w-[200px] border-r border-[#ccc] flex flex-col">
      <div className="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">
        Identyfikator lotu: <span id="flight-number">{flightNumber}</span>
      </div>
      <div className="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">
        Szerokość: <span id="latitude">{location.x.toFixed(6)}</span> N
      </div>
      <div className="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">
        Długość: <span id="longitude">{location.y.toFixed(6)}</span> E
      </div>
      <div className="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">
        Wysokość: <span id="altitude">{location.z.toFixed(2)}</span> m
      </div>
      <div className="w-[200px] opacity-50 bg-[rgba(0,0,0,0.5)] text-white border-0 p-2.5 transition-opacity duration-300 z-[2] hover:opacity-100">
        Predkość: <span id="velocity">{velocity.toFixed(2)}</span> m/s
      </div>
    </div>
  );
};

export default LeftPanel;
