# Real-time Todo List Application

A collaborative real-time todo list application built with Angular, Node.js, Express, and MongoDB. Features real-time updates and item locking mechanism to prevent concurrent edits.

## Features

- Real-time synchronization between clients
- Item locking system for collaborative editing
- Material Design UI
- Responsive layout
- Automatic reconnection handling
- Error notifications

## Technology Stack

### Frontend
- Angular 17+
- Angular Material
- RxJS for reactive programming
- WebSocket for real-time communication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Native WebSocket

## Design Patterns Used

### Frontend
1. **Service Pattern**
   - Separation of data management and UI logic
   - WebSocket service for real-time communication
   - Todo service for CRUD operations

2. **Repository Pattern**
   - Centralized data access layer
   - Consistent interface for database operations

3. **Observer Pattern**
   - RxJS Observables for reactive programming
   - Real-time updates handling

4. **Singleton Pattern**
   - Services are provided in root
   - Single instance shared across the application

### Backend
1. **Repository Pattern**
   - Abstraction of database operations
   - Clean separation of concerns

2. **Factory Pattern**
   - WebSocket connection management
   - Database connection handling

3. **Middleware Pattern**
   - Request processing pipeline
   - Error handling
   - Authentication/Authorization

## Setup Instructions

# Real-time Todo List - Setup Guide

## Prerequisites

Before starting, make sure you have the following installed on your system:

1. Node.js (v14.0.0 or higher)
   ```bash
   # To check Node.js version
   node --version
   ```

2. npm (usually comes with Node.js)
   ```bash
   # To check npm version
   npm --version
   ```

3. Angular CLI
   ```bash
   # Install Angular CLI globally
   npm install -g @angular/cli

   # Check Angular CLI version
   ng version
   ```

## Project Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd real-time-todo
   ```

2. Backend Setup
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Create .env file
   echo "PORT=3000
   MONGODB_URI=mongodb://localhost:27017/todolist
   WS_PORT=8080" > .env

   # Start MongoDB (in a new terminal)
   mongod

   # Start the backend server
   npm start
   ```

3. Frontend Setup
   ```bash
   # Open a new terminal
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start the Angular development server
   ng serve
   ```

4. Access the application at `http://localhost:4200`

## Development Environment Recommendations

- IDE: VS Code with following extensions:
  - Angular Language Service
  - TypeScript Importer
  - ESLint
  - Prettier

- Browser: Chrome with following extensions:
  - Angular DevTools
  - Redux DevTools

## Project Structure
```
real-time-todo/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── assets/
│   │   └── environments/
│   ├── package.json
│   └── angular.json
│
└── README.md
```

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todolist
WS_PORT=8080
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:8080'
};
```

## Verification Steps

After setup, verify the following:

1. Backend Status
   ```bash
   # Backend server should show:
   Server running on port 3000
   WebSocket server running on port 8080
   MongoDB connected successfully
   ```

2. Frontend Status
   ```bash
   # Angular server should show:
   √ Compiled successfully.
   ```

3. Browser Console
   - No error messages
   - WebSocket connection established

4. Application Functionality
   - Create a todo item
   - Edit a todo item
   - Delete a todo item
   - Mark a todo as complete
   - Verify real-time updates in multiple browser windows

## Support

If you encounter any issues not covered in this guide:

1. Check the project's issue tracker on GitHub
2. Create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Environment information
   - Error messages/screenshots

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

