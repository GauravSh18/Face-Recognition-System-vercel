import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

function App() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    loadModels();
    setupCamera();
  }, []);

  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      ]);
      setIsModelLoaded(true);
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        const capturedImageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(capturedImageData);
        setFaceDescriptor(detections.descriptor);
      } else {
        console.log('No face detected');
      }
    }
  };

  const handleRegister = async () => {
    if (!faceDescriptor) {
      console.log('No face detected for registration');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: 'John Doe', // In a real app, you'd get this from a form
        email: 'john@example.com', // In a real app, you'd get this from a form
        faceDescriptor: Array.from(faceDescriptor)
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    if (!faceDescriptor) {
      console.log('No face detected for login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        faceDescriptor: Array.from(faceDescriptor)
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Face Recognition System</h1>
      {!isModelLoaded && <p>Loading models...</p>}
      <div className="relative">
        <video ref={videoRef} width="640" height="480" autoPlay muted className="rounded-lg shadow-md" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <button
        onClick={captureImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Capture Image
      </button>
      {capturedImage && (
        <div className="mt-4">
          <img src={capturedImage} alt="Captured" className="w-64 h-64 object-cover rounded-lg shadow-md" />
          <div className="mt-2 space-x-2">
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

