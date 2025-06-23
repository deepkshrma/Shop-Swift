const Order = require("../Models/Order");
const Address = require("../Models/Address");




const getUserOrders = async (req, res) => {
  try {
    const user = req.existingUser; // Or req.user if you fixed the naming

    const orders = await Order.find({ user: user._id })
      .populate("address") // Optional: Populate address details
      .sort({ createdAt: -1 }); // Optional: Latest orders first

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const createOrder = async (req, res) => {
  try {
    const user = req.existingUser;
    const { addressId, cartItems, totalAmount } = req.body;

    if (!addressId || !cartItems || !cartItems.length || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required order details",
      });
    }

    // Verify address belongs to user
    const address = await Address.findOne({ _id: addressId, user: user._id });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found for this user",
      });
    }

    // Create the order
    const newOrder = new Order({
      user: user._id,
      address: address._id,
      items: cartItems,
      totalAmount,
      status: "pending",
    });

    await newOrder.save();
    // await Cart.deleteOne({ user: user._id });
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(" Error creating order:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getAllOrders = async (req, res) => {
  try {
    // Step 1: Read pagination parameters
    const page = parseInt(req.query.page) || 1;      // current page number
    const limit = parseInt(req.query.limit) || 10;   // number of items per page
    const skip = (page - 1) * limit;

    // Step 2: Get total count for pagination
    const totalOrders = await Order.countDocuments();

    // Step 3: Fetch paginated orders with population
    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate({ path: "user", model: "users", select: "name email" })
      .populate({ path: "address", model: "Address" })
      .sort({ createdAt: -1 });

    // Step 4: Return data
    res.status(200).json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};


module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
};
