import React from "react";
import './About.css';
import solarImage from '../assets/solar-panel.jpg'; // Make sure this image exists

const About = () => {
  return (
    <section className="about-section">
      <div className="about-wrapper">
        <div className="about-image-box">
          <img src={solarImage} alt="Solar Installation" className="about-img" />
          <div className="experience-tag">15+ Years Of Experience</div>
        </div>

        <div className="about-content">
          <h4 className="about-subtitle">Our Introduction</h4>
          <h2 className="about-heading">Your Trusted Partner in Solar Solutions</h2>
          <p className="about-description">
            Surya Solar System is a leading provider of high-quality solar panel solutions, offering reliable and cost-effective renewable energy services. We specialize in on-grid, off-grid, and hybrid solar systems for residential, commercial, and industrial needs. Our team ensures seamless installation, maintenance, and consultation to harness solar power efficiently.
          </p>
          <p className="about-highlight">
            We provide customized solar systems for schools, hospitals, cold storages, colleges, factories, and more. <strong>We also provide PM Surya Ghar Muft Bijli Yojna.</strong>
          </p>

          <div className="about-contact">
            <span className="call-icon">📞</span>
            <div>
              <h5>Emergency Call</h5>
              <p>+91-9304498105</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
