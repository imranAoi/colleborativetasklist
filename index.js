import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import AuthRouter from './routes/authRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
dbConnection();

const app = express();
const PORT = "8000";

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontendof-ctl.vercel.app"
];

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

// ✅ CORS must come FIRST
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api', AuthRouter);

app.get('/', (req, res) => {
  res.send("index");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
