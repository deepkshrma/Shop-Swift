const UserModel = require("../Models/User");
const getAllUsers = async (req,res) => {
    try {
        const users = await UserModel.find({}, "name email");
        res.status(200).json({ success: true, users});
    } catch(error) {
        console.error("Error Fetching users:",error);
        res.status(500).json({success: false,message: "server error"});
    }
}

module.exports = {
    getAllUsers
};