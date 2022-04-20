import redis from "redis"
import logger from "./logger.config.js";

// const client = redis.createClient({
//     port : 6379 ,
//     host : "127.0.0.1"
// })

const client = redis.createClient({
    url: 'redis://:@cache:6379'
  });

  // connect to redis
client.on('connect' , ()=>{
    logger.info("Connected to Redis");
})

client.on('error' , (err)=>{
    console.log("Redis Error" , err.message);
})

client.on('end' , ()=>{
    console.log("Client disconnected from redis");
})


export default client