# Real-Time To-Do List Application

This is a real-time To-Do List application built with Angular (frontend) and Node.js/Express.js (backend) using MongoDB as the database, managed via Mongoose. It supports real-time updates across multiple clients using WebSockets, ensuring that changes (e.g., adding, editing, or deleting tasks) are instantly reflected for all connected users without a page refresh. The application uses Angular Material for a modern UI and includes an edit-locking mechanism to prevent concurrent edits on the same task.

## Features

- Add a new task.
- Edit an existing task (with edit locking).
- Delete a task.
- Mark a task as completed or incomplete.
- Real-time synchronization across all connected clients.
- Edit locking: Only one client can edit a task at a time, with proper lock release.

## Prerequisites

- Node.js (v16.x or later recommended)
- npm (v8.x or later recommended)
- Angular CLI (v17.x or later recommended)
- MongoDB (v4.x or later, running locally or via a service like MongoDB Atlas)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

### 2. Set Up MongoDB

#### Local MongoDB:

- Install MongoDB ([Installation Guide](https://www.mongodb.com/docs/manual/installation/)).
- Start the MongoDB server:

```bash
mongod
```

(Default port is 27017. Ensure it’s running.)

#### MongoDB Atlas (optional):

- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Get your connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo_app?retryWrites=true&w=majority`).

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/todo_app
```

Replace `MONGO_URI` with your MongoDB connection string if using Atlas.

Start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:3000` (or the port specified in `.env`).

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

### 5. Test the Application

- Open multiple browser windows or tabs to `http://localhost:4200`.
- Add, edit, or delete tasks in one window and observe real-time updates in the others.
- Edit a task in one client and verify:
  - Only the selected task enters edit mode on the editing client.
  - Other clients see only that task locked, and it unlocks after saving or canceling.

## Project Structure

```
todo-app/
├── backend/
│   ├── server.js         # Node.js/Express.js server with Socket.IO and Mongoose
│   ├── .env              # Environment variables (not tracked in git)
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts    # Standalone Angular component
│   │   │   ├── app.component.html  # Template
│   │   │   ├── app.component.scss  # Styles
│   │   │   └── socket.service.ts   # WebSocket service
│   │   └── main.ts                 # Bootstrap file
│   └── package.json                # Frontend dependencies
└── README.md                       # This file
```

## Design Decisions and Patterns

### Backend

- **Technology:** Node.js with Express.js, Socket.IO, and Mongoose  
  - **Why?** Socket.IO enables real-time bidirectional communication, and Mongoose provides a schema-based interface to MongoDB for structured data management.

- **Data Storage:** MongoDB (tasks collection in `todo_app` database)  
  - **Why?** Ensures persistent storage, with Mongoose enforcing a schema for tasks (title and completed status).

- **Environment Variables:** Managed with `dotenv`  
  - **Why?** Keeps sensitive configuration (e.g., MongoDB URI) secure and configurable per environment.

- **Edit Locking:** Implemented using a Map (`editingLocks`)  
  - **Why?** Prevents concurrent edits by associating task `_id`s with client socket IDs. Locks are released on save, cancel, or client disconnect.

### Frontend

- **Framework:** Angular (Standalone Component)  
  - **Why?** Standalone components simplify dependency management and reduce boilerplate, leveraging Angular’s reactive capabilities.

- **UI Library:** Angular Material  
  - **Why?** Provides a polished, consistent UI with components like lists, inputs, and checkboxes, minimizing custom styling.

- **Real-Time Updates:** Socket.IO client with RxJS Observables  
  - **Why?** Observables integrate seamlessly with Angular’s reactive paradigm, enabling automatic UI updates on WebSocket events.

### Patterns

- **Event-Driven Architecture:** WebSocket events (e.g., `tasksUpdated`, `taskLocked`) drive communication between server and clients.  
  - **Benefit:** Enables real-time responsiveness and decouples components.

- **Service Layer:** `SocketService` encapsulates WebSocket logic.  
  - **Benefit:** Promotes reusability and keeps the component focused on UI logic.

- **Reactive Programming:** RxJS Observables handle asynchronous WebSocket events.  
  - **Benefit:** Simplifies state management and UI updates.

- **Single Source of Truth:** MongoDB (via Mongoose) maintains the canonical task list, synchronized across clients.  
  - **Benefit:** Ensures data consistency without complex reconciliation.

## Bug Fixes and Adjustments

- **Edit Mode Bug:** Fixed by ensuring `isEditing(taskId)` correctly compares `task._id` with `editingTask._id`, and clearing `editingTask` after save/cancel.
- **Locking Bug:** Ensured `taskId` is consistently a string (MongoDB `_id`) and that `'taskUnlocked'` events are properly emitted and handled.

## Trade-Offs

- **Mongoose Overhead:** Adds complexity over raw MongoDB but improves data validation and maintainability.
- **No Authentication:** Omitted for simplicity; a production app would require user management.
- **In-Memory Locks:** Locks are stored in memory and lost on server restart; a persistent solution could be added for robustness.

## Future Improvements

- Add user authentication and task ownership.
- Persist edit locks in MongoDB for server restart resilience.
- Enhance the UI with features like drag-and-drop reordering or task categories.
- Implement error handling for network or database failures.

## Notes

Add `.env` to `.gitignore` to avoid committing sensitive data:

```
# backend/.gitignore
.env
```

The application now correctly handles task editing and locking, ensuring a smooth collaborative experience.
