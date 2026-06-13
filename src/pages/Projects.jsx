import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

export default function Projects() {
  return (
    <article className="page">
      <div className="container">
        <header className="page-header">
          <h1>Projects</h1>
        </header>
        <div className="page-content">
          <div className="projects-grid">
            {projects.map(project => (
              <Link key={project.id} to={`/projects/${project.id}`} className="project-card">
                <div className="project-card__image">
                  <img src={project.image} alt={project.title} />
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
      </div>
    </article>
  )
}
