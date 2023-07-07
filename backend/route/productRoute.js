import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getSingleProductById,
  productPhoto,
  deleteProduct,
  updateProduct,
  filterProduct,
  countProduct,
  listProduct,
  searchProduct,
  relatedProduct,
  brainTreeToken,
  brainTreePayment,
} from "../controller/productController.js";
import formidable from "express-formidable";

import { requireSignin, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProduct
);

router.patch(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProduct
);

router.get("/get-all-product", getAllProduct);
router.get("/get-single-product/:slug", getSingleProduct);
router.get("/get-single-product-by-id/:_id", getSingleProductById);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", deleteProduct);

// filter product
router.get("/product-filters", filterProduct);

// product count
router.get("/produt-count", countProduct);

// product per page
router.get("/produt-list/:page", listProduct);

// search product
router.get("/search-product/:keywords", searchProduct);

// similar product
router.get("/related-product/:pid/:cid", relatedProduct);

// payment route
router.get("braintree/token", brainTreeToken);

router.post("braintree/payment", requireSignin, brainTreePayment);

export default router;
