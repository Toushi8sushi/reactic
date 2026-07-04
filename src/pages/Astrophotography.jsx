import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { imagePath } from '../lib/image-path'
import gallery from '../data/astro-gallery.json'

export default function Astrophotography() {
  const astroPosts = getArticles().filter(a => a.tags?.includes('astrophotography'))

  return (
    <article className="astro-page">
      <header className="astro-header">
        <h1>Astrophotography</h1>
        <p>Deep-sky imaging, star trails, and the cosmos through our lenses.</p>
      </header>

      <section className="astro-gallery">
        {gallery.map((item, i) => (
          <div key={i} className="astro-tile">
            <img
              src={imagePath(item.image)}
              alt={item.title}
              loading="lazy"
            />
            <div className="astro-tile__overlay">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </section>

      {astroPosts.length > 0 && (
        <section className="astro-articles">
          <h2 className="section-title">Articles</h2>
          <div className="articles-list">
            {astroPosts.map(post => (
              <article key={post.id} className="article-card">
                <div className="card-body">
                  <div className="card-meta">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h3 className="card-title">
                    <Link to={`/articles/${post.id}`}>{post.title}</Link>
                  </h3>
                  {post.tags && (
                    <div className="tags-list">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  )}
                  <Link to={`/articles/${post.id}`} className="read-link">
                    Read more <span className="arrow">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
