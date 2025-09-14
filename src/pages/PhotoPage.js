import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

function PhotoPage() {
  const [imgSrc, setImgSrc] = useState(null);
  const navigate = useNavigate();

  const capture = (webcamRef) => {
    const image = webcamRef.current.getScreenshot();
    if (!image) return;
    setImgSrc(image);
    try {
      sessionStorage.setItem("capturedPhoto", image);
    } catch {}
    navigate("/photo/result", { state: { imgSrc: image } });
  };

  const webcamRef = React.useRef(null);

  return (
    <div className="flex flex-col items-center p-4">
      {!imgSrc ? (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-80 h-60 border"/>
          <button onClick={() => capture(webcamRef)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Capture</button>
        </>
      ) : (
        <>
          <h2 className="mb-2">Captured Photo</h2>
          <button
            onClick={() => navigate("/photo/result", { state: { imgSrc } })}
            className="focus:outline-none"
            title="Click to view result"
          >
            <img src={imgSrc} alt="Captured (click to view result)" className="w-80 h-60 border rounded object-cover"/>
          </button>
          <p className="text-sm text-gray-600 mt-2">Click the photo to view the result page.</p>
        </>
      )}
    </div>
  );
}

export default PhotoPage;
