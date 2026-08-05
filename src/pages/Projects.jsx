import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import projects from '../data/projects.json'
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

const tenures = Object.keys(projects).sort()

export default function Projects() {
  const [activeTenure, setActiveTenure] = useState(tenures[0])

  const filteredProjects = projects[activeTenure] || []

  return (
    <article className="events-page projects-page">
      <SpaceBackground />

      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">Projects</h1>
          <p className="events-subtitle">Explore our research projects across different time periods.</p>
        </header>

        <nav className="year-pills" aria-label="Select year">
          {tenures.map(year => (
            <button
              key={year}
              className={`year-pill${activeTenure === year ? ' year-pill--active' : ''}`}
              onClick={() => setActiveTenure(year)}
            >
              {activeTenure === year && <span className="year-pill__comet" />}
              <span className="year-pill__label">{year}</span>
            </button>
          ))}
        </nav>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <Link key={project.id} to={`/projects/${project.id}`} className="project-card project-card--inner">
              <div className="project-card__image">
                <img src={imagePath(project.image)} alt={project.title} />
              </div>
              <div className="project-card__content">
                <h3>{project.title}</h3>
                <p>{project.excerpt}</p>
                <span className="project-card__cta">View Project →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
