import { useState } from "react";
import axios from "axios";
export default function CategoryList({ categories = [], refresh }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refresh();
    } catch (err) {
      console.error("Delete failed:", err.response || err);
      alert("Failed to delete category");
    }
  };
  const startEdit = (cat) => {
    console.log("Editing category:", cat);
    setEditId(cat.categories_id);
    setEditName(cat.name);
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };
  const saveEdit = async (id) => {
    if (!editName.trim()) return alert("Category name cannot be empty");
    console.log("Saving category:", id, editName);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        { name: editName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Update response:", res.data);
      setEditId(null);
      setEditName("");
      refresh();
    } catch (err) {
      console.error("Update failed:", err.response || err);
      alert("Update failed");
    }
  };
  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.categories_id}>
            <td>
              {editId === c.categories_id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                c.name
              )}
            </td>
            <td className="actions-cell">
              {editId === c.categories_id ? (
                <>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => saveEdit(c.categories_id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => startEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => del(c.categories_id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
