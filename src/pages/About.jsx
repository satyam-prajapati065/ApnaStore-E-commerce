import React from "react";
import "./About.css";
import Breadcrumbs from "../components/Breadcrumbs";
import Support from "../components/Support";
const About = () => {
  const stats = [
    {
      id: 1,
      icon: "🏪",
      count: "10.5k",
      desc: "Sellers active our site",
      active: false,
    },
    {
      id: 2,
      icon: "💰",
      count: "33k",
      desc: "Monthly Product Sale",
      active: true,
    },
    {
      id: 3,
      icon: "🛍️",
      count: "45.5k",
      desc: "Customer active in our site",
      active: false,
    },
    {
      id: 4,
      icon: "💰",
      count: "25k",
      desc: "Anual gross sale in our site",
      active: false,
    },
  ];

  const team = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      img: "https://img.magnific.com/premium-photo/friendly-smiling-businessman-looking-camera-with-reliability-isolated-white-background_256588-952.jpg",
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      img: "https://static.wixstatic.com/media/95462a_d72b968eaa4e4644b856abbf17cd64d4~mv2.png/v1/fill/w_560,h_784,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/woman4.png",
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      img: "https://img.freepik.com/premium-psd/man-jacket-tie-transparent-background_1244891-19613.jpg",
    },
  ];

  return (
    <div className="about-page-container">
      <div className="about-page">
        <nav className="breadcrumb">
          <Breadcrumbs />
        </nav>

        <section className="story-section">
          <div className="story-text">
            <h1>Our Story</h1>
            <p>
              Launced in 2025, Exclusive is South Asia's premier online shopping
              marketplace with an active presence in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3 millions
              customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assortment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="story-image">
            <img
              src="https://i.pinimg.com/736x/4c/cc/00/4ccc00da210d65f2477ac5b9c4bbc057.jpg"
              alt="Our Story"
            />
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`stat-card ${stat.active ? "active" : ""}`}
            >
              <div className="icon-circle">{stat.icon}</div>
              <h2>{stat.count}</h2>
              <p>{stat.desc}</p>
            </div>
          ))}
        </section>

        <section className="team-section">
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-img">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <div className="social-icons">
                    <span>𝕏</span> <span>📸</span> <span>in</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Support />
      </div>
    </div>
  );
};

export default About;
