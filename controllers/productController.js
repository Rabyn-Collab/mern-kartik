


export const getProducts = (req, res) => {
  return res.status(200).json({
    message: "All products"
  });
}


export const getProduct = (req, res) => {
  return res.status(200).json({
    message: "Single product"
  });
}


export const createProduct = (req, res) => {
  return res.status(201).json({
    message: "Product created"
  });
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