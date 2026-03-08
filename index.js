import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';


dotenv.config({});
app.use(cors());
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




