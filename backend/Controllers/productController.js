const ProductModel = require("../Models/Product");

// GET /products
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /products/add
const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "";

    const newProduct = new ProductModel({ name, category, price, stock, image });
    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /products/delete/:id
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const updatedFields = { name, category, price, stock };

    if (req.file) {
      updatedFields.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }

    await ProductModel.findByIdAndUpdate(req.params.id, updatedFields);
    res.json({ success: true, message: "Product updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
};
