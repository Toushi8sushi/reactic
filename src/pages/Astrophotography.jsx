import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import gallery from '../data/astro-gallery.json'
import Lightfall from '../components/Lightfall/Lightfall'
import Particles from '../components/Particles/Particles'
import Masonry from '../components/Masonry/Masonry'
import ImageModal from '../components/ImageModal/ImageModal'

const masonryHeights = [380, 320, 420, 300, 360, 400, 340, 300, 420, 360, 320, 400]

export default function Astrophotography() {
  const astroPosts = getArticles().filter(a => a.tags?.includes('astrophotography'))
  const [selectedImage, setSelectedImage] = useState(null)

  const formattedAstroItems = gallery.map((item, i) => ({
    ...item,
    id: item.id,
    img: item.imageSrc,
    height: masonryHeights[i % masonryHeights.length]
  }))

  return (
    <article className="page">
      <div className="astro-hero-shell">
        <div className="astro-hero-layer" aria-hidden="true">
          <Lightfall
            colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
            backgroundColor="#080417"
            speed={0.5}
            streakCount={6}
            streakWidth={1}
            streakLength={0.8}
            glow={0.6}
            density={0.5}
            twinkle={0.8}
            zoom={2.5}
            backgroundGlow={0.3}
            opacity={0.6}
            mouseInteraction={true}
            mouseStrength={0.5}
            mouseRadius={0.4}
          />
        </div>
        <div className="container">
          <header className="page-header astro-page-header">
            <h1>Astrophotography</h1>
            <p>Deep-sky imaging, star trails, and the cosmos through our lenses.</p>
          </header>
        </div>
      </div>

      <section className="astro-gallery-section">
        <div className="astro-gallery-particles" aria-hidden="true">
          <Particles
            particleColors={['#ffffff', '#a6c8ff', '#5227ff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            particleHoverFactor={3}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div className="astro-gallery-content">
          <div className="astro-gallery-container">
            <h2 className="astro-gallery-title" style={{ marginTop: 'var(--spacing-lg)' }}>The Cosmic Gallery</h2>
            <Masonry
              items={formattedAstroItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.97}
              blurToFocus={true}
              onItemClick={item => setSelectedImage(item)}
            />
          </div>

          {selectedImage && (
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}

      {astroPosts.length > 0 && (
        <div className="astro-articles">
          <div className="container">
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
          </div>
        </div>
      )}
        </div>
      </section>
    </article>
  )
}
