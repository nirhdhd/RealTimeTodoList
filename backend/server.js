require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// MongoDB Connection with Mongoose
const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB via Mongoose"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

let editingLocks = new Map();

io.on("connection", async (socket) => {
  console.log("New client connected:", socket.id);

  const tasks = await Task.find({});
  socket.emit("initialTasks", tasks);

  socket.on("addTask", async (task) => {
    const newTask = new Task({ title: task.title });
    await newTask.save();
    const updatedTasks = await Task.find({});
    io.emit("tasksUpdated", updatedTasks);
  });

  socket.on("editTask", ({ taskId, clientId }) => {
    // Ensure taskId is treated as a string
    if (!editingLocks.has(taskId)) {
      editingLocks.set(taskId, clientId);
      io.emit("taskLocked", { taskId, clientId });
    }
  });

  socket.on("updateTask", async (updatedTask) => {
    const taskId = updatedTask._id; // _id is already a string from MongoDB
    await Task.findByIdAndUpdate(taskId, {
      title: updatedTask.title,
      completed: updatedTask.completed,
    });
    const updatedTasks = await Task.find({});
    editingLocks.delete(taskId);
    io.emit("tasksUpdated", updatedTasks);
    io.emit("taskUnlocked", taskId); // Ensure this is emitted
  });

  socket.on("deleteTask", async (taskId) => {
    if (!editingLocks.has(taskId)) {
      await Task.findByIdAndDelete(taskId);
      const updatedTasks = await Task.find({});
      io.emit("tasksUpdated", updatedTasks);
    }
  });

  socket.on("releaseLock", (taskId) => {
    editingLocks.delete(taskId);
    io.emit("taskUnlocked", taskId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    for (const [taskId, clientId] of editingLocks) {
      if (clientId === socket.id) {
        editingLocks.delete(taskId);
        io.emit("taskUnlocked", taskId);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
