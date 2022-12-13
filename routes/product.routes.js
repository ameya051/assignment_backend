const router = require("express").Router();
const {
  addProduct,
  getAllProduct,
  getFeatured,
  getByPrice,
  getByRating,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controllers");

router.get("/", getAllProduct);
router.get("/featured", getFeatured);
router.get("/price/:price", getByPrice);
router.get("/rating/:rating", getByRating);
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
