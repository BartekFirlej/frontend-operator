const GATEWAY_LOCALHOST = "http://localhost:5147";
const BACKEND_OPERATOR = "http://localhost:5000"

const config = {
  GATEWAY_LOCALHOST,
  WS_ENDPOINT: "ws://localhost:8765",
  VIDEO_FEED_URL: `${BACKEND_OPERATOR}/video_feed`,
  FLIGHT_BEGIN_ENDPOINT: `${BACKEND_OPERATOR}/flights/begin`,
  FLIGHT_END_ENDPOINT: `${BACKEND_OPERATOR}/flights/end`,
  TARGET_ENDPOINT: `${BACKEND_OPERATOR}/targets`,
  SIGNAL_ENDPOINT: `${GATEWAY_LOCALHOST}/signals`,
};

export default config;
