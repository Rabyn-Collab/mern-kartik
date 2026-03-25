import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { fileCheck, updateFileCheck } from '../middleware/fileCheck.js';
import { userCheck } from '../middleware/userCheck.js';
import { loginSchema, registerSchema, validators } from '../utils/validator.js';






const router = express.Router();



router.route('/profile').get(userCheck, getUser)
  .patch(userCheck, updateFileCheck, updateUser)
  .all(notAllowed);

router.route('/login').post(validators.body(loginSchema), loginUser).all(notAllowed);
router.route('/register').post(validators.body(registerSchema), fileCheck, registerUser).all(notAllowed);


export default router;