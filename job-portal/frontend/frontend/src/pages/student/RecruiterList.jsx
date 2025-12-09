import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function RecruiterList() {
  const [recruiters, setRecruiters] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/student/recruiters").then((res) => setRecruiters(res.data));
  }, []);

  const apply = async (id) => {
    await api.post("/student/apply", {
      studentId: user._id,
      recruiterId: id,
    });

    alert("✅ Applied & Email Sent!");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      {recruiters.map((r) => (
        <div className="card" key={r._id} style={{ marginBottom: "15px" }}>
          <h3>{r.company}</h3>
          <p>{r.role}</p>
          <button onClick={() => apply(r.user)} className="btn-primary">
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}
