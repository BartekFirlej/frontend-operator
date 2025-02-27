import React, { forwardRef } from 'react';
import config from '../config';

const VideoStream = forwardRef(({ zoom }, ref) => {
  return (
    <div id="video-container" className="relative w-[1920px] h-[1080px] overflow-hidden">
      <img
        ref={ref}
        id="videoStream"
        className="w-[1920px] h-[1080px] transform origin-center"
        style={{ transform: `scale(${zoom})` }}
        src={config.VIDEO_FEED_URL}
        alt="Drone View"
      />
    </div>
  );
});

export default VideoStream;
