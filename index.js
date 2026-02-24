import express from 'express';
import productRoutes from './routes/productRoutes.js';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config({});

app.use(express.json());
app.use(morgan('dev'));


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



app.use('/api/products', productRoutes);




