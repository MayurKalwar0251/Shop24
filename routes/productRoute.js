import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  updateProductImage,
  getProductByPage,
  totalProductCount,
  filteredProducts,
  searchedProducts,
} from "../controllers/productController.js";
import { adminRoles, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crud operation for product

// create product
router.route("/create-product").post(requireSignIn, adminRoles, createProduct);

// getAllProducts
router.route("/get-products").get(getAllProducts);

// get single product
router.route("/product/:pid").get(getSingleProduct);

router
  .route("/product/:pid")
  .put(requireSignIn, adminRoles, updateProduct)
  .delete(requireSignIn, adminRoles, deleteProduct);

// update product image
router.route("/image/:pid").put(requireSignIn, adminRoles, updateProductImage);

// total Product count
router.route("/total").get(totalProductCount);

// pagination
router.route("/all-products").get(getProductByPage);

// filter products
router.route("/filter-product").post(filteredProducts);

// searched-products
router.route("/search/:keyword").get(searchedProducts);

export default router;
