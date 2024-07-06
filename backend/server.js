import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.error('Failed to connect to the DB:', err);
  });

const app = express();

app.use(express.json());

app.listen(8000, () => {
  console.log(`Server running on port 8000`);
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
