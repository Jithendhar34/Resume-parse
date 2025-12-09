import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function UploadResume() {
  const { user } = useAuth(); // user has name, email, etc.

  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Upload & analyze resume (already working)
  const uploadResume = async () => {
    if (!file) return alert("Please upload a resume");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const res = await api.post(
        `/student/upload-resume/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setJobs(res.data.matchedJobs || []);
      setLoading(false);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      setLoading(false);
      alert("Resume Analysis Failed");
    }
  };

  // ✅ Generate email text on frontend (no API, no error)
  const generateEmail = (job) => {
    const mailText = `
Dear Hiring Manager at ${job.company},

I hope you are doing well. I am very interested in applying for the ${job.role} position at your company.

Based on my experience with React, Node.js, MongoDB, JavaScript and full-stack development, I believe I would be a strong fit for this role.

I have worked on real-world projects including job portals, authentication systems, dashboards, and e-commerce applications. I am passionate about building scalable, user-friendly products and continuously improving my skills.

I would greatly appreciate the opportunity to contribute to ${job.company} and discuss how I can add value to your team.

Thank you for your time and consideration.

Best regards,
${user?.name || "Your Name"}
${user?.email || ""}
    `.trim();

    setEmail(mailText);
    setShowModal(true);
  };

  // ✅ Send the generated email TO YOU
  const sendEmail = async () => {
    try {
      await api.post("/email/send-email", {
        // 👇 HERE is who receives the mail
        to: user?.email || "pathikondapallavi9108@gmail.com", // send to yourself
        subject: "Job Application from SmartReach",
        message: email,
      });

      alert("✅ Email sent to your inbox!");
      setShowModal(false);
    } catch (err) {
      console.error("❌ Send Email Error:", err);
      alert("❌ Email sending failed");
    }
  };

  return (
    <div className="upload-page">
      <div className="card upload-card">
        <h2>Upload Your Resume</h2>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="btn-primary" onClick={uploadResume}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* ✅ Matched Jobs */}
      {jobs.length > 0 && (
        <div className="job-results">
          <h3>Matched Jobs</h3>
          <table className="job-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.company}</td>
                  <td>{job.role}</td>
                  <td>{job.status}</td>
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => generateEmail(job)}
                    >
                      Generate Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Email Modal */}
      {showModal && (
        <div className="email-modal-overlay">
          <div className="email-modal">
            <h3>AI Generated Email</h3>

            <textarea rows="12" value={email} readOnly />

            <div className="modal-actions">
              <button
                onClick={() => navigator.clipboard.writeText(email)}
              >
                Copy
              </button>

              <button className="btn-primary" onClick={sendEmail}>
                Send Email to Me
              </button>

              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
