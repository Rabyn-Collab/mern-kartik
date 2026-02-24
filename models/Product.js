import mongoose from "mongoose";


export const categories = [
  "Electronics",
  "Clothing",
  "Shoes",
  "Books",
  "Home",
  "Beauty",
  "Sports",
  "Accessories"
];
export const brands = [
  "Apple",
  "Samsung",
  "Nike",
  "Adidas",
  "Sony",
  "Puma",
  "Dell",
  "HP"
];

const productSchema = new mongoose.Schema({

  title: {
    type: String,
    min: [3, "Title must be at least 3 characters long"],
    max: [100, "Title must be at most 100 characters long"],
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    min: [10, "Description must be at least 3 characters long"],
    max: [1000, "Description must be at most 1000 characters long"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: {
      values: categories,
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  brand: {
    type: String,
    enum: {
      values: brands,
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
  },


}, { timestamps: true });



const Product = mongoose.model("Product", productSchema);
export default Product;


