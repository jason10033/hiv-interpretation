import { useNavigate } from 'react-router-dom'

const MAIN_ROUTES = [
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
        {MAIN_ROUTES.map((route) => (
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

        {/* Lookup — at the bottom */}
        <button
          onClick={() => navigate('/lookup')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '18px 20px',
            textAlign: 'left',
            boxShadow: 'var(--shadow)',
            cursor: 'pointer',
            width: '100%',
            marginTop: 8,
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
            background: 'var(--primary-bg)',
            borderRadius: 10,
            boxShadow: 'var(--shadow)',
            flexShrink: 0,
            color: '#162447',
          }}>✓</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#162447', lineHeight: 1.3, marginBottom: 2 }}>
              I just want to know what to do
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Enter your results, get an interpretation
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#162447', opacity: 0.4, fontSize: 18, flexShrink: 0 }}>›</span>
        </button>
      </div>
    </div>
  )
}
