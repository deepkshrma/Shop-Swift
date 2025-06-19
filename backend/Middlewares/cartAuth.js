const jwt = require('jsonwebtoken');

const cartAuth = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Unauthorized: JWT token required' });
  }

  const token = auth.split(' ')[1]; // ✅ Correctly extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("🔐 Decoded JWT payload:", decoded);
    const userId = decoded._id || decoded.id;
    // console.log("🆔 Resolved userId:", userId);
    if (!userId) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token payload' });
    }
    req.existingUser = { id: userId };

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

module.exports = cartAuth;
