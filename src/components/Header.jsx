import { Link, useLocation } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import PillNav from './PillNav'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Events', href: '/events' },
  { label: 'Articles', href: '/articles' },
  { label: 'Astrophotography', href: '/astrophotography' },
  { label: 'Guild', href: '/guild' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="pill-header">
      <PillNav
        items={navItems}
        activeHref={pathname}
        baseColor="var(--color-background)"
        pillColor="var(--color-border)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="var(--color-text)"
        initialLoadAnimation
      />
      <Link to="/" className="pill-header__logo" aria-label="Home">
        <img src={imagePath('/assets/images/logo.png')} alt="Horizon" />
      </Link>
    </header>
  )
}
