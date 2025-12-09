import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear auth
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* ✅ LEFT LOGO */}
      <div className="logo">SmartReach</div>

      {/* ✅ RIGHT MENU */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {user?.role === "student" && (
          <Link to="/student/upload">Upload</Link>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}