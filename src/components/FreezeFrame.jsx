import React from 'react';
import '../styles/style.css'
import { osdTextXL } from '../style';

const FreezeFrame = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed bottom-10 left-10 w-[900px] bg-[rgba(50,50,50,0.9)] text-white p-5 rounded-[15px] shadow-[0_0_10px_rgba(0,0,0,0.5)] text-[16px] font-bold z-[1000] transition-opacity duration-300 ease-in-out block opacity-100"
    >
      <img
        className="w-full"
        src={imageUrl}
        alt="Spróbuj ponownie"
        crossOrigin="anonymous"
      />
      <button
        className={`${osdTextXL} w-[35%] my-2 mx-1 border-0 py-2.5 px-5 text-white cursor-pointer rounded-[5px] transition-colors duration-300 bg-red-500 hover:bg-red-600`}
        onClick={onClose}
      >
        Zamknij
      </button>
    </div>
  );
};

export default FreezeFrame;
