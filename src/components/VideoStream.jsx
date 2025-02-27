import React from "react";
import config from "../config";

const VideoStream = ({ zoom }) => {
    return (
        <div id="video-container" class="relative w-[1920px] h-[1080px] overflow-hidden">
            <img id="videoStream"
                style={{ transform: `scale(${zoom})` }}
                class="w-[1920px] h-[1080px] transform scale-100 origin-center"
                src={config.VIDEO_FEED_URL}
                alt="Drone View"
            />
        </div>
    );
};

export default VideoStream;
