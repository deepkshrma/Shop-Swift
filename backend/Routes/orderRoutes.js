const express = require("express");
const router = express.Router();
const addressAuth = require('../Middlewares/addressAuth');
const { createOrder, getUserOrders} = require("../Controllers/OrderController");


router.post("/", addressAuth, createOrder);
router.get("/", addressAuth, getUserOrders);


module.exports = router;
