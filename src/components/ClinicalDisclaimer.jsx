export default function ClinicalDisclaimer() {
  return (
    <div style={{
      marginTop: 28,
      padding: '12px 16px',
      background: '#FFF8F0',
      border: '1px solid #FCD9A0',
      borderRadius: 'var(--radius-sm)',
      fontSize: 11,
      lineHeight: 1.6,
    }}>
      <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#92400E' }}>
        Clinical Disclaimer:{' '}
      </span>
      <span style={{ color: '#78350F' }}>
        This tool is intended as an educational reference for licensed clinicians. It does not replace clinical judgment. Results should always be interpreted in the context of individual patient history.
      </span>
    </div>
  )
}
