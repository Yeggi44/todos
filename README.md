ToDo Application

A full-stack ToDo application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to sign up, sign in, and manage their todos with full CRUD operations.

Project Structure

The project is divided into two main directories:

backend - Express.js REST API
frontend - React application

Setup Instructions

Frontend Setup

1. Navigate to the frontend directory:
    (cd frontend)

2. Install dependencies:
   (npm install)

3. Update the API URL in src/api/index.js to point to your backend server:
   (export const url = "http://localhost:8000/api")

4. Start the frontend development server:
    (npm start)

Backend Setup

1. Navigate to the backend directory:
   (cd backend)

2. Install dependencies:
  (npm install)

3. Update MongoDB connection in config/db.config.js with your own connection string:
  (await mongoose.connect("your_mongodb_connection_string");)

4. Start the backend server
   (node index.js)
  The server should start on port 8000 (or the port specified in your .env file).







   





