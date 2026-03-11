import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { fileCheck, updateFileCheck } from '../middleware/fileCheck.js';
import mongoose from 'mongoose';
import { adminCheck, userCheck } from '../middleware/userCheck.js';



const router = express.Router();


router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid product id" });
  req.productId = id;
  next();
});

router.route('/').get(getProducts).post(userCheck, adminCheck, fileCheck, createProduct).all(notAllowed);

router.route('/:id').get(getProduct).patch(userCheck, adminCheck, updateFileCheck, updateProduct).delete(userCheck, adminCheck, deleteProduct);


export default router;