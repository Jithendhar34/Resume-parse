import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      login(res.data); // ✅ saves user + token
      alert(res.data.message || "✅ Login successful");

      // ✅ FIXED ROLE REDIRECT
      navigate(
        res.data.user.role === "student"
          ? "/student/upload"
          : "/recruiter/inbox"
      );
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <h2>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="auth-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}
