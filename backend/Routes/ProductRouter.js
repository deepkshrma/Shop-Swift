const express = require('express')
const router = express.Router();
const { getProducts, addProduct, deleteProduct, updateProduct } = require("../Controllers/productController");
const ensureAuthenticated = require('../Middlewares/Auth');
const upload = require("../Middlewares/Upload");

router.get("/", ensureAuthenticated, getProducts);
router.post("/add", ensureAuthenticated, upload.single("image"), addProduct);
router.delete("/delete/:id", ensureAuthenticated, deleteProduct);
router.put("/update/:id", ensureAuthenticated, upload.single("image"), updateProduct);




module.exports = router;