import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryCards from "../components/SummaryCards";
import CategoryList from "../components/CategoryList";
import ExpenseList from "../components/ExpenseList";
import AddCategory from "../components/AddCategory";
import AddExpense from "../components/AddExpense";
import ExpensePieChart from "../components/PieChart";
import ExpenseBarChart from "../components/BarChart";
export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const API = "http://localhost:5000/api";
  const navigate = useNavigate();
  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [catRes, expRes] = await Promise.all([
        axios.get(`${API}/categories`, config),
        axios.get(`${API}/expenses`, config),
      ]);
      setCategories(catRes.data);
      setExpenses(expRes.data);
    } catch (err) {
      console.error("Load data error:", err);
      navigate("/login");
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container" style={{ position: "relative" }}>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout </button>
      <h1 className="title">Expense App</h1>
      <SummaryCards expenses={expenses} />
      <div className="two-column">
        <div className="left">
          <h2>Listing Categories - {categories.length}</h2>
          <CategoryList categories={categories} refresh={loadData} />
          <h2 style={{ marginTop: 30 }}>Listing Expenses - {expenses.length}</h2>
          <ExpenseList expenses={expenses} refresh={loadData} />
        </div>
        <div className="right">
          <h2>Add Category</h2>
          <AddCategory refresh={loadData} />
          <h2 style={{ marginTop: 30 }}>Add Expense</h2>
          <AddExpense categories={categories} refresh={loadData} />
        </div>
      </div>
      <div className="charts-row">
        <div className="chart-card">
          <h3>Expense Distribution</h3>
          <ExpensePieChart expenses={expenses} />
        </div>
        <div className="chart-card">
          <h3>Expense By Month</h3>
          <ExpenseBarChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
