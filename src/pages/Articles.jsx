import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'
// MagicBento removed — using projects-style grid for articles
import SpaceBackground from '../components/SpaceBackground'
import '../styles/events.css'

export default function Articles() {
  const articles = getArticles()
  const hiddenArticleIds = new Set([
    'getting-started-with-open-source',
    'project-radian',
    'project-starspec',
    'project-optiqomm',
    'project-sonicphase',
    'project-ferrostats',
    'project-quantaband',
    'project-ligo',
  ])
  const visibleArticles = articles.filter(article => !hiddenArticleIds.has(article.id))

  return (
    <article className="page events-page">
      <SpaceBackground />

      <div className="events-container">
        <header className="events-header" style={{ marginTop: '-4.5rem' }}>
          <h1 className="events-title">Articles</h1>
          <p className="events-subtitle">Our articles explore a wide range of topics in physics, from fundamental concepts and historical developments to recent research and scientific breakthroughs. They aim to present complex ideas in a clear and engaging manner, encouraging readers to learn, question, and explore further.</p>
        </header>

        <div className="projects-grid" style={{ marginTop: '7rem' }}>
          {visibleArticles.map(article => (
            <Link key={article.id} to={`/articles/${article.id}`} className="project-card project-card--inner">
              <div className="project-card__image">
                {article.image ? (
                  <img src={imagePath(article.image)} alt={article.title} />
                ) : (
                  <div className="pattern-bg" style={{height: '180px'}} />
                )}
              </div>
              <div className="project-card__content">
                <h3>{article.title}</h3>
                <p>{article.excerpt || article.summary || ''}</p>
                <span className="project-card__cta">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>

        {visibleArticles.length === 0 && (
          <div className="empty-state">
            <p>No articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </article>
  )
}
