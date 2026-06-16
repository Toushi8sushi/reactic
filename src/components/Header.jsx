import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/events', label: 'Events' },
    { to: '/articles', label: 'Articles' },
    { to: '/astrophotography', label: 'Astrophotography' },
    { to: '/guild', label: 'Guild' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="container">
          <div className="nav-brand">
            <Link to="/" className="nav-logo" aria-label="Home" onClick={closeMenu}>
              <img src={imagePath('/assets/images/logo.png')} alt="Horizon" style={{ height: 40 }} />
            </Link>
          </div>

          <button
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
            {links.map(link => (
              <li key={link.to}>
                <Link to={link.to} onClick={closeMenu}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
