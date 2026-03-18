import express from 'express';
import { userCheck } from '../middleware/userCheck.js';
import { notAllowed } from '../utils/notAllowed.js';
import { createOrder, getOrder, getOrders } from '../controllers/orderController.js';
import mongoose from 'mongoose';


const router = express.Router();


router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid order id" });
  req.productId = id;
  next();
});

router.route('/').get(userCheck, getOrders).post(userCheck, createOrder).all(notAllowed);

router.route('/:id').get(getOrder).all(notAllowed);


export default router;