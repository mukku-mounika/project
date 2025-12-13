const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Person = require("../models/personModel");
exports.register = async (req, res) => {
  try {
    const { person_name, person_email, person_password } = req.body;
    if (!person_name || !person_email || !person_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Person.findByEmail(person_email);
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(person_password, 10);
    const newUser = await Person.create({
      person_name,
      person_email,
      person_password: hashedPassword,
    });
    res.status(201).json({
      message: "Registration successful",
      user: newUser,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { person_email, person_password } = req.body;
    const user = await Person.findByEmail(person_email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(person_password, user.person_password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    const token = jwt.sign(
      { id: user.person_id, email: user.person_email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
