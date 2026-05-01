import { Mail, PhoneCall } from "lucide-react";
import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Support from "../components/Support";

function Contact() {
  return (
    <div className="contact-container">
      <nav className="breadcrumbs">
        <Breadcrumbs />
      </nav>
      <div className="contact-main-container">
        <div className="contact-info">
          <div className="call-to-us">
            <div className="call-box">
              <div className="contact-icons">
                <PhoneCall />
              </div>
              <span>Call To Us</span>
            </div>
            <div className="call-box-detail">
              <p>We are available 24/7, 7 days a week</p>
              <p>Phone: +91 9876543210</p>
            </div>
          </div>
          <hr />
          <div className="call-to-us">
            <div className="call-box">
              <div className="contact-icons">
                <Mail />
              </div>
              <span>Write To Us</span>
            </div>
            <div className="call-box-detail">
              <p>Fill out our form and we will contact you within 24 hours</p>
              <p>Emails: apnastore@gmail.com</p>
              <p>Emails: support@apnastore.com</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="input-box-container">
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="tel" name="Phone" placeholder="Your Phone" />
          </div>
          <textarea name="" id="" placeholder="Your Message"></textarea>
          <button>Send Message</button>
        </div>
      </div>
      <Support />
    </div>
  );
}

export default Contact;
