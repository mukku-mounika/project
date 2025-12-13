const Expense = require("../models/expenseModel");
exports.getExpenses = async (req, res) => {
  try {
    const result = await Expense.getAll(req.person.id);
    res.json(
      result.rows.map(e => ({
        ...e,
        category: e.category_name
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createExpense = async (req, res) => {
  try {
    const payload = { ...req.body, person_id: req.person.id };
    const result = await Expense.create(payload);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateExpense = async (req, res) => {
  try {
    const payload = { ...req.body, person_id: req.person.id };
    const result = await Expense.update(req.params.id, payload);
    if (!result.rows[0]) return res.status(404).json({ message: "Expense not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const result = await Expense.delete(req.params.id, req.person.id);
    if (!result.rows[0]) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
