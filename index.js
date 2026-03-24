import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter);
//app.use(mongoSanitize());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
dotenv.config({});
app.use(cors({
  origin: ['http://localhost:5173', 'https://mern-kartik-rho.vercel.app']
}));
app.use(express.json());
app.use(express.static('uploads'));
app.use(morgan('dev'));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));



mongoose.connect(process.env.DB_URL).then((val) => {
  app.listen(5000, () => {
    console.log("Database connect and Server is running on port 5000");
  })
}).catch((err) => {
  console.log(err);
});


app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Hello world"
  });

});



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);




