import dotenv from "dotenv"
import connectDB from "./config/db.config.js";
import app from './app.js'
import logger from "./config/logger.config.js";
import client from './config/redis.config.js'

// load env
dotenv.config()

let server

const PORT = process.env.PORT || 3000

// connect to db
connectDB()
.then((data)=>{
  logger.info("Connected to DB")

    // connect to redis
    client.connect().then(()=>{

      // run express server
      server = app.listen(PORT , ()=>{
        logger.info(`Server listining on port ${PORT}`)
      })

    }).catch((err)=>{
      logger.error(`Error connecting to Redis : ${err.message}`)
    })

})
.catch((err)=>{
  logger.error(`Error connecting to DB: ${err.message}`)
})


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});