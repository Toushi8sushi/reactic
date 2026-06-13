import { useParams, Link } from 'react-router-dom'
import articles from '../data/articles.json'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id)

  if (!article) {
    return (
      <article className="page">
        <div className="container">
          <p>Article not found.</p>
          <Link to="/articles">← Back to Articles</Link>
        </div>
      </article>
    )
  }

  return (
    <article className="post">
      <div className="container">
        <header className="post-header">
          <h1>{article.title}</h1>
          <div className="post-meta">
            <span className="author">By {article.author}</span>
            <span className="date">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {article.tags && (
            <div className="post-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="post-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <footer className="post-footer">
          <Link to="/articles" className="back-link">← Back to Articles</Link>
        </footer>
      </div>
    </article>
  )
}
