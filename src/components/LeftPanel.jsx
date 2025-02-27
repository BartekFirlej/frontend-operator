import React from 'react';
import { osdTextXL } from '../style';
import '../styles/style.css'

const LeftPanel = ({ flightNumber, location, velocity }) => {
  return (
    <div className="absolute top-2.5 left-2.5 gap-2.5 w-[100px] border-r border-[#ccc] flex flex-col">
      <div className={`${osdTextXL} osd-text`}>
        ID: <span>{flightNumber}</span>
      </div>
      <div className={`${osdTextXL} osd-text`}>
        <span>{location.x.toFixed(6)}</span> N
      </div>
      <div className={`${osdTextXL} osd-text`}>
        <span>{location.y.toFixed(6)}</span> E
      </div>
      <div className={`${osdTextXL} osd-text`}>
        <span>{location.z.toFixed(2)}</span> m
      </div>
      <div className={`${osdTextXL} osd-text`}>
        <span>{velocity.toFixed(2)}</span> m/s
      </div>
    </div>
  );
};

export default LeftPanel;
