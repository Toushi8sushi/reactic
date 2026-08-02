import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import projects from '../data/projects.json'
import FloatingLines from '../components/FloatingLines/FloatingLines'
import Ferrofluid from '../components/Ferrofluid/Ferrofluid'
import MagicBento from '../components/MagicBento/MagicBento'

const tenures = Object.keys(projects).sort()

export default function Projects() {
  const [activeTenure, setActiveTenure] = useState(tenures[0])

  const filteredProjects = projects[activeTenure] || []

  return (
    <article className="page">
      <div className="projects-hero-shell">
        <div className="ferrofluid-layer" aria-hidden="true">
          <Ferrofluid
            colors={['#7c3aed', '#06b6d4', '#f59e0b']}
            speed={0.35}
            scale={1.4}
            turbulence={0.85}
            fluidity={0.18}
            rimWidth={0.24}
            sharpness={2.2}
            shimmer={1.1}
            glow={1.8}
            flowDirection="down"
            opacity={0.6}
            mouseInteraction={false}
          />
        </div>
        <div className="container">
          <header className="page-header projects-page-header">
            <h1>Projects</h1>
            <p>Explore our research projects across different time periods.</p>
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
      <div className="projects-background-section">
        <div className="projects-background-layer" aria-hidden="true">
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 14, 18]}
            lineDistance={[8, 6, 4]}
            bendRadius={6}
            bendStrength={-0.8}
            interactive={true}
            parallax={true}
            animationSpeed={0.9}
            linesGradient={['#3b82f6', '#8b5cf6', '#ec4899']}
          />
        </div>
        <div className="container">
          <div className="page-content">
            <MagicBento
              containerClassName="projects-grid"
              enableTilt
              enableMagnetism
              clickEffect={false}
              textAutoHide={false}
            >
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
            </MagicBento>
          </div>
        </div>
      </div>
    </article>
  )
}
