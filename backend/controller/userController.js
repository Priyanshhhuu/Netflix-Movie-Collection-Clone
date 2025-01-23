import User from "../model/user.model.js";
import asyncHandler from "../Utils/AsyncHandler.js";
import { generateTokenAndSetCookie } from "../Utils/generateToken.js";

export const signUp = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate inputs
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    // Check if user already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    // Create new user
    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];
    const newUser = new User({
      username,
      email,
      password,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Signup", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export const Login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate inputs
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Login", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export const Logout = asyncHandler((req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("jwt-netflix");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

export const authCheck = asyncHandler((req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: req.user,
    });
  } catch (error) {
    console.log("Error in AuthCheck", error);
    return res.status(500).json({ message: "Server Error" });
  }
});
