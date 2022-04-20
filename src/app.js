import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet"
import cors from "cors"

import defaultErrorHandler from "./middlewares/errorHandler.js";
import allRoutes from "./routers/index.routes.js"
import ApiError from "./utils/errorClass.js";


// initialize app
const app = express();

// set security headers
app.use(helmet())

// load env variables
dotenv.config();

// parse req body
app.use(express.json());

// enable cors for all origins
app.use(cors())

app.use(morgan("dev"));

// accept urlencoded from data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// all routes
app.use('/v1' ,allRoutes )

// default error handler for express
app.use(defaultErrorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError('Not found' , 404));
});


export default app

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`Running on port ${PORT}`);
//   connectDB();
//   client.connect()
// });

// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Logged error : ${err}`);
//   server.close(() => process.exit(1));
// });
