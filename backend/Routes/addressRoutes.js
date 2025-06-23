const express = require("express");
const router = express.Router();
const { addAddress, getAddresses, deleteAddress } = require("../Controllers/AddressController");
const addressAuth = require("../Middlewares/addressAuth");

// POST /address - Add address
router.post("/", addressAuth, addAddress);

// GET /address - Get all addresses for user
router.get("/", addressAuth, getAddresses);

router.delete("/:id", addressAuth, deleteAddress);


module.exports = router;

