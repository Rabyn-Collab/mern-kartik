import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { loginUser, registerUser } from '../controllers/userController.js';






const router = express.Router();




router.route('/login').post(loginUser).all(notAllowed);

router.route('/register').post(registerUser).all(notAllowed);


export default router;