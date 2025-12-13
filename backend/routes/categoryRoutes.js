const express = require("express");
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/categoryController");
const router = express.Router();
router.get("/", auth, controller.getCategories);
router.post("/", auth, controller.createCategory);
router.put("/:id", auth, controller.updateCategory);
router.delete("/:id", auth, controller.deleteCategory);
module.exports = router;
