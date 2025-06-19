const mongoose = require('mongoose');
const Cart = require("../Models/CartModel");

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.existingUser.id });
  res.json({ success: true, cart: cart?.items || [] });
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity, image } = req.body;

    // ✅ Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    let cart = await Cart.findOne({ userId: req.existingUser.id });

    if (!cart) {
      cart = new Cart({ userId: req.existingUser.id, items: [] });
    }

    // ✅ Ensure ObjectId comparison (toString() comparison)
    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({
        productId: new mongoose.Types.ObjectId(productId),
        name,
        price,
        quantity,
        image,
      });
    }

    await cart.save();

    res.json({ success: true, message: "Item added to cart." });
  } catch (error) {
    console.error("error while creating cart", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.existingUser.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = quantity;

    await cart.save();

    return res.status(200).json({ success: true, message: "Cart item updated" });
  } catch (error) {
    console.error("❌ Error updating cart item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.existingUser.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const originalCount = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.id
    );

    if (cart.items.length === originalCount) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    await cart.save();

    return res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.checkoutCart = async (req, res) => {
  await Cart.deleteOne({ userId: req.existingUser.id });
  res.json({ success: true, message: "Order placed successfully!" });
};
