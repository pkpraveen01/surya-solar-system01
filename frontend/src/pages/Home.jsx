import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Home = () => (
  <div className="landing-container">
    {/* Hero Section */}
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Welcome to Surya Solar System</h1>
        <p>Clean, affordable solar energy for your home and business.</p>
        <a href="/services" className="hero-button">Explore Services</a>
      </div>
    </div>

    {/* Testimonials Section */}
    <section className="testimonials-section">
      <h2>Our Testimonials</h2>
      <p className="sub-heading">What Clients Say About Us</p>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p>“Surya Solar installed a rooftop system at my home. The quality and service were top-notch!”</p>
          <h4>- Kundan Yadav</h4>
        </div>
        <div className="testimonial-card">
          <p>“Professional team and timely execution. Highly recommend their services.”</p>
          <h4>- Nandan Maharshi</h4>
        </div>
        <div className="testimonial-card">
          <p>“Very satisfied with the performance and after-sales support. Great work!”</p>
          <h4>- Kiyan Dev</h4>
        </div>
      </div>
    </section>

    {/* Gallery Section */}
    <section className="gallery-section">
      <h2>Our Installations</h2>
      <div className="gallery-grid">
        <img src="/gallery1.jpg" alt="Solar Installation 1" />
        <img src="/gallery2.jpg" alt="Solar Installation 2" />
        <img src="/gallery3.jpg" alt="Solar Installation 3" />
        <img src="/gallery4.jpg" alt="Solar Installation 4" />
        <img src="/gallery5.jpg" alt="Solar Installation 5" />
        <img src="/gallery6.jpg" alt="Solar Installation 6" />
      </div>
    </section>

    {/* Floating Support Buttons */}
    <div className="support-buttons">
      <a href="tel:+917260019502" className="call-button" title="Call Now">
        <FontAwesomeIcon icon={faPhone} size="2x" />
      </a>
      <a href="https://wa.me/917260019502" className="whatsapp-button" title="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>
    </div>
  </div>
);

export default Home;
