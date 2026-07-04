import { useParams, Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import projects from '../data/projects.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <article className="page">
        <div className="container">
          <p>Project not found.</p>
          <Link to="/projects">← Back to Projects</Link>
        </div>
      </article>
    )
  }

  return (
    <article className="project-page">
      <div className="container">
        <header className="project-hero">
          <div className="project-hero__image">
            <img src={imagePath(project.image)} alt={project.title} />
          </div>
          <div className="project-hero__content">
            <h1>{project.title}</h1>
            <div className="project-meta">
              <span className="project-date">📅 {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              <span className="project-author">👤 {project.author}</span>
            </div>
            <p className="project-excerpt">{project.excerpt}</p>
            {project.tags && (
              <div className="article-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}
            {project.github && (
              <a href={project.github} className="project-github" target="_blank" rel="noopener">
                View on GitHub →
              </a>
            )}
          </div>
        </header>

        <div className="project-divider"></div>

        <div className="project-content" dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </article>
  )
}
