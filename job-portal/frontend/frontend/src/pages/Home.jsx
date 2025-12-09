import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      navigate("/register");
    } else if (user.role === "student") {
      navigate("/student/upload");
    } else {
      navigate("/recruiter/inbox");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        color: "white",
      }}
    >
      {/* ✅ NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          position: "sticky",
          top: 0,
          background: "#020617",
          zIndex: 50,
        }}
      >
        <h2
          style={{ color: "#22d3ee", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          ⚡ SmartReach
        </h2>

        {!user && (
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        )}
      </nav>

      {/* ✅ HERO SECTION */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            border: "1px solid #22d3ee",
            padding: "6px 14px",
            borderRadius: "999px",
            color: "#22d3ee",
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          ✨ AI-Powered Cold Outreach
        </div>

        <h1 style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
          Land Your Dream Job <br />
          <span style={{ color: "#22d3ee" }}>10x Faster</span>
        </h1>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "600px",
            opacity: 0.75,
          }}
        >
          Unlock recruiter connections instantly. Generate polished AI emails
          tailored to your resume and send them directly to hiring managers.
        </p>

        <div style={{ marginTop: "35px", display: "flex", gap: "20px" }}>
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started Free →
          </button>
        </div>

        {/* ✅ STATS */}
        <div
          style={{
            marginTop: "70px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <StatCard number="500+" label="Companies Database" />
          <StatCard number="10,000+" label="HR Contacts" />
          <StatCard number="95%" label="Email Accuracy" />
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section
        style={{
          padding: "100px 60px",
          background: "#020617",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "60px",
          }}
        >
          Powerful Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
          }}
        >
          <FeatureCard
            title="Company Database"
            desc="Access a growing database of top recruiting companies with verified HR contacts."
          />
          <FeatureCard
            title="AI Email Generation"
            desc="Generate personalized cold emails tailored to your resume in seconds."
          />
          <FeatureCard
            title="Direct Outreach"
            desc="Send emails directly to recruiters and hiring managers with one click."
          />
          <FeatureCard
            title="Smart Matching"
            desc="AI matches your skills with companies actively hiring for your profile."
          />
          <FeatureCard
            title="Instant Results"
            desc="Find relevant contacts and send emails in minutes, not days."
          />
          <FeatureCard
            title="95% Accuracy"
            desc="Our email verification ensures high deliverability & spam protection."
          />
        </div>
      </section>

      {/* ✅ ABOUT US SECTION */}
      <section
        style={{
          padding: "100px 60px",
          background: "#020617",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "50px" }}>
          About Us
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          <TeamCard
            name="P Pallavi"
            linkedIn="https://www.linkedin.com/in/pathikonda-pallavi-692a28298/"
            email="pathikondapallavi9108@gmail.com"
            contact="91+ 9123456789"
          />

          <TeamCard
            name="Hemanth"
            email="gmail"
            contact="contact"
          />

          <TeamCard
            name="Sreenija"
            email="gmail"
            contact="contact"
          />

          <TeamCard
            name="Abhishek"
            email="gmail"
            contact="contact"
          />
        </div>
      </section>
    </div>
  );
}

/* ✅ STAT CARD */
function StatCard({ number, label }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "25px",
        borderRadius: "14px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#22d3ee" }}>{number}</h2>
      <p style={{ marginTop: "8px", opacity: 0.8 }}>{label}</p>
    </div>
  );
}

/* ✅ FEATURE CARD */
function FeatureCard({ title, desc }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "26px",
        borderRadius: "16px",
      }}
    >
      <h3 style={{ color: "#22d3ee", marginBottom: "10px" }}>{title}</h3>
      <p style={{ opacity: 0.8, fontSize: "0.95rem", lineHeight: 1.5 }}>
        {desc}
      </p>
    </div>
  );
}

/* ✅ TEAM CARD */
function TeamCard({ name, linkedIn, email, contact }) {
  return (
    <div
      style={{
        background: "rgba(15, 23, 42, 0.9)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "24px",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#22d3ee", marginBottom: "12px" }}>{name}</h3>

      {linkedIn && (
        <p>
          🔗{" "}
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00f0ff" }}
          >
            LinkedIn
          </a>
        </p>
      )}

      {email && <p>📧 {email}</p>}
      {contact && <p>📞 {contact}</p>}
    </div>
  );
}
