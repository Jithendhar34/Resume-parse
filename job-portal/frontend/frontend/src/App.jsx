import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import UploadResume from "./pages/student/UploadResume";
import RecruiterList from "./pages/student/RecruiterList";
import Inbox from "./pages/recruiter/Inbox";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useAuth(); // ✅ Get logged-in user

  return (
    <>
      {/* ✅ SHOW NAVBAR ONLY AFTER LOGIN */}
      {user && <Navbar />}

      <Routes>
        {/* ✅ PUBLIC ROUTES (VISIBLE ALWAYS) */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ STUDENT PROTECTED ROUTES */}
        <Route
          path="/student/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/recruiters"
          element={
            <ProtectedRoute>
              <RecruiterList />
            </ProtectedRoute>
          }
        />

        {/* ✅ RECRUITER PROTECTED ROUTE */}
        <Route
          path="/recruiter/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
