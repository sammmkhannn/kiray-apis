import express from "express";
import { config } from "dotenv";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import planRoutes from "./routes/plan.routes.js";
import requestRoutes from "./routes/request.routes.js";
import cors from "cors";
import connect from "./config/db.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static("images"));
//route config
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use('/plans',planRoutes)
connect(`${process.env.DB_URI}`);
app.listen(PORT, () => {
  console.log("server is listening on port",PORT);
});
