import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { fileCheck, updateFileCheck } from '../middleware/fileCheck.js';
import mongoose from 'mongoose';



const router = express.Router();


router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product id" });
  req.productId = id;
  next();
});

router.route('/').get(getProducts).post(fileCheck, createProduct).all(notAllowed);

router.route('/:id').get(getProduct).patch(updateFileCheck, updateProduct).delete(deleteProduct);


export default router;