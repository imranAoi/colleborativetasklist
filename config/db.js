import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const  dbConnection=async()=>{
  try{
    const connection=await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Mongodb is successfully connected')
})
  }catch(error){
    console.log("mongo is not connected")
  }  
}
 
export default dbConnection