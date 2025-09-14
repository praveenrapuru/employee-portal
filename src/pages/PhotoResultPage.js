import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PhotoResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let imgSrc = state?.imgSrc || null;
  if (!imgSrc) {
    try {
      const cached = sessionStorage.getItem("capturedPhoto");
      if (cached) imgSrc = cached;
    } catch {}
  }

  if (!imgSrc) {
    return (
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2">Photo Result</h1>
        <p className="mb-4">No photo available. Please capture a photo first.</p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => navigate("/photo", { replace: true })}
        >
          Go to Camera
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Photo Result</h1>
      <img
        src={imgSrc}
        alt="Captured"
        className="w-80 h-60 border rounded object-cover"
      />
      <div className="mt-4 flex gap-2">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={() => navigate("/photo")}
        >
          Retake
        </button>
        <a
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          href={imgSrc}
          download="photo.jpg"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default PhotoResultPage;
