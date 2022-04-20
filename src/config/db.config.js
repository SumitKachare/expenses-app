import mongoose from "mongoose";

const connectDB = async () => {

  return new Promise((resolve  , reject)=>{
    mongoose.connect(process.env.MONGO_URI)
    .then((data)=>{
      resolve(data)
    })
    .catch((err)=>{
      reject(err)
    })
  })

};



export default connectDB;