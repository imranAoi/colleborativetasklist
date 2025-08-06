import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import AuthRouter from './routes/authRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config();
dbConnection();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000", // local dev frontend
  "https://frontendof-ctl.vercel.app", // production frontend
  "https://frontendof-roforlnb1-mohd-imrans-projects-1e701637.vercel.app",
  "https://frontendof-fum1ufyvi-mohd-imrans-projects-1e701637.vercel.app"
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));


// ✅ Basic security headers
app.use(helmet({
  contentSecurityPolicy: false // disable CSP for now to avoid breaking frontend
}));

// ✅ Parse cookies and JSON
app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use('/api', AuthRouter);

app.get('/', (req, res) => {
  res.send("Server is running");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
