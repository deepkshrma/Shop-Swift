const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkoutCart,
} = require("../Controllers/CartController");

const cartAuth = require("../Middlewares/cartAuth");


router.get("/", cartAuth, getCart);
router.post("/add", cartAuth, addToCart);
router.put("/update/:id", cartAuth, updateCartItem);
router.delete("/remove/:id", cartAuth, removeFromCart);
router.post("/checkout", cartAuth, checkoutCart);

module.exports = router;
