import { useState } from "react";
import axios from "axios";
const API = "http://localhost:5000/api/auth";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };
  const validatePassword = (password) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };
  const handleRegister = async () => {
    if (!name.trim()) return alert("Name is required");
    if (!validateEmail(email)) return alert("Invalid email address");
    if (!validatePassword(password))
      return alert("Password must contain at least one special character");
    try {
      const res = await axios.post(`${API}/register`, {
        person_name: name,
        person_email: email,
        person_password: password,
      });
      alert("Registration Successful! Please Login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div style={{ width: 300, margin: "auto", marginTop: 80 }}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }} />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }} />
      <button onClick={handleRegister} style={{ width: "100%" }}>
        Register
      </button>
      <p style={{ marginTop: 10 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
