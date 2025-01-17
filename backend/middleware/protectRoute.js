import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  // Get token
  const token = req.cookies["jwt-netflix"];
  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route because there is no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route because wrong token",
      });
    }
    // Find user by id
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "You are not authorized to access this route because there is no user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
      error,
    });
  }
};
