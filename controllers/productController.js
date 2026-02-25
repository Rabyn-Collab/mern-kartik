import Product from "../models/Product.js";
import fs from 'fs';


export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({});
    return res.status(200).json(products);


  } catch (err) {
    return res.status(400).json({
      message: err.message
    })
  }
}


export const getProduct = (req, res) => {
  return res.status(200).json({
    message: "Single product"
  });
}


export const createProduct = async (req, res) => {

  const { title, description, price, category, brand, stock } = req.body || {};

  try {

    await Product.create({
      title,
      description,
      price,
      category,
      brand,
      stock,
      image: req.imagePath,
    });
    return res.status(201).json({
      message: "Product created"
    });


  } catch (err) {

    fs.unlink(`./uploads/${req.imagePath}`, (imageErr) => {
      if (imageErr) {
        return res.status(500).json({
          message: imageErr.message
        })
      }

      return res.status(400).json({
        message: err.message
      })
    })

  }

}

export const updateProduct = (req, res) => {
  return res.status(200).json({
    message: "Product updated"
  });
}

export const deleteProduct = (req, res) => {
  return res.status(200).json({
    message: "Product deleted"
  });
}