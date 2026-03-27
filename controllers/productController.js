import Product, { brands, categories } from "../models/Product.js";
import fs from 'fs';

function convertQuery(queryObj) {
  const mongoQuery = {};

  for (const key in queryObj) {
    const match = key.match(/(\w+)\[(\w+)\]/);

    if (match) {
      const field = match[1];      // rating
      const operator = match[2];   // gt

      if (!mongoQuery[field]) mongoQuery[field] = {};

      mongoQuery[field][`$${operator}`] = Number(queryObj[key]);
    } else {
      mongoQuery[key] = queryObj[key];
    }
  }

  return mongoQuery;
}

export const getProducts = async (req, res) => {
  try {

    const excludedFields = ['search', 'sort', 'fields', 'page', 'limit'];

    const queryObj = { ...req.query };
    excludedFields.forEach(el => delete queryObj[el]);

    // console.log(queryObj);
    // { 'price[lt]': '3000' } {price: { $lt: 3000 }}

    const mongoQuery = convertQuery(queryObj);
    const query = Product.find(mongoQuery);

    ///

    if (req.query.search) {
      const search = req.query.search;

      if (categories.some((n) => n.toLowerCase().includes(search.toLowerCase()))) {

        query.find({ category: { $regex: search, $options: "i" } });

      } else if (brands.some((n) => n.toLowerCase().includes(search.toLowerCase()))) {
        query.find({ brand: { $regex: search, $options: "i" } });
      } else {
        query.find({ title: { $regex: search, $options: "i" } });
      }


    }


    if (req.query.sort) {

      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    }


    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const totalCount = await Product.countDocuments();
    const numOfPages = Math.ceil(totalCount / limit);




    const products = await query.skip(skip).limit(limit);
    return res.status(200).json({
      numOfPages,
      products
    });


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