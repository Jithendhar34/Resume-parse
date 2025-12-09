import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      alert(res.data.message || "✅ Registration successful");
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-card">
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

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

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}
