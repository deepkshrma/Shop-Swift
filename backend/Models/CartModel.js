const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,  // ← FIXED
    ref: "Product",// ← so you can populate later
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [CartItemSchema]
});

module.exports = mongoose.model("Cart", CartSchema);
