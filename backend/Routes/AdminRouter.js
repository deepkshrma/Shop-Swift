const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controllers/AdminController");
const ensureAuthenticated = require("../Middlewares/Auth");
const { getAllOrders} = require("../Controllers/OrderController");
const addressAuth = require("../Middlewares/addressAuth");

router.get("/stats", ensureAuthenticated, getDashboardStats);
router.get("/orders",addressAuth ,getAllOrders);

module.exports = router;
