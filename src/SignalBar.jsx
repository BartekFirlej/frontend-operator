import React from 'react';

function getSignalColor(level) {
    if (level >= -40) return 'red';
    if (level >= -60) return 'orange';
    return 'green';
}

function getSignalWidth(level) {
    const minDb = -100;
    const maxDb = 0;

    const clampedLevel = Math.max(minDb, Math.min(level, maxDb));

    return Math.max(0, Math.min(100, ((clampedLevel - minDb) / (maxDb - minDb)) * 100));
}

function SignalBar({ freq, power }) {
  const width = getSignalWidth(power);
  const color = getSignalColor(power);

  return (
    <div class="w-[120px] h-[20px] m-[1px] border border-black rounded-[5px] relative text-white overflow-hidden text-xs" data-freq={freq}>
      <div
        class="h-full w-0 bg-green-500"
        style={{ width: `${width}%`, backgroundColor: color }}
      ></div>
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[5px] box-border">
        {freq} MHz {power} dB
      </div>
    </div>
  );
}

export default SignalBar;
