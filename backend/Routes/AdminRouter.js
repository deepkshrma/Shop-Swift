const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controllers/AdminController");
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/stats", ensureAuthenticated, getDashboardStats);

module.exports = router;
