# AI-Based Employee Performance Analytics & Recommendation System (EvoHR)

A full-stack MERN application with a premium, dynamic UI that analyzes employee performance data and provides AI-powered recommendations using OpenRouter/OpenAI compatible API.

## Features

- **Authentication & Security:** JWT based secure login and registration with bcrypt password hashing.
- **Employee Management:** Add, search, and list employees with skills, department, experience, and performance scores.
- **AI Analytics Matrix:** Generate real-time insights including promotion recommendations, rankings, training suggestions, and feedback based on performance data.
- **Premium UI/UX:** Built with React, TailwindCSS, and modern glassmorphism design principles, featuring dynamic gradients, micro-animations, and a fully responsive layout.

## Tech Stack

- **Frontend:** React, TailwindCSS v3, Vite, Axios, React Router Dom, Lucide Icons, React Markdown.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, BcryptJS, Axios.
- **AI Integration:** OpenRouter / OpenAI compatible API (configurable via `.env`).

## Setup & Local Development

### 1. Database Setup
Create a MongoDB Atlas cluster or run MongoDB locally.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_openrouter_or_openai_api_key
AI_API_URL=https://openrouter.ai/api/v1/chat/completions # Or OpenAI endpoint
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Start the Vite development server:
```bash
npm run dev
```

## Deployment on Render

### Backend Deployment (Render Web Service)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Environment: `Node`.
6. Build Command: `npm install`.
7. Start Command: `node server.js`.
8. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `AI_API_KEY`, etc.).
9. Deploy.

### Frontend Deployment (Render Static Site)
1. In Render, create a new **Static Site**.
2. Connect the same GitHub repository.
3. Set the Root Directory to `frontend`.
4. Build Command: `npm run build`.
5. Publish Directory: `dist`.
6. Add Environment Variables if you have frontend specific ones (like `VITE_API_URL` pointing to your deployed backend URL. Update frontend axios calls to use this env var).
7. Deploy.

## Git & GitHub Usage
This project has been initialized with a clean commit history. To push to your own repository:
```bash
git remote add origin https://github.com/yourusername/evohr-performance-system.git
git branch -M main
git push -u origin main
```
