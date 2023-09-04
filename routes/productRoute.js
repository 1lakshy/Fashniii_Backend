const express = require("express");
const {getAllProducts, createProduct,updateProduct, deleteProduct, getProductDetails, createReview, deleteReview, getAllReviews} = require("../controllers/productController");
const { isAuthenticatedUser,isAutherisedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,createProduct);
router.route("/product/:id").put(isAuthenticatedUser,isAutherisedRoles("admin"),updateProduct).delete(isAuthenticatedUser,isAutherisedRoles("admin"),deleteProduct).get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createReview)
router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser,deleteReview)
module.exports = router;