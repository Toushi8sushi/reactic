import { Link } from 'react-router-dom'
import team from '../data/team.json'

export default function Team() {
  return (
    <article className="page">
      <div className="container">
        <header className="page-header team-header">
          <div className="team-banner">
            <img src="/assets/images/team/team.jpeg" alt="" className="team-banner-bg" />
            <div className="team-banner-overlay" />
            <h1>Our Team</h1>
          </div>
        </header>
        <div className="page-content">
          <h2>Core Team 2026-2027</h2>
          <p>Meet the people who make Horizon possible. Our team is composed of passionate students dedicated to creating a thriving technical community.</p>

          <div className="team-grid">
            {team.map(member => (
              <div key={member.name} className="team-member">
                {member.photo ? (
                  <div className="member-avatar member-avatar--photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                ) : (
                  <div className="member-avatar">{member.initials}</div>
                )}
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>

          <h2>Active Members</h2>
          <p>Our club thrives thanks to the contributions of all our active members. We&rsquo;re always looking for enthusiastic students to join our team. If you&rsquo;re interested, please <Link to="/contact">get in touch</Link>.</p>
        </div>
      </div>
    </article>
  )
}
