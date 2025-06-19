const ProductModel = require("../Models/Product");
const UserModel = require("../Models/User");


const getDashboardStats = async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments();
    const userCount = await UserModel.countDocuments();


    res.json({
      success: true,
      products: productCount,
      users: userCount,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getDashboardStats };
