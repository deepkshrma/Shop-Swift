const Address = require("../Models/Address");

// 👉 Add address
const addAddress = async (req, res) => {
  try {
    // console.log("➡️ Request body:", req.body);
    // console.log("👤 Authenticated user:", req.existingUser);
    const { fullName, phone, line1, line2, city, state, pincode, country } = req.body;

    if (!line1 || !city || !state || !pincode || !country || !phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newAddress = new Address({
      user: req.existingUser._id,
      fullName,
      phone,
      line1,
      line2,
      city,
      state,
      pincode,
      country,
    });

    await newAddress.save();
    res.status(200).json({ success: true, address: newAddress });
  } catch (err) {
    console.error("🚨 Error saving address:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 👉 Get addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.existingUser._id });
    res.status(200).json({ success: true, addresses });
  } catch (err) {
    console.error("❌ Error fetching addresses:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch addresses" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if address exists and belongs to user (optional but recommended)
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    // Optionally, check if the logged-in user owns this address
    if (address.user.toString() !== req.existingUser._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Address.findByIdAndDelete(id);

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  deleteAddress,
};
