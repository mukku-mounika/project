// components/AddExpense.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddExpense({ refresh, categories = [] }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    if (categories.length === 0) setCategory("");
  }, [categories]);
  const addExpense = async () => {
    if (!title || !category || !amount) return alert("Fill required fields");
    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          title,
          category_id: category,
          amount: Number(amount),
          date: date ? new Date(date).toISOString().split("T")[0] : null,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setTitle("");
      setCategory("");
      setAmount("");
      setDate("");
      setNote("");
      refresh();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Expense not saved");
    }
  };

  return (
    <div>
      <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.categories_id} value={c.categories_id}>
            {c.name}
          </option>
        ))}
      </select>
      <input type="number" placeholder="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <textarea placeholder="note" value={note} onChange={(e) => setNote(e.target.value)} />
      <button onClick={addExpense}>Create</button>
    </div>
  );
}
