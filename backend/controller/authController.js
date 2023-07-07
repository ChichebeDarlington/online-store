import { comparePassword, hashPassword } from "../helper/bcrypt.js";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const signup = async (req, res) => {
  const { name, email, password, phone, address, secret, role } = req.body;
  if (!name || !email || !password || !phone || !address || !secret) {
    return res.status(400).json({ error: "All is required" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const passwordHash = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: passwordHash,
      phone,
      address,
      role,
      secret,
    });
    await user.save();
    user.password = undefined;
    return res
      .status(201)
      .json({ success: true, msg: "User registration successful", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Fill in the form" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, msg: "No user found" });
  }
  const match = await comparePassword(password, user.password);
  if (!match) {
    return res.status(400).json({ success: false, msg: "Wrong password" });
  }
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user.password = undefined;

  return res
    .status(200)
    .json({ success: true, msg: "Sign success", user, token });
};

export const test = async (req, res) => {
  return res.status(200).json({ msg: "What a life" });
};

export const forgotPassword = async (req, res) => {
  const { secret, email, newPassword } = req.body;
  if (!email || !secret || !newPassword) {
    return res.status(400).json({ msg: "All field is required" });
  }
  try {
    const user = await User.findOne({ email, secret });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    const passwordReset = await User.findByIdAndUpdate(
      user._id,
      { password: hashed },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      msg: "password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      msg: "Reset error",
    });
  }
};
