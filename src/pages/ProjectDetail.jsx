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
  optiqomm: '/assets/projects of 2025-26/optiqomm.png',
  radian: '/assets/projects of 2025-26/radian.png',
  starspec: '/assets/projects of 2025-26/starspec.png',
  ligo: '/assets/projects of 2025-26/ligo.png',
}

const defaultProjectMembers = [
  { initials: 'AR', name: 'Aarav R', role: 'Project Member' },
  { initials: 'PS', name: 'Priya S', role: 'Project Member' },
  { initials: 'RK', name: 'Rahul K', role: 'Project Member' },
  { initials: 'AN', name: 'Ananya N', role: 'Project Member' },
  { initials: 'VK', name: 'Vikram K', role: 'Project Member' },
  { initials: 'SN', name: 'Sneha N', role: 'Project Member' },
  { initials: 'DT', name: 'Dhruv T', role: 'Project Member' },
]

const quantabandMembers = [
  { initials: 'AG', name: 'Aditya Goel', role: 'Project Lead' },
  { initials: 'H', name: 'Hariccharan', role: 'Project Co-lead' },
  { initials: 'SR', name: 'S Rajeev Yuvan', role: 'Project Member' },
  { initials: 'K', name: 'Keerthivaasan', role: 'Project Member' },
  { initials: 'PS', name: 'Prithviraj Somwanshi', role: 'Project Member' },
  { initials: 'N', name: 'Nidarshana', role: 'Project Member' },
  { initials: 'AS', name: 'Aakanksha Shukla', role: 'Project Member' },
]

const ferrostatsMembers = [
  { initials: 'AP', name: 'Abishekapriyan', role: 'Project Member' },
  { initials: 'NK', name: 'Nantha Kumaran', role: 'Project Member' },
]

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

  const is2026_27 = projects["2026-27"]?.some(p => p.id === id)
  const colors = projectPalette[allProjects.indexOf(project) % projectPalette.length]
  const image = project.image || fallbackImages[project.id] || fallbackImages.optiqomm
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

        {is2026_27 && (
          <section className="team-section visible" style={{ marginTop: '3rem' }}>
            <h2 className="team-section-title" style={{ color: colors.accent, textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', letterSpacing: '1px' }}>Project Members</h2>
            <div className="team-grid">
              {(id === 'ferrostats' ? ferrostatsMembers : id === 'quantaband' ? quantabandMembers : defaultProjectMembers).map((m, i) => (
                <div key={m.name} className="team-card" style={{ '--reveal-delay': `${i * 0.06}s`, opacity: 1, transform: 'none', background: 'rgba(20, 20, 35, 0.95)', border: `1px solid ${colors.accent}`, borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '220px', boxShadow: `0 8px 24px rgba(0, 0, 0, 0.3), 0 0 20px ${colors.glow}` }}>
                  <div className="team-card__image" style={{ background: `linear-gradient(135deg, ${colors.bg}, ${colors.accent})`, height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>{m.initials}</span>
                  </div>
                  <div className="team-card__info" style={{ padding: '1.2rem', textAlign: 'center', background: 'rgba(13, 19, 48, 0.95)' }}>
                    <h3 className="team-card__name" style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.3rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{m.name}</h3>
                    <p className="team-card__role" style={{ color: colors.accent, fontSize: '0.85rem', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
