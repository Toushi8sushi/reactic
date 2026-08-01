import { useState, useEffect, useRef } from 'react'
import teamData from '../data/team.json'
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

const tenures = Object.keys(teamData).sort()
const sectionLabel = { core: 'Core Team', coordinator: 'Coordinators' }

const imageMap = {
  'Aditya Goel': '/assets/images of team members/aditya.jpeg',
  'Ananya Desle': '/assets/images of team members/andy.jpeg',
  'Harsh Meena': '/assets/images of team members/harsh.jpeg',
  'Nantha Kumaran': '/assets/images of team members/nantha.jpeg',
  'Nikhil Kanakam': '/assets/images of team members/nikhil.jpeg',
  'Nikshep DC': '/assets/images of team members/nikshep.jpeg',
}

const imagePosition = {
  'Nantha Kumaran': 'center 10%',
  'Nikhil Kanakam': 'center 70%',
}

export default function Team() {
  const [activeTenure, setActiveTenure] = useState('2026-27')
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
    <article className="page events-page team-page">
      <SpaceBackground />
      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">Our Team</h1>
          <p className="events-subtitle">Meet the people who make Horizon possible.</p>
        </header>
        <nav className="year-pills" aria-label="Select tenure">
          {tenures.map(t => (
            <button
              key={t}
              className={`year-pill${activeTenure === t ? ' year-pill--active' : ''}`}
              onClick={() => setActiveTenure(t)}
            >
              {activeTenure === t && <span className="year-pill__comet" />}
              <span className="year-pill__label">{t}</span>
            </button>
          ))}
        </nav>
        <div className="team-content">
            {['core', 'coordinator'].map(section => (
              grouped[section]?.length > 0 && (
                <section key={section} className="team-section">
                  <h2 className="team-section-title">{sectionLabel[section]} &mdash; {activeTenure}</h2>
                  <div className="team-grid">
                    {grouped[section].map((m, i) => (
                      <div key={m.name} className="team-card" style={{ '--reveal-delay': `${i * 0.06}s` }}>
                        <div className={`team-card__image${!imageMap[m.name] ? ' team-card__image--placeholder' : ''}`}>
                          {imageMap[m.name] ? (
                            <img src={imageMap[m.name]} alt={m.name} loading="lazy" style={imagePosition[m.name] ? { objectPosition: imagePosition[m.name] } : undefined} />
                          ) : (
                            <span>{m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="team-card__info">
                          <h3 className="team-card__name">{m.name}</h3>
                          <p className="team-card__role">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            ))}
          </div>
        </div>
    </article>
  )
}
