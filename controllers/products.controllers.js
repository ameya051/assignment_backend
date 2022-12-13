const mongoose = require("mongoose");
const createError = require("http-errors");
const Product = require("../models/products.model");

//add a product
const addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
};

//get all products
const getAllProduct = async (req, res, next) => {
  try {
    const results = await Product.find();
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

//get featured products
const getFeatured = async (req, res) => {
  try {
    const results = await Product.find({ featured: true });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

//Fetch products with price less than a certain value
const getByPrice = async (req, res) => {
  try {
    const results = await Product.find({ price: { $lt: req.params.price } });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

//Fetch products with rating higher than a certain value
const getByRating = async (req, res) => {
  try {
    const results = await Product.find({ rating: { $gt: req.params.rating } });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

//update a product
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, "Product does not exist");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Product Id"));
    }
    next(error);
  }
};

//delete a product
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, "Product does not exist.");
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, "Invalid Product id"));
      return;
    }
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getFeatured,
  getByPrice,
  getByRating,
  updateProduct,
  deleteProduct,
};
