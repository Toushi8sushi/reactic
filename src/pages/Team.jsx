import { useState, useEffect, useRef } from 'react'
import teamData from '../data/team.json'

const tenures = Object.keys(teamData).sort()
const sectionLabel = { core: 'Core Team', coordinator: 'Coordinators' }

export default function Team() {
  const [activeTenure, setActiveTenure] = useState(tenures[0])
  const observerRef = useRef(null)

  const members = teamData[activeTenure]

  const grouped = {}
  for (const m of members) {
    if (!grouped[m.section]) grouped[m.section] = []
    grouped[m.section].push(m)
  }

  useEffect(() => {
    const sections = document.querySelectorAll('.team-section')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    sections.forEach((el) => obs.observe(el))
    observerRef.current = obs
    return () => obs.disconnect()
  }, [activeTenure])

  return (
    <article className="page">
      <div className="container">
        <header className="page-header">
          <h1>Our Team</h1>
          <p>Meet the people who make Horizon possible.</p>
          <div className="tenure-tabs">
            {tenures.map(t => (
              <button
                key={t}
                className={`btn ${activeTenure === t ? 'btn-primary' : ''}`}
                onClick={() => setActiveTenure(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </header>
      </div>
      <div className="team-content">
        {['core', 'coordinator'].map(section => (
          grouped[section]?.length > 0 && (
            <section key={section} className="team-section">
              <h2>{sectionLabel[section]} &mdash; {activeTenure}</h2>
              <div className="team-grid">
                {grouped[section].map((m, i) => (
                  <div key={m.name} className="team-card" style={{ '--reveal-delay': `${i * 0.06}s` }}>
                    <div className="team-card__image team-card__image--placeholder">
                      <span>{m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="team-card__info">
                      <h3>{m.name}</h3>
                      <p className="team-card__role">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </article>
  )
}
