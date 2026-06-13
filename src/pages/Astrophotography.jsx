import { Link } from 'react-router-dom'
import articles from '../data/articles.json'

export default function Astrophotography() {
  const astroPosts = articles.filter(a => a.tags?.includes('astrophotography'))

  return (
    <article className="page">
      <div className="container">
        <header className="page-header">
          <h1>Astrophotography</h1>
        </header>
        <div className="page-content">
          <p>Deep-sky imaging, star trails, equipment reviews, and processing workflows.</p>

          <div className="articles-list">
            {astroPosts.map(post => (
              <article key={post.id} className="article-card">
                <h3>
                  <Link to={`/articles/${post.id}`}>{post.title}</Link>
                </h3>
                <div className="article-meta">
                  <span className="author">{post.author}</span>
                  <span className="date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                {post.tags && (
                  <div className="article-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                )}
                <Link to={`/articles/${post.id}`} className="read-more">Read more →</Link>
              </article>
            ))}
          </div>

          {astroPosts.length === 0 && (
            <p className="text-center">No astrophotography articles yet. Check back soon!</p>
          )}
        </div>
      </div>
    </article>
  )
}
