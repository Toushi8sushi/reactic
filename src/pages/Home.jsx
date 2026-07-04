import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import '../styles/hero.css'

function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let width, height
    let stars = []
    let bigStars = []
    let constellations = []

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio

      // dense small twinkling stars
      stars = Array.from({ length: 260 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.02,
      }))

      // fewer, bigger glowing "feature" stars
      bigStars = Array.from({ length: 14 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1.8,
        color: Math.random() > 0.5 ? '255, 240, 210' : '190, 210, 255',
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        phase: Math.random() * Math.PI * 2,
      }))

      // constellation clusters: pick random points, connect nearby ones
      constellations = []
      const clusterCount = 4
      for (let c = 0; c < clusterCount; c++) {
        const cx = Math.random() * width
        const cy = Math.random() * height
        const points = Array.from({ length: 5 + Math.floor(Math.random() * 3) }, () => ({
          x: cx + (Math.random() - 0.5) * 220,
          y: cy + (Math.random() - 0.5) * 160,
        }))
        constellations.push(points)
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      // constellation lines (faint)
      ctx.strokeStyle = 'rgba(150, 170, 255, 0.18)'
      ctx.lineWidth = 1
      constellations.forEach((points) => {
        ctx.beginPath()
        points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        })
        ctx.stroke()
        points.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(200, 210, 255, 0.7)'
          ctx.fill()
        })
      })

      // small twinkling stars
      for (const s of stars) {
        s.phase += s.twinkleSpeed
        const alpha = Math.max(0, s.baseAlpha + Math.sin(s.phase) * 0.3)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226, 222, 255, ${alpha})`
        ctx.fill()
        s.x += s.driftX
        s.y += s.driftY
        if (s.x < 0) s.x = width
        if (s.x > width) s.x = 0
        if (s.y < 0) s.y = height
        if (s.y > height) s.y = 0
      }

      // big glowing stars
      for (const s of bigStars) {
        s.phase += s.twinkleSpeed
        const glow = 0.6 + Math.sin(s.phase) * 0.35
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8)
        grad.addColorStop(0, `rgba(${s.color}, ${glow})`)
        grad.addColorStop(1, `rgba(${s.color}, 0)`)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${s.color}, 1)`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <section className="hero hero-astro">
        <Starfield />
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring-1">
            <div className="orbit-planet orbit-planet-1" />
          </div>
          <div className="orbit-ring orbit-ring-2">
            <div className="orbit-planet orbit-planet-2" />
          </div>
        </div>

        <div className="container hero-content">
          <h1>Welcome to Horizon!</h1>
          <p className="hero-tagline">The Physics and Astronomy Club, IIT Madras</p>
          <div className="hero-actions">
            <Link to="/guild" className="btn btn-primary">Learn More</Link>
            <Link to="/articles" className="btn btn-primary">Read Articles</Link>
          </div>
        </div>
      </section>

      <section className="section home-what-we-do">
        <div className="container">
          <h2>What We Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Technical Workshops</h3>
              <p>Regular hands-on sessions covering web development, machine learning, robotics, and more.</p>
            </div>
            <div className="feature-card">
              <h3>Project Collaboration</h3>
              <p>Work on real-world projects with fellow students and build your portfolio.</p>
            </div>
            <div className="feature-card">
              <h3>Community Events</h3>
              <p>Hackathons, tech talks, and networking opportunities with industry professionals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt home-join-us">
        <div className="join-us-background" aria-hidden="true">
          <svg className="join-us-svg" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur1" />
                <feGaussianBlur stdDeviation="4" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              <radialGradient id="nebula-left" cx="30%" cy="50%" r="40%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </radialGradient>
              <radialGradient id="nebula-right" cx="70%" cy="50%" r="40%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </radialGradient>
              <radialGradient id="spark-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                <stop offset="40%" stopColor="rgba(56, 189, 248, 0.3)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </radialGradient>
            </defs>

            <rect width="1200" height="400" fill="url(#nebula-left)" />
            <rect width="1200" height="400" fill="url(#nebula-right)" />

            <g opacity="0.25">
              <circle cx="150" cy="80" r="1" fill="#fff" />
              <circle cx="280" cy="320" r="1.5" fill="#fff" />
              <circle cx="450" cy="60" r="0.8" fill="#fff" />
              <circle cx="750" cy="340" r="1.2" fill="#fff" />
              <circle cx="950" cy="70" r="1.5" fill="#fff" />
              <circle cx="1100" cy="280" r="1" fill="#fff" />
            </g>

            <g className="join-us-hand" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" fill="none">
              <polygon points="300,240 310,180 390,170 400,250" fill="rgba(59, 130, 246, 0.03)" stroke="rgba(59, 130, 246, 0.25)" />
              
              <path d="M 390 170 L 420 140 L 470 120" />
              <path d="M 390 170 L 490 170 L 530 175" />
              <path d="M 390 170 L 510 200 L 560 205" />
              <path d="M 400 250 L 500 230 L 545 235" />
              <path d="M 400 250 L 480 255 L 520 260" />
              
              <path d="M 470 120 L 530 175 L 560 205 L 545 235 L 520 260" strokeDasharray="3 3" opacity="0.7" />
              <path d="M 300 240 L 400 250" />
              <path d="M 310 180 L 390 170" strokeWidth="1" />
              
              <g fill="#60a5fa" filter="url(#glow)">
                <circle cx="300" cy="240" r="3" />
                <circle cx="310" cy="180" r="3" />
                <circle cx="400" cy="250" r="3" />
                <circle cx="390" cy="170" r="3" />
                <circle cx="420" cy="140" r="3.5" />
                <circle cx="470" cy="120" r="4.5" fill="#93c5fd" />
                <circle cx="490" cy="170" r="3.5" />
                <circle cx="530" cy="175" r="4.5" fill="#93c5fd" />
                <circle cx="510" cy="200" r="3.5" />
                <circle cx="560" cy="205" r="5" fill="#fff" />
                <circle cx="500" cy="230" r="3.5" />
                <circle cx="545" cy="235" r="4.5" fill="#93c5fd" />
                <circle cx="480" cy="255" r="3.5" />
                <circle cx="520" cy="260" r="4" fill="#93c5fd" />
              </g>
            </g>

            <g className="join-us-hand-right" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" fill="none">
              <polygon points="900,160 890,220 800,230 810,150" fill="rgba(168, 85, 247, 0.03)" stroke="rgba(168, 85, 247, 0.25)" />
              
              <path d="M 800 230 L 780 260 L 730 280" />
              <path d="M 800 230 L 710 230 L 670 225" />
              <path d="M 800 230 L 690 200 L 640 195" />
              <path d="M 810 150 L 700 170 L 655 165" />
              <path d="M 810 150 L 720 145 L 680 140" />
              
              <path d="M 730 280 L 670 225 L 640 195 L 655 165 L 680 140" strokeDasharray="3 3" opacity="0.7" />
              <path d="M 900 160 L 810 150" />
              <path d="M 890 220 L 800 230" strokeWidth="1" />
              
              <g fill="#c084fc" filter="url(#glow)">
                <circle cx="900" cy="160" r="3" />
                <circle cx="890" cy="220" r="3" />
                <circle cx="800" cy="230" r="3" />
                <circle cx="810" cy="150" r="3" />
                <circle cx="780" cy="260" r="3.5" />
                <circle cx="730" cy="280" r="4.5" fill="#e9d5ff" />
                <circle cx="710" cy="230" r="3.5" />
                <circle cx="670" cy="225" r="4.5" fill="#e9d5ff" />
                <circle cx="690" cy="200" r="3.5" />
                <circle cx="640" cy="195" r="5" fill="#fff" />
                <circle cx="700" cy="170" r="3.5" />
                <circle cx="655" cy="165" r="4.5" fill="#e9d5ff" />
                <circle cx="720" cy="145" r="3.5" />
                <circle cx="680" cy="140" r="4" fill="#e9d5ff" />
              </g>
            </g>

            <g className="join-us-spark">
              <circle cx="600" cy="200" r="60" fill="url(#spark-glow)" opacity="0.6" />
              <circle cx="600" cy="200" r="16" fill="#e0f2fe" filter="url(#intense-glow)" opacity="0.9" />
              <circle cx="600" cy="200" r="5" fill="#ffffff" />
              
              <path d="M 560 205 Q 600 200 640 195" className="join-us-glow-path" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
              <path d="M 530 175 Q 600 200 670 225" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 545 235 Q 600 200 655 165" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
            </g>
          </svg>
        </div>
        <div className="container text-center join-us-content">
          <h2>Join Us</h2>
          <p>Interested in becoming part of our community? We welcome students from all technical backgrounds.</p>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </section>
    </>
  )
}