import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { styled } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
 // backgroundImage: `url('./pexels-padrinan-255379(1).jpg')`,
  backgroundSize: "cover",
  height: "100vh",
});
const VideoContainer = styled("div")({
  width: "900px",
  paddingTop: "395px", // 16:9 aspect ratio
  position: "relative",
  overflow: "hidden",
  backgroundColor: "grey",
  
});
const VideoElement = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
});
function AppComponent({ selectedMediaType }) {
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);

  const videoRef = useRef(null);
  const downloadLinkRef = useRef(null);

  const handleDownload = async (mediaBlobUrl) => {
    if (mediaBlobUrl) {
      try {
        const response = await fetch(mediaBlobUrl);
        console.log("Download Response:", response);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Use the blob and URL as needed
        console.log("Download URL:", url);
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = "recorded-media.mp4";
        downloadLinkRef.current.click();

        // Revoke the URL when done to release memory
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading media:", error);
      }
    }
  };

  

  useEffect(() => {
    // Request access to the user's camera when the component mounts
    if (selectedMediaType === "video") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    } else if (selectedMediaType === "screen") {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing screen:", error);
        });
    }
  }, [selectedMediaType]);
  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <>
      <ReactMediaRecorder
        video={selectedMediaType === "video"}
        screen={selectedMediaType === "screen"}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <Container>
            <div>
              <VideoContainer>
                {mediaStream && <VideoElement ref={videoRef} autoPlay />}

                {mediaBlobUrl && (
                  <VideoElement src={mediaBlobUrl} controls loop />
                )}
              </VideoContainer>

              <div className="flex justify-center items-center m-20">
               
                {status==="idle" && (
                  <button
                    onClick={() => {
                      startRecording();
                      setRecording(true);
                    }}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Start Recording
                  </button>
                )}
                {recording && (
                  <button
                    onClick={() => {
                      stopRecording();
                      setRecording(false);
                      console.log(mediaStream)
                      if (mediaStream) {
                        mediaStream.getTracks().forEach(track => track.stop());
                        setMediaStream(null);
                        console.log(mediaStream)
                      }
                    }}
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Stop Recording
                  </button>
                )}
                {status === "stopped" && mediaBlobUrl && (
                  <Button variant="contained" onClick={() => handleDownload(mediaBlobUrl)}>
                    Download Recorded Media
                  </Button>
                )}
                <a ref={downloadLinkRef} style={{ display: "none" }} />
              </div>
            </div>
          </Container>
        )}
      />
    </>
  );
}

export default AppComponent;
