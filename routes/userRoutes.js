import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { loginUser, registerUser } from '../controllers/userController.js';
import { fileCheck } from '../middleware/fileCheck.js';






const router = express.Router();




router.route('/login').post(loginUser).all(notAllowed);

router.route('/register').post(fileCheck, registerUser).all(notAllowed);


export default router;