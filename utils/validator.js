import validate from 'express-joi-validation';
import Joi from 'joi';


export const validators = validate.createValidator({});



export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character')

    .required()
});


export const registerSchema = Joi.object({
  fullname: Joi.string().min(5).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
})