import { useState, useEffect, useRef } from 'react'
import teamData from '../data/team.json'
import Hyperspeed from '../components/Hyperspeed/Hyperspeed'
import NodeFriends from '../components/NodeFriends/NodeFriends'

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
      <div className="team-hero-shell">
        <div className="team-nodes-layer" aria-hidden="true">
          <NodeFriends />
        </div>
        <div className="team-hero-overlay" aria-hidden="true"></div>
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
      </div>
      <div className="team-background-section">
        <div className="team-background-layer" aria-hidden="true">
          <Hyperspeed
            effectOptions={{
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 3,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [12, 80],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 526344,
                islandColor: 657930,
                background: 0,
                shoulderLines: 1250072,
                brokenLines: 1250072,
                leftCars: [14177983, 6770850, 12732332],
                rightCars: [242627, 941733, 3294549],
                sticks: 242627
              }
            }}
          />
        </div>
        <div className="team-background-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="team-content">
            {['core', 'coordinator'].map(section => (
              grouped[section]?.length > 0 && (
                <section key={section} className="team-section">
                  <h2>{sectionLabel[section]} &mdash; {activeTenure}</h2>
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
        </div>
      </div>
    </article>
  )
}
