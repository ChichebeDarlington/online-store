import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const requireSignin = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.role) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error in admin middleware" });
  }
};
