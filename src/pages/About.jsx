const BRAND_RED = '#8B1A1A'
const BRAND_BLUE = '#5B9EC9'
const BRAND_DARK = '#162447'

export default function About() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 16px 56px' }}>

      {/* PTC Logo block */}
      <div style={{
        background: BRAND_DARK,
        borderRadius: 'var(--radius)',
        padding: '24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-md)',
      }}>
        <img
          src="https://nnptc.org/wp-content/uploads/2024/10/NYCSTD-SMall-HIV-Logo-2024_6Color_OL_Tranpnt.png"
          alt="NYC STI/HIV Prevention Training Center"
          style={{ height: 80, width: 'auto', display: 'block' }}
        />
      </div>

      {/* About this tool */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        marginBottom: 16,
        boxShadow: 'var(--shadow)',
      }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
          About This Tool
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
          This HIV test interpretation reference is brought to you by the <strong style={{ color: 'var(--text-primary)' }}>NYC STI/HIV Prevention Training Center</strong>, a CDC-funded regional training center serving New York, New Jersey, Puerto Rico, and the U.S. Virgin Islands.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          The tool is designed to support clinicians at the point of care in interpreting results from the CDC/APHL 2014 Recommended Laboratory HIV Testing Algorithm — providing both rapid lookup and durable clinical education in one place.
        </p>
      </div>

      {/* What's inside */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        marginBottom: 16,
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>What's included</h2>
        </div>
        {[
          { icon: '⬡', label: 'Interactive Algorithm', desc: 'Tap-to-expand nodes explaining each step of the CDC/APHL testing sequence' },
          { icon: '⊞', label: 'Clinical Case Library', desc: '5 canonical result patterns with tap-to-reveal interpretations and evidence-based rationale' },
          { icon: '◷', label: 'Window Period Explorer', desc: 'Interactive timeline showing when each test becomes detectable after exposure' },
          { icon: '≡', label: 'Quick Reference Card', desc: 'Every result combination mapped to interpretation and next step — built to bookmark' },
        ].map(({ icon, label, desc }) => (
          <div key={label} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, color: 'var(--primary-mid)', flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Clinical disclaimer */}
      <div style={{
        background: '#FFF8F0',
        border: '1px solid #FCD9A0',
        borderRadius: 'var(--radius-sm)',
        padding: '14px 16px',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#92400E', marginBottom: 6 }}>
          Clinical Disclaimer
        </div>
        <p style={{ fontSize: 12, color: '#78350F', lineHeight: 1.5 }}>
          This tool is intended as an educational reference for licensed clinicians. It does not replace clinical judgment. Results should always be interpreted in the context of individual patient history and risk. Based on CDC/APHL 2014 Recommended Laboratory HIV Testing Algorithm.
        </p>
      </div>

      {/* Link to PTC */}
      <a
        href="https://www.publichealth.columbia.edu/research/centers/new-york-city-sti-hiv-prevention-training-center"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          background: BRAND_DARK,
          color: 'white',
          borderRadius: 'var(--radius)',
          padding: '16px 20px',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Visit the NYC STI/HIV PTC</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Training, resources, and consultation for clinicians</div>
        </div>
        <span style={{ fontSize: 20, opacity: 0.7 }}>→</span>
      </a>
    </div>
  )
}
