import Product from "../models/Product.js";



export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({});
    return res.status(200).json(products);


  } catch (err) {
    return res.status(500).json({
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

  try {

    await Product.create({});
    return res.status(201).json({
      message: "Product created"
    });


  } catch (err) {
    return res.status(400).json({
      message: err.message
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