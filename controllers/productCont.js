const Product = require("../models/productModel");

exports.CreateProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    await newProduct.save();
    res.status(201).send({ success: true, message: "Create new product" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetSingleProduct = async (req, res) => {
  try {
    const SingleProduct = await Product.findById(req.params.id);
    res.status(200).send({ success: true, data: SingleProduct });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(202).send({ success: true, message: "Detele Product" });
  } catch (error) {}
};
exports.UpdateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    res.status(202).send({ success: true, message: "Update Product" });
  } catch (error) {}
};
