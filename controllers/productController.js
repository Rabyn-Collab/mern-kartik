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


export const getProduct = async (req, res) => {


  try {
    const product = await Product.findById(req.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (err) {

    return res.status(400).json({
      message: err.message
    })
  }

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

export const updateProduct = async (req, res) => {
  const { title, description, price, category, brand, stock } = req.body || {};

  try {

    const isExist = await Product.findById(req.productId);
    if (!isExist) return res.status(404).json({ message: "Product not found" });

    isExist.title = title || isExist.title;
    isExist.description = description || isExist.description;
    isExist.price = price || isExist.price;
    isExist.category = category || isExist.category;
    isExist.brand = brand || isExist.brand;
    isExist.stock = stock || isExist.stock;


    if (req.imagePath) {

      fs.unlink(`./uploads/${isExist.image}`, async (err) => {
        if (err) return res.status(500).json({
          message: err.message
        })
        isExist.image = req.imagePath;
        await isExist.save();
        return res.status(200).json({
          message: "Product updated"
        });

      });

    } else {

      await isExist.save();
      return res.status(200).json({
        message: "Product updated"
      });

    }



  } catch (err) {
    if (req.imagePath) {
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
    } else {
      return res.status(400).json({
        message: err.message
      })
    }
  }
}






export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    fs.unlink(`./uploads/${product.image}`, async (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        })
      }
      await product.deleteOne();
      return res.status(200).json({
        message: "Product deleted"
      });
    })


  } catch (err) {

    return res.status(400).json({
      message: err.message
    })
  }
}