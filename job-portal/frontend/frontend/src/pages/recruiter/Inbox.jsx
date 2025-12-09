import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Inbox() {
  const [apps, setApps] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/recruiter/inbox/${user._id}`).then((res) => setApps(res.data));
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h2>Applications Inbox</h2>

      {apps.map((a) => (
        <div className="card" key={a._id} style={{ marginBottom: "15px" }}>
          <h4>{a.student.name}</h4>
          <p>{a.student.email}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
