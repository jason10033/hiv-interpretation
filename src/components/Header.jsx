import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { path: '/', label: 'Home' },
  { path: '/lookup', label: 'Lookup' },
  { path: '/algorithm', label: 'Algorithm' },
  { path: '/scenarios', label: 'Cases' },
  { path: '/window', label: 'Window' },
  { path: '/reference', label: 'Summary' },
  { path: '/about', label: 'About' },
  { path: '/feedback', label: 'Feedback' },
]

// NYC STD/HIV PTC brand colors (from logo: red + blue/purple)
const BRAND_RED = '#8B1A1A'
const BRAND_BLUE = '#5B9EC9'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: BRAND_BLUE,
      borderBottom: `3px solid ${BRAND_RED}`,
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      gap: 8,
    }}>
      {/* Brand */}
      <a
        href="https://www.publichealth.columbia.edu/research/centers/new-york-city-sti-hiv-prevention-training-center"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', minWidth: 0, textDecoration: 'none', flexShrink: 0 }}
      >
        <img
          src="/ptc-logo.png"
          alt="NYC STI/HIV Prevention Training Center"
          style={{ height: 38, width: 'auto', display: 'block' }}
        />
      </a>

      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        flex: 1,
        margin: '0 8px',
      }}>
        {NAV.map(({ path, label }) => {
          const active = pathname === path
          return (
            <Link
              key={path}
              to={path}
              style={{
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                color: active ? 'white' : 'rgba(255,255,255,0.55)',
                padding: '6px 7px',
                borderRadius: 6,
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <span style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: BRAND_RED,
        background: 'rgba(255,255,255,0.92)',
        border: `1.5px solid ${BRAND_RED}`,
        borderRadius: 4,
        padding: '3px 7px',
        flexShrink: 0,
      }}>Beta</span>

    </header>
  )
}
