import { useState } from "react";
import axios from "axios";
export default function ExpenseList({ expenses = [], refresh }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category_id: "",
    amount: "",
    date: "",
  });
  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refresh();
    } catch (err) {
      alert("Failed to delete expense");
    }
  };
  const startEdit = (e) => {
    setEditId(e.expense_id);
    setEditData({
      title: e.title,
      category_id: e.category_id,
      amount: e.amount,
      date: e.date?.split("T")[0] || "",
    });
  };
  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setEditId(null);
      refresh();
    } catch (err) {
      alert("Update failed");
    }
  };
  return (
    <table className="expenses-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category ID</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.expense_id}>
            <td>
              {editId === e.expense_id ? (
                <input
                  value={editData.title}
                  onChange={(ev) =>
                    setEditData((p) => ({ ...p, title: ev.target.value }))
                  }
                />
              ) : (
                e.title
              )}
            </td>
            <td>
              {editId === e.expense_id ? (
                <input
                  value={editData.category_id}
                  onChange={(ev) =>
                    setEditData((p) => ({
                      ...p,
                      category_id: ev.target.value,
                    }))
                  }
                />
              ) : (
                e.category_id
              )}
            </td>
            <td>
              {editId === e.expense_id ? (
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(ev) =>
                    setEditData((p) => ({
                      ...p,
                      amount: ev.target.value,
                    }))
                  }
                />
              ) : (
                e.amount
              )}
            </td>
            <td>
              {editId === e.expense_id ? (
                <input
                  type="date"
                  value={editData.date}
                  onChange={(ev) =>
                    setEditData((p) => ({
                      ...p,
                      date: ev.target.value,
                    }))
                  }
                />
              ) : e.date ? (
                new Date(e.date).toLocaleDateString("en-GB")
              ) : (
                ""
              )}
            </td>

            <td className="actions-cell">
              {editId === e.expense_id ? (
                <button className="btn-save" onClick={() => saveEdit(e.expense_id)}>Save</button>
              ) : (
                <button className="btn-edit" onClick={() => startEdit(e)}>Edit</button>
              )}
              <button className="btn-delete" onClick={() => del(e.expense_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
