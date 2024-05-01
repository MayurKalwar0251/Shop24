import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeData;

    next();
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Login first",
    });
  }
};
export const adminRoles = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Login first",
      });
    }

    if (user.role != 1) {
      return res.status(404).send({
        success: false,
        message: "Only admin can access this route",
      });
    }

    next();
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Login first",
    });
  }
};
