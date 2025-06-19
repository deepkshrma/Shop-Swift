const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const errorMessage = 'Auth Failed | email or password is wrong';

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword , role: role || "user"});
        await newUser.save();

        res.status(201).json({
            message: "Signup successfully",
            success: true
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        // console.log("USER FOUND:", existingUser);
        // console.log("Entered password:", password);
        // console.log("Stored hashed password:", existingUser.password);

        if (!existingUser) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, existingUser.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        const jwtToken = jwt.sign(
            { email: existingUser.email, _id: existingUser._id,
                role:existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login success",
            success: true,
            jwtToken,
            email,
            name: existingUser.name,
            role: existingUser.role
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
