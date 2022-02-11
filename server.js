import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import apiHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.config.js";
import allRoutes from "./routers/index.routes.js"

import client from "./config/redis.config.js"


const app = express();

dotenv.config();


app.use(express.json());

app.use(morgan("dev"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/v1' ,allRoutes )

app.use(apiHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
  connectDB();
  client.connect()
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error : ${err}`);
  server.close(() => process.exit(1));
});
