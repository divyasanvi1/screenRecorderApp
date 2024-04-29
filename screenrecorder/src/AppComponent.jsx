import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { styled } from "@mui/system";
const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightblue",
  height: "100vh",
});
const VideoContainer = styled("div")({
  width: "900px",
  paddingTop: "395px", // 16:9 aspect ratio
  position: "relative",
  overflow: "hidden",
});
const VideoElement = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
});
function AppComponent({ selectedMediaType }) {
  return (
    <>
      <ReactMediaRecorder
        video={selectedMediaType === "video"}
        screen={selectedMediaType === "screen"}
        render={({ status, startRecording, stopRecording, mediaBlobUrl, mediaStream }) => (
          <Container>
            <div>
              <VideoContainer>
              <VideoElement src={mediaBlobUrl} controls  loop />
              </VideoContainer>
              <div className="flex justify-center items-center">
                <p>{status}</p>
                <button
                  onClick={startRecording}
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Start Recording
                </button>
                <button
                  onClick={stopRecording}
                  className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Stop Recording
                </button>
              </div>
            </div>
          </Container>
        )}
      />
    </>
  );
}

export default AppComponent;
