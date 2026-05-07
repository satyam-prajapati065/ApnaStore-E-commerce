import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";

function About() {
  return (
    <div className="contact-container">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>
      <div className="contact-main-container">
        <p>Hii i'm about</p>
      </div>
    </div>
  );
}

export default About;
