import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notification.js";

dotenv.config();

const app = express();
app.use(express.json());  

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" DB connected successfully.");
    app.listen(PORT, () => {
      console.log(` Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1); 
  });

app.use("/api", userRoutes);
app.use("/api", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
