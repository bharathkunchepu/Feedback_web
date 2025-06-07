
# Feedback App

A simple full-stack web application where users can submit feedback and view all feedback.  
Built with React (frontend) + Node.js/Express (backend) + MongoDB Atlas (database).  
Deployed to cloud (Render.com).

## Live Demo

Frontend: https://feedback-web-2.onrender.com 
Backend API: https://feedback-web.onrender.com

## Features

- Submit feedback with Name, Email, and Message
- Display all submitted feedback
- Responsive design with dark theme
- Data persisted in MongoDB Atlas
- Full-stack deployed to the cloud

## Tech Stack

- Frontend: React + CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Hosting: Render.com

## Folder Structure

```
my-feedback-app/
- backend/              # Node.js + Express backend
- frontend/             # React frontend
- README.md             # Project README
```

## Local Development Setup

### 1. Prerequisites

- Node.js and npm installed
- Git installed
- MongoDB Atlas account (free tier is enough)

### 2. Backend Setup (Node.js + Express)

```bash
cd backend
npm install
```

Create `.env` in backend:

```env
PORT=5000
MONGO_URI=your-mongodb-atlas-connection-string
```

Start backend:

```bash
npm start
```

The backend will run on: [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

The frontend will run on: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### GET /feedback

- Returns all submitted feedback as JSON.

### POST /feedback

- Submits new feedback.

Example Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great app!"
}
```

## Deployment Instructions

### Deploy Backend (Render.com)

1. Go to [https://render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Select the backend folder
5. Build command: `npm install`
6. Start command: `node index.js` (or your defined npm start command)
7. Add environment variable `MONGO_URI` with your MongoDB Atlas connection string

### Deploy Frontend (Render.com or Vercel)

1. Create a new Static Site (Render) or Project (Vercel)
2. Select the frontend folder
3. Build command: `npm run build`
4. Publish directory: `build`
5. Update frontend API calls to point to your deployed backend URL:

```javascript
fetch('https://your-backend-url.onrender.com/feedback')
```

## Example Live URLs

- Frontend: [https://your-frontend-url.onrender.com](https://your-frontend-url.onrender.com)
- Backend API: [https://your-backend-url.onrender.com/feedback](https://your-backend-url.onrender.com/feedback)

## Future Improvements

- Add authentication (optional)
- Add pagination to feedback list
- Allow editing/deleting feedback (admin feature)
- Improve form validation and UX

## License

MIT License

## Author

- Bharath Kumar ([https://github.com/your-github-username](https://github.com/your-github-username))
