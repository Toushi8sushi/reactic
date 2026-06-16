import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'

export default function Articles() {
  const articles = getArticles()

  return (
    <article className="page">
      <div className="container">
        <header className="page-header">
          <h1>Articles</h1>
        </header>
        <div className="page-content">
          <div className="articles-header">
            <h2>Knowledge Hub</h2>
            <p>Explore technical tutorials, hackathon recaps, and community insights.</p>
          </div>

          <div className="articles-list">
            {articles.map(article => (
              <article key={article.id} className="article-card scroll-element">
                <Link to={`/articles/${article.id}`} className="card-visual">
                  {article.image ? (
                    <img src={imagePath(article.image)} alt={article.title} />
                  ) : (
                    <div className="pattern-bg"></div>
                  )}
                </Link>
                <div className="card-body">
                  <div className="card-meta">
                    <span className="author">{article.author}</span>
                    <span className="date">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                    {article.tags && (
                      <div className="tags-list">
                        {article.tags.map(tag => (
                          <span key={tag} className="tag-pill">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h3 className="card-title">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </h3>
                  <Link to={`/articles/${article.id}`} className="read-link">
                    Read Article <span className="arrow">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="empty-state">
              <p>No articles yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
