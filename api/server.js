import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Routes from "./routes/Routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());

// Routes
app.use("/api", Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`You can now access the server at http://localhost:${PORT}`);
});