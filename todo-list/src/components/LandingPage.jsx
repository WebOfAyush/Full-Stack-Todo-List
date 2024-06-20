import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to TodoList</h1>
        <p>Organize your tasks efficiently and stay productive!</p>
        <div className="landing-buttons">
          <Link className="landing-btn" to="/login">Login</Link>
          <Link className="landing-btn" to="/register">Sign Up</Link>
        </div>
      </div>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <p>Intuitive interface for quick task management.</p>
          </div>
          <div className="feature-item">
            <h3>Delete Your Task</h3>
            <p>You can delete your tasks from anywhere, on any device.</p>
          </div>
          <div className="feature-item">
            <h3>Best for Productivity</h3>
            <p>Arrange you tasks, and ensure to complete them.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>TodoList is a leading task management tool that helps you stay organized and productive. Whether you're managing personal projects or collaborating with a team, TodoList has the features you need to succeed.</p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us at <a href="mailto:webofayush7@gmail.com">webofayush7@gmail.com</a>.</p>
      </section>
    </div>
  );
}

export default LandingPage;
