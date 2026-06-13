import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Horizon!</h1>
          <p className="hero-tagline">The Physics and Astronomy Club, IIT Madras</p>
          <div className="hero-actions">
            <Link to="/guild" className="btn btn-primary">Learn More</Link>
            <Link to="/articles" className="btn btn-primary">Read Articles</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What We Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Technical Workshops</h3>
              <p>Regular hands-on sessions covering web development, machine learning, robotics, and more.</p>
            </div>
            <div className="feature-card">
              <h3>Project Collaboration</h3>
              <p>Work on real-world projects with fellow students and build your portfolio.</p>
            </div>
            <div className="feature-card">
              <h3>Community Events</h3>
              <p>Hackathons, tech talks, and networking opportunities with industry professionals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2>Join Us</h2>
          <p>Interested in becoming part of our community? We welcome students from all technical backgrounds.</p>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}
