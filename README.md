# TaskFlow — Full-Stack To-Do List Application

TaskFlow is a production-quality, responsive full-stack To-Do List application built with a modern React frontend and a Node.js / Express / MongoDB backend. It adheres strictly to RESTful architecture and the Controller-Service-Routes design pattern, with comprehensive input validation, error handling, search, and status filtering.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Folder Structure](#project-folder-structure)
4. [Prerequisites](#prerequisites)
5. [Environment Variables](#environment-variables)
6. [Local Installation & Setup](#local-installation--setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
7. [MongoDB Atlas Setup](#mongodb-atlas-setup)
8. [Running the Application](#running-the-application)
9. [REST API Documentation](#rest-api-documentation)
10. [Automated Testing & Postman Instructions](#automated-testing--postman-instructions)
11. [Deployment Guide](#deployment-guide)
    - [Backend on Render](#backend-on-render)
    - [Frontend on Netlify](#frontend-on-netlify)
12. [Challenges Faced & Solutions](#challenges-faced--solutions)

---

## 1. Features

- **Full CRUD Operations:** Create, Read (all/single), Update (full `PUT`), Partial Update (`PATCH` completion status), and Delete tasks.
- **Search & Filter:** Real-time keyword search across task titles and descriptions, plus filtering by completion status (`All`, `Pending`, `Completed`).
- **Dynamic Dashboard Metrics:** Live statistics cards computing total, pending, and completed tasks.
- **Modern UI/UX:** Clean, accessible aesthetic with subtle card elevations, responsive sidebar navigation, custom SVG checkboxes, animated loading skeletons, and interactive confirmation modals.
- **Controller-Service-Routes Architecture:** Separation of routing, HTTP handling, and database business logic.
- **Defensive Error Handling:** Centralized Express middleware catching invalid ObjectIds, validation errors, malformed JSON, and unknown endpoints with consistent JSON payloads.
- **Production-Ready & Responsive:** Optimized for desktop, tablet, and mobile screen viewports.

---

## 2. Technologies Used

### Frontend
- **React 18** — Component-driven user interface
- **Vite** — Build tool and dev server (configured with `npm start` for port 3000)
- **Axios** — Centralized HTTP client with interceptors
- **Lucide React** — Consistent icon set
- **CSS3 / Variables** — Responsive layouts without bulky UI frameworks

### Backend
- **Node.js** — JavaScript runtime environment
- **Express.js** — RESTful API web framework
- **MongoDB & Mongoose ODM** — Document database modeling and indexing
- **CORS** — Cross-Origin Resource Sharing middleware
- **Dotenv** — Environment variable management
- **Supertest** — Automated end-to-end API testing

---

## 3. Project Folder Structure

```
todo-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection configuration
│   │   ├── models/
│   │   │   └── Task.js             # Mongoose schema and transforms
│   │   ├── controllers/
│   │   │   └── taskController.js   # Request/response controller methods
│   │   ├── services/
│   │   │   └── taskService.js      # Business logic & database queries
│   │   ├── routes/
│   │   │   └── taskRoutes.js       # Express router endpoints
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handler
│   │   │   └── notFound.js         # 404 handler for invalid routes
│   │   ├── utils/
│   │   │   └── asyncHandler.js     # Promise wrapper for async routes
│   │   └── app.js                  # Express app setup & middleware
│   ├── server.js                   # Server entry point
│   ├── test-runner.js              # 13 automated integration tests
│   ├── .env.example                # Example backend environment variables
│   ├── .gitignore                  # Git ignore rules for backend
│   └── package.json                # Backend scripts and dependencies
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Top bar with greeting & Add Task CTA
│   │   │   ├── Sidebar.jsx         # Navigation sidebar with dynamic counts
│   │   │   ├── StatsCard.jsx       # Overview statistics cards
│   │   │   ├── SearchBar.jsx       # Real-time search input
│   │   │   ├── FilterBar.jsx       # Status filter buttons
│   │   │   ├── TaskCard.jsx        # Individual task item card
│   │   │   ├── TaskModal.jsx       # Add/Edit task modal with validation
│   │   │   ├── DeleteConfirmModal.jsx # Delete confirmation dialog
│   │   │   ├── EmptyState.jsx      # Friendly placeholder when no tasks
│   │   │   ├── LoadingSkeleton.jsx # Animated loading skeleton cards
│   │   │   └── ErrorMessage.jsx    # Error banner with retry button
│   │   ├── services/
│   │   │   └── api.js              # Centralized Axios API service
│   │   ├── utils/
│   │   │   └── formatDate.js       # Date formatting utilities
│   │   ├── App.jsx                 # Main state coordinator
│   │   ├── index.jsx               # React DOM root entry
│   │   └── index.css               # Design system & styles
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite configuration
│   ├── netlify.toml                # Netlify SPA redirect rules
│   ├── .env.example                # Example frontend environment variables
│   ├── .gitignore                  # Git ignore rules for frontend
│   └── package.json                # Frontend scripts and dependencies
│
├── postman_collection.json         # Ready-to-import Postman test collection
├── .gitignore                      # Root git ignore
└── README.md                       # Comprehensive project documentation
```

---

## 4. Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or later; tested and verified on Node v26)
- **npm** (v9.0.0 or later)
- A free **MongoDB Atlas** account (or local MongoDB community server)

---

## 5. Environment Variables

### Backend (`backend/.env`)
Create a `.env` file inside the `backend/` directory by copying `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo_app?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory by copying `.env.example`:

```bash
VITE_API_URL=http://localhost:5000/api/v1
REACT_APP_API_URL=http://localhost:5000/api/v1
```

---

## 6. Local Installation & Setup

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file with your MongoDB connection string (see [MongoDB Atlas Setup](#mongodb-atlas-setup)).
4. Run automated tests to verify the setup:
   ```bash
   npm test
   ```

### Frontend Setup
1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify the build succeeds:
   ```bash
   npm run build
   ```

---

## 7. MongoDB Atlas Setup

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (e.g., M0 Sandbox).
3. Under **Security > Database Access**:
   - Create a database user with read and write privileges.
   - Note the username and password.
4. Under **Security > Network Access**:
   - Add an IP access entry: choose `Allow Access from Anywhere` (`0.0.0.0/0`) for development and hosting deployment.
5. Under **Database > Deployment**:
   - Click **Connect** > **Drivers** (Node.js).
   - Copy the connection string.
6. Replace `<username>` and `<password>` with your database user credentials.
7. Paste this string into `backend/.env` as `MONGODB_URI`.

---

## 8. Running the Application

### 1. Start the Backend Server
In the `backend` folder:
```bash
npm start
```
*Expected terminal output:*
```
Server running in development mode on port 5000
MongoDB Connected: cluster0-shard-00-00.mongodb.net
```

### 2. Start the Frontend Development Server
In the `frontend` folder:
```bash
npm start
```
*Expected terminal output:*
```
  VITE v6.1.0  ready in 150 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:3000`.

---

## 9. REST API Documentation

Base URL: `http://localhost:5000/api/v1`

### Endpoints Overview

| Method | Endpoint | Description | Request Body | Status Code |
|---|---|---|---|---|
| `POST` | `/tasks` | Create a new task | `{ title, description }` | `201 Created` |
| `GET` | `/tasks` | Get all tasks (supports search & filter) | None | `200 OK` |
| `GET` | `/tasks/:id` | Get single task by ID | None | `200 OK` |
| `PUT` | `/tasks/:id` | Full update of task | `{ title, description, completed }` | `200 OK` |
| `PATCH` | `/tasks/:id`| Partial update (e.g., toggle status)| `{ completed: true }` | `200 OK` |
| `DELETE`| `/tasks/:id`| Permanently delete task | None | `204 No Content`|

### Query Parameters for `GET /tasks`
- **Search:** `GET /api/v1/tasks?search=Node` (searches title and description, case-insensitive)
- **Status Filter:**
  - `GET /api/v1/tasks?status=completed` (completed only)
  - `GET /api/v1/tasks?status=pending` (pending only)
- **Combined:** `GET /api/v1/tasks?search=Node&status=pending`

### Example Request & Response Payloads

#### Create Task (`POST /api/v1/tasks`)
```json
// Request
{
  "title": "Build full-stack to-do app",
  "description": "Connect React frontend with Express backend"
}

// Response (201 Created)
{
  "success": true,
  "data": {
    "id": "6724a2ef39149028911d1a1b",
    "title": "Build full-stack to-do app",
    "description": "Connect React frontend with Express backend",
    "completed": false,
    "createdAt": "2026-11-01T09:30:00.000Z",
    "updatedAt": "2026-11-01T09:30:00.000Z"
  }
}
```

#### Delete Task (`DELETE /api/v1/tasks/:id`)
- **Status:** `204 No Content`
- **Body:** Empty

#### Validation Error (`POST /api/v1/tasks` with empty title)
```json
// Response (400 Bad Request)
{
  "success": false,
  "message": "Task title is required and cannot be empty"
}
```

---

## 10. Automated Testing & Postman Instructions

### 1. Automated Integration Suite
The backend includes a pre-configured integration test suite validating all 13 core scenarios:
```bash
cd backend
npm test
```

### 2. Testing with Postman
A Postman collection file is provided at the root: `postman_collection.json`.

1. Open **Postman**.
2. Click **Import** in the upper left.
3. Select or drag-and-drop `postman_collection.json`.
4. Ensure your backend server is running on `http://localhost:5000`.
5. The collection contains 13 pre-configured requests with embedded assertions:
   - Create Task (automatically stores `taskId` variable for subsequent calls)
   - Get All Tasks
   - Get Task By ID
   - Full Update (PUT)
   - Toggle Status (PATCH)
   - Search By Keyword
   - Filter By Completed / Pending
   - Validation Errors (Empty Title, Malformed ID)
   - Delete Task (204 No Content)
   - Not Found Verification (404)
6. Click **Run collection** to run all tests automatically.

---

## 11. Deployment Guide

### Backend on Render
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com).
3. Click **New +** > **Web Service**.
4. Connect your GitHub repository.
5. Configure the service settings:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. Add the following **Environment Variables**:
   - `PORT`: `5000` (Render will override automatically or supply its own port)
   - `MONGODB_URI`: *Your MongoDB Atlas connection string*
   - `CLIENT_URL`: *Your deployed Netlify frontend URL* (e.g. `https://your-app.netlify.app`)
   - `NODE_ENV`: `production`
7. Click **Create Web Service**. Note the assigned URL (e.g. `https://todo-backend-xyz.onrender.com`).

### Frontend on Netlify
1. Sign in to [Netlify](https://www.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select your GitHub repository.
4. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Under **Environment variables**, add:
   - `VITE_API_URL`: `https://todo-backend-xyz.onrender.com/api/v1`
   - `REACT_APP_API_URL`: `https://todo-backend-xyz.onrender.com/api/v1`
6. Click **Deploy Site**.
7. The included `frontend/netlify.toml` automatically handles client-side routing and redirects.

---

## 12. Challenges Faced & Solutions

1. **Modern Node Compatibility & Deprecated CRA:**  
   *Challenge:* Traditional `create-react-app` fails on Node 18+ and Node 26 with OpenSSL errors and deprecated Webpack plugins.  
   *Solution:* Used Vite configured with `npm start` mapped to port 3000. This provides sub-second hot module replacement, 100% compatibility with Node 26, and instant production builds while maintaining standard npm workflow commands.

2. **Accurate Error Propagation in Centralized Middleware:**  
   *Challenge:* Custom service errors thrown with `error.statusCode = 400` or `404` defaulted to `500` if Express had not yet set the response status.  
   *Solution:* Configured `errorHandler.js` to inspect `err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode)`.

3. **Optimistic Status Toggling:**  
   *Challenge:* Waiting for network round-trips when clicking checkboxes made the interface feel sluggish.  
   *Solution:* Updated local React state immediately on toggle, reverted gracefully, and displayed an inline error banner if the server rejected the request.

4. **Preserving Schema Virtuals (`id` vs `_id`):**  
   *Challenge:* MongoDB documents use `_id`, while REST standards and frontend consumers prefer `id`.  
   *Solution:* Configured Mongoose schema transforms in `Task.js` to map `_id` to `id` and remove `__v` upon JSON serialization, ensuring seamless interoperability.
