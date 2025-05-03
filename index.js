import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDb from "./connection/dbConnection.js"; // Ensure correct file path and `.js` extension
import articleRoutes from "./routes/articleRoutes.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow Next.js frontend

// Async function to start server
const startServer = async () => {
  try {
    await connectToDb();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};
app.use('/api/articles', articleRoutes);


startServer();
