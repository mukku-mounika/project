const express = require("express");
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/expenseController");
const router = express.Router();
router.get("/", auth, controller.getExpenses);
router.post("/", auth, controller.createExpense);
router.put("/:id", auth, controller.updateExpense);
router.delete("/:id", auth, controller.deleteExpense);
module.exports = router;
