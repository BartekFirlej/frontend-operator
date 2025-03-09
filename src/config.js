const config = {
    GATEWAY_LOCALHOST: "http://localhost:5047",
    WS_ENDPOINT: "ws://localhost:8765",
    VIDEO_FEED_URL: "http://localhost:5000/video_feed",
    FLIGHT_BEGIN_ENDPOINT: `${GATEWAY_LOCALHOST}/flights`,
    SIGNAL_ENDPOINT: `${GATEWAY_LOCALHOST}/signals`,
    TARGET_ENDPOINT: `${GATEWAY_LOCALHOST}/targets`
  };
  
  export default config;