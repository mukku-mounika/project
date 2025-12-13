const Category = require("../models/categoryModel");
exports.getCategories = async (req, res) => {
  try {
    const result = await Category.getAll(req.person.id);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createCategory = async (req, res) => {
  try {
    const result = await Category.create(req.body.name, req.person.id);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const result = await Category.update(req.params.id, {name:req.body.name, person_id:req.person.id});
    if (!result.rows[0]) return res.status(404).json({ message: "Category not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const result = await Category.delete(req.params.id, req.person.id);
    if (!result.rows[0]) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

