import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

function RequireAuth({ children, pageName }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-container" style={styles.container}>
        <div className="not-logged-in-card" style={styles.card}>
          <div className="lock-icon-box" style={styles.iconBox}>
            <Lock size={40} color="var(--secondary2, #db4444)" />
          </div>
          <h2 style={styles.heading}>Please Login</h2>
          <p style={styles.text}>
            Please login to view and manage your items in the{" "}
            {pageName || "page"}.
          </p>
          <button
            onClick={() => navigate("/login")}
            style={styles.button}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    width: "100%",
    padding: "2rem 0",
  },
  card: {
    textAlign: "center",
    padding: "3rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
    maxWidth: "400px",
    width: "100%",
    border: "1px solid #f0f0f0",
  },
  iconBox: {
    backgroundColor: "#fff0f0",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 1.5rem auto",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  text: {
    color: "#666",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    lineHeight: "1.5",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    backgroundColor: "#db4444",
    color: "#fff",
  },
};

export default RequireAuth;
