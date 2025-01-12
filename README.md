# Face Recognition System

This is a MERN (MongoDB, Express, React, Node.js) stack application that implements a face recognition system using face-api.js.

## Features

- Face detection and recognition using webcam
- User registration with face descriptors
- User login using face recognition
- MongoDB for storing user data and face descriptors

## Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account or local MongoDB installation
- Webcam-enabled device

## Structure
This MERN stack project sets up a basic face recognition system. Here's a brief overview of what each part does:

1. The backend (`server.js`) sets up an Express server with MongoDB connection and defines API routes for user registration and login.
2. The user model (`models/User.js`) defines the schema for storing user data, including face descriptors.
3. The user routes (`routes/userRoutes.js`) handle user registration and login using face descriptors.
4. The frontend React application (`src/App.js`) uses face-api.js to capture images from the user's camera, detect faces, and extract face descriptors. It also provides UI for registration and login.

## Installation
To run this project, you'll need to:

1. Set up a MongoDB database and add the connection string to your `.env` file.
2. Install the required dependencies for both frontend and backend.
3. Download the face-api.js models and place them in the `public/models` directory of your React app.
4. Run the backend server using Node.js.
5. Run the frontend React application using a development server like `create-react-app`.


## Setup MongoDB
Here's a step-by-step guide to set up a MongoDB database and configure it for your face recognition system:

1. Sign up for MongoDB Atlas:

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click on "Try Free" and create an account or sign in if you already have one


2. Create a new cluster:

1. Once logged in, click on "Build a Cluster"
2. Choose the free tier option (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster" (this may take a few minutes)


3. Set up database access:

1. In the left sidebar, click on "Database Access"
2. Click "Add New Database User"
3. Choose a username and a strong password
4. Set user privileges to "Read and write to any database"
5. Click "Add User"


4. Configure network access:

1. In the left sidebar, click on "Network Access"
2. Click "Add IP Address"
3. To allow access from anywhere (not recommended for production), click "Allow Access from Anywhere"
4. For development, you can add your current IP address
5. Click "Confirm"


5. Get your connection string:

1. Once your cluster is created, click on "Connect"
2. Choose "Connect your application"
3. Select your driver and version (Node.js, latest version)
4. Copy the connection string provided


6. Add the connection string to your `.env` file.

7. Test the connection:

1. Start your server by running `node server.js`
2. If you see the message "Connected to MongoDB" in the console, your connection is successful

## Run the Project

1. Open the terminal and run "npm install" command.
2. Then run "npm run dev" command.
3. Now you will get a url for the frondend. Click on the url or open it in browser to use the application.
