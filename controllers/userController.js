import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';



export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message
    });
  }
}



export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  try {

    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(404).json({ message: "User not found" });

    const passCheck = bcrypt.compareSync(password, isExist.password);
    if (!passCheck) return res.status(401).json({ message: "Invalid Credential" });


    const token = jwt.sign({
      id: isExist._id,
      role: isExist.role
    }, 'secret');



    return res.status(200).json({
      role: isExist.role,
      token
    });


  } catch (err) {

    return res.status(400).json({
      message: err.message
    });

  }

}


export const registerUser = async (req, res) => {
  const { email, fullname, password } = req.body || {};
  try {

    const isExist = await User.findOne({ email });
    if (isExist) {
      fs.unlink(`./uploads/${req.imagePath}`, (imageErr) => {
        if (imageErr) {
          return res.status(500).json({
            message: err.message
          });
        } else {
          return res.status(409).json({ message: "User already exists" });
        }
      });
    }
    const hashPass = bcrypt.hashSync(password, 10);
    await User.create({
      fullname,
      email,
      password: hashPass,
      image: req.imagePath
    });
    return res.status(201).json({ message: "User created" });
  } catch (err) {

    fs.unlink(`./uploads/${req.imagePath}`, (imageErr) => {
      if (imageErr) {
        return res.status(500).json({
          message: err.message
        });
      } else {
        return res.status(400).json({ message: err.message });
      }
    });



  }
}