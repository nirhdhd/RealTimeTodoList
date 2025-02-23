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

1. Install dependencies:
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

2. Environment setup:
```bash
# Create .env file in backend directory
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todolist
WS_PORT=8080
```

3. Start the application:
```bash
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
ng serve
```

4. Access the application at `http://localhost:4200`

## Code Structure

```
src/
├── app/
│   ├── models/          # Data models
│   ├── services/        # Business logic and data services
│   ├── components/      # UI components
│   ├── repositories/    # Data access layer
│   └── utils/          # Helper functions and utilities
├── assets/             # Static files
└── environments/       # Environment configurations
```

## Best Practices

1. **Clean Code**
   - Meaningful variable and function names
   - Single responsibility principle
   - DRY (Don't Repeat Yourself)
   - SOLID principles

2. **Error Handling**
   - Comprehensive error catching
   - User-friendly error messages
   - Logging for debugging

3. **Performance**
   - OnPush change detection
   - Proper unsubscription from observables
   - Optimized WebSocket communication

4. **Security**
   - Input validation
   - XSS prevention
   - CSRF protection

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
