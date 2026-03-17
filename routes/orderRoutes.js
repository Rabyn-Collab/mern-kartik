import express from 'express';
import { userCheck } from '../middleware/userCheck.js';
import { notAllowed } from '../utils/notAllowed.js';


const router = express.Router();


router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid order id" });
  req.productId = id;
  next();
});

router.route('/').get(userCheck).post(userCheck).all(notAllowed);

router.route('/:id').get().all(notAllowed);


export default router;