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
        <header className="events-header">
          <h1 className="events-title">Articles</h1>
        </header>

        <div className="page-content">
          <div className="events-header">
            <h2>Articles</h2>
            <p>Explore technical tutorials, hackathon recaps, and community insights.</p>
          </div>

          <div className="projects-grid articles-grid">
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
      </div>
    </article>
  )
}
