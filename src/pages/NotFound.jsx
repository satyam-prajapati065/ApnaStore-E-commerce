import React from "react";
import { useNavigate } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>
      <div className="not-found-main-container">
        <div className="not-found-texts">
          <p className="not-found-404">404 Not Found</p>
          <p className="simple-text">Your visited page not found. You may go home page</p>
        </div>
        <button onClick={() => navigate("/")}>Back to home page</button>
      </div>
    </div>
  );
}

export default NotFound;
