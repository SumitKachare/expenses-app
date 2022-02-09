import redis from "redis"
const client = redis.createClient({
    port : 6379 ,
    host : "127.0.0.1"
})

client.connect()

client.on('connect' , ()=>{
    console.log("Connected to Redis");
})


client.on('error' , (err)=>{
    console.log("Redis Error" , err.message);
})

client.on('end' , ()=>{
    console.log("Client disconnected from redis");
})


export default client