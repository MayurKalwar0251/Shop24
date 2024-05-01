import { userModel } from "../models/userModel.js";
import { comparePassword, hashedPassword } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { name, email, password, phoneNO, address, sport } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    return res.status(200).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashPassword = await hashedPassword(password);

  user = await userModel.create({
    name,
    email,
    password: hashPassword,
    phoneNO,
    address,
    sport,
  });

  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    success: true,
    message: "registered Successfully",
    token,
    user,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid email or password" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(200)
      .json({ success: false, message: "User is not registered" });
  }

  const match = await comparePassword(password, user.password);
  if (!match) {
    return res
      .status(200)
      .json({ success: false, message: "Invalid email or password" });
  }

  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    success: true,
    message: "Logged in ",
    user,
    token,
  });
};

export const forgotPassword = async (req, res) => {
  const { email, sport, newPassword, confirmPassword } = req.body;

  const user = await userModel.findOne({ email, sport });
  if (!user) {
    return res.status(200).json({
      success: false,
      message: "Invalid email or sports",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(200).json({
      success: false,
      message: "Password didn't match",
    });
  }

  const hashed = await hashedPassword(newPassword);

  await userModel.findByIdAndUpdate(user._id, { password: hashed });

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};

export const getAllUsersAdmin = async (req, res) => {
  let users = await userModel.find({});
  res.status(200).json({
    success: true,
    users,
  });
};

export const updateUserRole = async (req, res) => {
  const uid = req.query.uid;
  let user = await userModel.findByIdAndUpdate(uid, { role: 1 });
  res.status(200).json({
    success: true,
  });
};
