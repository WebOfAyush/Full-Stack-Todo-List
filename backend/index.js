import express from "express";
import cors from "cors";
import {
  serverStart,
  register,
  login,
  logout,
} from "./controllers/userauth.js";
import { addTask, getTasks, deleteTask } from "./controllers/todo.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {config} from "dotenv"
config()
const app = express();

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://todobuddy.vercel.app",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/logout", logout);
app.post("/api/addtask/:id", addTask);
app.get("/api/gettask/:id", getTasks);
app.get("/", serverStart);
app.delete("/api/deletetask/:id", deleteTask);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
