const jwt = require("jsonwebtoken");

const addressAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized: Token missing or invalid" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.existingUser = decoded;
    next();
  } catch (err) {
    console.error("❌ addressAuth error:", err.message);
    return res.status(403).json({ message: "Unauthorized: Token invalid or expired" });
  }
};

module.exports = addressAuth;
