import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import AuthRouter from './routes/authRoute.js'
import cors from 'cors'
dbConnection()
dotenv.config()
const app=express()
const PORT = "8000"
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use('/api',AuthRouter)
app.get('/',(req,res)=>{
    res.send("index")
})
app.get('/about',(req,res)=>{
    res.send(req.url)
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})
//kzzT2VjR0jvzbg6J
//