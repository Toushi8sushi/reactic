import { useParams, Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import projects from '../data/projects.json'
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

const projectPalette = [
  { bg: '#1e1b4b', accent: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' },
  { bg: '#4a1942', accent: '#f472b6', glow: 'rgba(244, 114, 182, 0.35)' },
  { bg: '#022c22', accent: '#34d399', glow: 'rgba(52, 211, 153, 0.35)' },
  { bg: '#451a03', accent: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' },
  { bg: '#2e1065', accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.35)' },
  { bg: '#431407', accent: '#f87171', glow: 'rgba(248, 113, 113, 0.35)' },
  { bg: '#083344', accent: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.35)' },
  { bg: '#1e293b', accent: '#fb923c', glow: 'rgba(251, 146, 60, 0.35)' },
]

const fallbackImages = {
  optiqomm: '/assets/images/projects/2025/optiqomm.png',
  radian: '/assets/images/projects/2025/radian.png',
  starspec: '/assets/images/projects/2025/starspec.png',
  ligo: '/assets/images/projects/2025/ligo.png',
  placeholder: '/assets/images/projects/2025/placeholder.svg',
}

export default function ProjectDetail() {
  const { id } = useParams()
  const allProjects = Object.values(projects).flat()
  const project = allProjects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="events-page">
        <SpaceBackground />
        <div className="events-container">
          <p>Project not found.</p>
          <Link to="/projects">{'\u2190'} Back to Projects</Link>
        </div>
      </div>
    )
  }

  const colors = projectPalette[allProjects.indexOf(project) % projectPalette.length]
  const image = project.image || fallbackImages[project.id] || fallbackImages.placeholder
  const dateLabel = new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

  return (
    <div className="events-page project-detail-page">
      <SpaceBackground />

      <div className="events-container">
        <Link to="/projects" className="event-category__back">
          {'\u2190'} All Projects
        </Link>

        <header
          className="event-category__header"
          style={{ '--cat-accent': colors.accent, '--cat-bg': colors.bg }}
        >
          <div className="event-category__heading">
            <h1 className="event-category__title">{project.title}</h1>
          </div>
          <p className="event-category__year">{dateLabel}</p>
        </header>

        <div className="subcard-list">
          <div
            className="subcard revealed"
            style={{ '--cat-accent': colors.accent, '--cat-bg': colors.bg, '--cat-glow': colors.glow }}
          >
            <div className="subcard__shooting-star" />

            <div className="subcard__image">
              <img src={imagePath(image)} alt={project.title} />
              <div className="subcard__image-overlay" />
            </div>

            <div className="subcard__content">
              <h3 className="subcard__title">{project.title}</h3>
              <span className="subcard__divider" />
              <p className="subcard__speaker">{project.author}</p>
              <p className="subcard__description">{project.excerpt}</p>
              {project.tags && (
                <div className="article-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              )}
              {project.github && (
                <a href={project.github} className="subcard__youtube" target="_blank" rel="noopener noreferrer">
                  View on GitHub {'\u2192'}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="project-divider" />

        <div className="project-content" style={{ '--cat-accent': colors.accent }}>
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>

        {project.team && (project.team.leads?.length > 0 || project.team.members?.length > 0) && (
          <div className="subcard__team project-team-block">
            <div className="subcard__team-media">
              <img
                src={imagePath(project.team.image || fallbackImages.placeholder)}
                alt={`${project.title} team`}
              />
              <div className="subcard__image-overlay" />
            </div>
            <div className="subcard__team-content">
              <h4 className="subcard__team-title">Project Team</h4>
              <span className="subcard__divider" />
              {project.team.leads?.length > 0 && (
                <div className="subcard__team-group">
                  <span className="subcard__team-label">Project Lead</span>
                  <ul className="subcard__team-list">
                    {project.team.leads.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.team.members?.length > 0 && (
                <div className="subcard__team-group">
                  <span className="subcard__team-label">Project Members</span>
                  <ul className="subcard__team-list">
                    {project.team.members.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
