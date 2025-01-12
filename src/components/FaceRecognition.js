import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function FaceRecognition({ imageUrl }) {
  const imageRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    async function detectFace() {
      const detection = await faceapi.detectSingleFace(imageRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const displaySize = { width: imageRef.current.width, height: imageRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const resizedDetection = faceapi.resizeResults(detection, displaySize);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetection);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetection);
      }
    }

    if (imageRef.current) {
      detectFace();
    }
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative' }}>
      <img ref={imageRef} src={imageUrl} alt="Face detection" style={{ maxWidth: '100%' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
}

export default FaceRecognition;

