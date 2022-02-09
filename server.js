import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import apiHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routers/auth.route.js";
import userRoutes from "./routers/user.routes.js";
import connectDB from "./config/db.config.js";

import "./config/redis.config.js"

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/auth", authRoutes);

app.use("/user", userRoutes);


app.use(apiHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error : ${err}`);
  server.close(() => process.exit(1));
});
