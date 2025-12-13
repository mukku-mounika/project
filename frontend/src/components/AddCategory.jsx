import { useState } from "react";
import axios from "axios";
export default function AddCategory({ refresh }) {
  const [name, setName] = useState("");
  const addCategory = async () => {
    if (!name.trim()) return alert("Enter category name");
    try {
      await axios.post(
        "http://localhost:5000/api/categories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName("");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Category not saved. Please check backend.");
    }
  };
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />
      <button onClick={addCategory}>Create</button>
    </div>
  );
}
