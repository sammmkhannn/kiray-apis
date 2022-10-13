import express from "express";
import { config } from "dotenv";
import postRoutes from "./routes/post.routes.js";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route config
app.use("/posts", postRoutes);
app.listen(PORT, () => {
  console.log("connected to the database");
});
