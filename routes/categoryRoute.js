import express from "express";
import {
  allCategory,
  createCategory,
  deletedCategory,
  singleCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminRoles, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CRUD operations

// create Category
router.route("/add").post(requireSignIn, adminRoles, createCategory);

// all category
router.route("/all-category").get(allCategory);

// single category
router.route("/single-category/:slug").get(singleCategory);

// update category
router
  .route("/update-category/:id")
  .put(requireSignIn, adminRoles, updateCategory);

// delete category
router
  .route("/delete-category/:id")
  .delete(requireSignIn, adminRoles, deletedCategory);

export default router;
