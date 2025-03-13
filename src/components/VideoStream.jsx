import React, { forwardRef, useImperativeHandle, useRef } from "react";
import config from "../config";

const VideoStream = forwardRef(({ zoom }, ref) => {
  const imgRef = useRef(null);
  useImperativeHandle(ref, () => ({
    capture: () => {
      const img = imgRef.current;
      if (img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
      }
      return null;
    }
  }));

  return (
    <div id="video-container" className="relative w-[1920px] h-[1080px] overflow-hidden">
      <img
        ref={imgRef}
        crossOrigin="anonymous"
        className="w-[1920px] h-[1080px] transform origin-center"
        style={{ transform: `scale(${zoom})` }}
        src={config.VIDEO_FEED_URL}
        alt="Drone View"
      />
    </div>
  );
});

export default VideoStream;
