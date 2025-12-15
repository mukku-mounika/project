import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = "http://localhost:5000/api/auth";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return alert("Invalid email address");
    if (!password) return alert("Password is required");
    try {
      const res = await axios.post(`${API}/login`, {
        person_email: email,
        person_password: password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div style={{ width: 300, margin: "auto", marginTop: 80 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }} />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
