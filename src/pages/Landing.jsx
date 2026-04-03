import { useNavigate } from 'react-router-dom'

const ROUTES = [
  {
    id: 'lookup',
    icon: '✓',
    label: 'I have results in front of me',
    sublabel: 'Enter results, get interpretation instantly',
    path: '/lookup',
    color: '#162447',
    bg: 'var(--primary-bg)',
    border: 'var(--primary-border)',
  },
  {
    id: 'reactive',
    icon: '⊕',
    label: 'Reactive 4th-gen Ag/Ab result',
    sublabel: 'Need to interpret next steps',
    path: '/algorithm',
    color: 'var(--reactive)',
    bg: 'var(--reactive-bg)',
    border: 'var(--reactive-border)',
  },
  {
    id: 'highrisk',
    icon: '◷',
    label: 'Negative but high-risk or recent exposure',
    sublabel: 'Understanding window periods',
    path: '/window',
    color: 'var(--primary-mid)',
    bg: 'var(--primary-bg)',
    border: 'var(--primary-border)',
  },
  {
    id: 'differentiation',
    icon: '≡',
    label: 'Have differentiation or RNA result',
    sublabel: 'Walk through interpretation patterns',
    path: '/scenarios',
    color: 'var(--negative)',
    bg: 'var(--negative-bg)',
    border: 'var(--negative-border)',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      maxWidth: 480,
      margin: '0 auto',
      padding: '32px 16px 48px',
    }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 8,
        }}>CDC/APHL 2014 Algorithm</p>
        <h1 style={{
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 8,
        }}>What result are you looking at?</h1>
        <p style={{
          fontSize: 15,
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
        }}>
          Select your scenario to go directly to relevant guidance.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROUTES.map((route) => (
          <button
            key={route.id}
            onClick={() => navigate(route.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: route.bg,
              border: `1.5px solid ${route.border}`,
              borderRadius: 'var(--radius)',
              padding: '18px 20px',
              textAlign: 'left',
              boxShadow: 'var(--shadow)',
              transition: 'transform 0.12s, box-shadow 0.12s',
              cursor: 'pointer',
              width: '100%',
            }}
            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.98)'}
            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{
              fontSize: 22,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: 10,
              boxShadow: 'var(--shadow)',
              flexShrink: 0,
              color: route.color,
            }}>{route.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 15,
                fontWeight: 600,
                color: route.color,
                lineHeight: 1.3,
                marginBottom: 2,
              }}>{route.label}</div>
              <div style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}>{route.sublabel}</div>
            </div>
            <span style={{
              marginLeft: 'auto',
              color: route.color,
              opacity: 0.5,
              fontSize: 18,
              flexShrink: 0,
            }}>›</span>
          </button>
        ))}
      </div>

      <div style={{
        marginTop: 36,
        padding: '20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
      }}>
        <p style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 10,
        }}>Learn the full picture</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'Algorithm', path: '/algorithm' },
            { label: 'Case Library', path: '/scenarios' },
            { label: 'Window Period', path: '/window' },
            { label: 'Quick Reference', path: '/reference' },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--primary-mid)',
                background: 'var(--primary-bg)',
                border: '1px solid var(--primary-border)',
                borderRadius: 6,
                padding: '6px 12px',
                cursor: 'pointer',
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      <p style={{
        marginTop: 24,
        fontSize: 11,
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        Based on CDC/APHL Recommended HIV Testing Algorithm (2014).
        Clinical decisions require professional judgment.
      </p>
    </div>
  )
}
