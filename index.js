import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import AuthRouter from './routes/authRoute.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

dbConnection()
dotenv.config()
const app=express()
const PORT = "8000"
app.use(express.json())
const originalUse = app.use.bind(app);
app.use = (...args) => {
  console.log("🚦 Mounting route:", args[0]);
  return originalUse(...args);
};

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontendof-ctl.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const corsOptions = {
  origin: function (origin, callback) {
    console.log("CORS check for origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ all requests



app.use(cookieParser());
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