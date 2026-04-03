import { useState } from 'react'

const NODE_INFO = {
  test1: {
    title: '4th-Generation HIV-1/2 Ag/Ab Combination Immunoassay',
    detects: 'HIV-1 p24 antigen and antibodies to both HIV-1 and HIV-2.',
    reactive: 'A reactive result means antigen or antibody (or both) were detected. It does not yet confirm infection — all reactive results require step 2.',
    falsePositive: 'False-positive rate: ~0.5% in low-prevalence populations. Causes include autoimmune disease, recent flu vaccine, pregnancy, and lab error.',
    source: 'Branson et al., MMWR 2014; 63(RR-03)',
  },
  test2: {
    title: 'HIV-1/HIV-2 Antibody Differentiation Immunoassay',
    detects: 'IgG antibodies specifically against HIV-1 vs HIV-2 antigens using a multispot or similar assay.',
    reactive: 'A reactive result for HIV-1 or HIV-2 is evidence of HIV infection. A non-differentiating or indeterminate result requires step 3.',
    falsePositive: 'Indeterminate differentiation most often indicates early HIV-1 seroconversion (antibodies forming but not yet fully differentiated), not HIV-2.',
    source: 'Masciotra et al., J Clin Virol 2011',
  },
  test3: {
    title: 'HIV-1 NAT (Nucleic Acid Test / RNA)',
    detects: 'HIV-1 viral RNA. Detectable approximately 10–14 days after exposure, before antibodies form. Both qualitative and quantitative (viral load) NATs are acceptable per CDC guidelines — use whichever is available.',
    reactive: 'A reactive NAT after an indeterminate differentiation assay indicates acute HIV-1 infection — the window period before full seroconversion.',
    falsePositive: 'False-positive NAT: ~0.01–0.1%. A negative NAT after reactive Ag/Ab and non-reactive differentiation = most likely a false-positive combo test.',
    source: 'Fiebig et al., AIDS 2003',
  },
}

function InfoPanel({ nodeKey, onClose }) {
  const info = NODE_INFO[nodeKey]
  if (!info) return null
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginTop: 8,
      boxShadow: 'var(--shadow-md)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{info.title}</h3>
        <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: 18, flexShrink: 0, padding: '0 4px', cursor: 'pointer' }}>×</button>
      </div>
      {[
        { label: 'Detects', text: info.detects },
        { label: 'Reactive result means', text: info.reactive },
        { label: 'False positives', text: info.falsePositive },
      ].map(({ label, text }) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 3 }}>{label}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 10, marginTop: 4 }}>
        Source: {info.source}
      </div>
    </div>
  )
}

function TestNode({ nodeKey, step, label, activeNode, onToggle }) {
  const isOpen = activeNode === nodeKey
  return (
    <div>
      <button
        onClick={() => onToggle(isOpen ? null : nodeKey)}
        style={{
          width: '100%',
          background: isOpen ? '#0F172A' : 'var(--surface)',
          border: `2px solid ${isOpen ? '#0F172A' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          cursor: 'pointer',
          textAlign: 'left',
          boxShadow: 'var(--shadow-md)',
          transition: 'all 0.15s',
        }}
      >
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: isOpen ? 'rgba(255,255,255,0.15)' : 'var(--primary-bg)',
          border: `2px solid ${isOpen ? 'rgba(255,255,255,0.3)' : 'var(--primary-border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: isOpen ? 'white' : 'var(--primary-mid)',
          flexShrink: 0,
        }}>{step}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: isOpen ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', marginBottom: 2 }}>
            Step {step}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: isOpen ? 'white' : 'var(--text-primary)', lineHeight: 1.3 }}>{label}</div>
        </div>
        <span style={{ marginLeft: 'auto', color: isOpen ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', fontSize: 12, flexShrink: 0 }}>
          {isOpen ? 'close' : 'info'}
        </span>
      </button>
      {isOpen && <InfoPanel nodeKey={nodeKey} onClose={() => onToggle(null)} />}
    </div>
  )
}

function ResultBadge({ label, type }) {
  const styles = {
    negative: { bg: 'var(--negative-bg)', border: 'var(--negative-border)', color: 'var(--negative)', dot: 'var(--negative-dot)' },
    reactive: { bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', color: 'var(--reactive)', dot: 'var(--reactive-dot)' },
    indeterminate: { bg: 'var(--indeterminate-bg)', border: 'var(--indeterminate-border)', color: 'var(--indeterminate)', dot: 'var(--indeterminate-dot)' },
    info: { bg: 'var(--primary-bg)', border: 'var(--primary-border)', color: 'var(--primary-mid)', dot: 'var(--primary-mid)' },
  }
  const s = styles[type] || styles.indeterminate
  return (
    <div style={{
      background: s.bg,
      border: `1.5px solid ${s.border}`,
      borderRadius: 'var(--radius-sm)',
      padding: '10px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: s.color, lineHeight: 1.3 }}>{label}</span>
    </div>
  )
}

// Vertical pipe connecting to next step
function CascadePipe({ label, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}>
      <div style={{ width: 3, height: 14, background: color }} />
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color,
        padding: '2px 10px',
        background: 'white',
        border: `1.5px solid ${color}`,
        borderRadius: 20,
        margin: '2px 0',
      }}>{label}</div>
      <div style={{ width: 3, height: 14, background: color }} />
    </div>
  )
}

export default function Algorithm() {
  const [activeNode, setActiveNode] = useState(null)

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Interactive</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>CDC/APHL Recommended Algorithm</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Tap any test node to learn what it detects and why it exists in the sequence.</p>
      </div>

      {/* ── STEP 1 ── */}
      <TestNode nodeKey="test1" step={1} label="HIV-1/2 Ag/Ab Combination Immunoassay (4th gen)" activeNode={activeNode} onToggle={setActiveNode} />

      {/* Branch after step 1: Reactive LEFT, Non-reactive RIGHT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '6px 0' }}>

        {/* LEFT: Reactive → continues down */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CascadePipe label="Reactive" color="var(--reactive-border)" />
          <div style={{
            width: '100%',
            padding: '8px 10px',
            background: 'var(--reactive-bg)',
            border: '1.5px solid var(--reactive-border)',
            borderRadius: 8,
            textAlign: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--reactive)' }}>↓ Proceed to Step 2</span>
          </div>
        </div>

        {/* RIGHT: Non-reactive → terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CascadePipe label="Non-reactive" color="var(--negative-border)" />
          <ResultBadge label="HIV-1/HIV-2 Negative" type="negative" />
          <div style={{ marginTop: 6, padding: '6px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Report negative. If exposure within 45 days, consider RNA or retest at 45 days.
            </p>
          </div>
        </div>
      </div>

      {/* ── STEP 2 ── */}
      <TestNode nodeKey="test2" step={2} label="HIV-1/HIV-2 Antibody Differentiation Immunoassay" activeNode={activeNode} onToggle={setActiveNode} />

      {/* Branch after step 2 — all three outcomes in one row */}
      <div style={{ margin: '6px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>

          {/* HIV-1 reactive — terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CascadePipe label="HIV-1 +" color="var(--reactive-border)" />
            <div style={{
              width: '100%',
              background: 'var(--reactive-bg)',
              border: '1.5px solid var(--reactive-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 8px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--reactive-dot)', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--reactive)', lineHeight: 1.2, textAlign: 'center' }}>HIV-1 Detected</span>
              </div>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'white',
                background: 'var(--reactive)',
                borderRadius: 4,
                padding: '2px 6px',
              }}>Algorithm ends</span>
            </div>
          </div>

          {/* HIV-2 reactive — terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CascadePipe label="HIV-2 +" color="var(--primary-border)" />
            <div style={{
              width: '100%',
              background: 'var(--primary-bg)',
              border: '1.5px solid var(--primary-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 8px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary-mid)', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary-mid)', lineHeight: 1.2, textAlign: 'center' }}>HIV-2 Detected</span>
              </div>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'white',
                background: 'var(--primary-mid)',
                borderRadius: 4,
                padding: '2px 6px',
              }}>Algorithm ends</span>
            </div>
          </div>

          {/* Neg/Indeterminate — continues to step 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CascadePipe label="Neg / Indet" color="var(--indeterminate-border)" />
            <div style={{
              width: '100%',
              background: 'var(--indeterminate-bg)',
              border: '1.5px solid var(--indeterminate-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 8px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--indeterminate)', lineHeight: 1.2, textAlign: 'center' }}>Not differentiated</span>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--indeterminate)',
                background: 'white',
                border: '1px solid var(--indeterminate-border)',
                borderRadius: 4,
                padding: '2px 6px',
              }}>↓ Step 3</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── STEP 3 ── */}
      <TestNode nodeKey="test3" step={3} label="HIV-1 NAT (Nucleic Acid Test / RNA)" activeNode={activeNode} onToggle={setActiveNode} />

      {/* Branch after step 3: Reactive LEFT, Non-reactive RIGHT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>

        {/* LEFT: Reactive → Acute HIV */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <CascadePipe label="Reactive" color="var(--reactive-border)" />
          <ResultBadge label="Acute HIV-1 Infection" type="reactive" />
          <div style={{ padding: '8px 10px', background: 'var(--reactive-bg)', border: '1px solid var(--reactive-border)', borderRadius: 8, marginTop: 2 }}>
            <p style={{ fontSize: 10, color: 'var(--reactive)', lineHeight: 1.4 }}>High viral load, highly infectious. Link to care urgently.</p>
          </div>
        </div>

        {/* RIGHT: Non-reactive → Negative */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <CascadePipe label="Non-reactive" color="var(--indeterminate-border)" />
          <ResultBadge label="Negative / Indeterminate" type="indeterminate" />
          <div style={{ padding: '8px 10px', background: 'var(--indeterminate-bg)', border: '1px solid var(--indeterminate-border)', borderRadius: 8, marginTop: 2 }}>
            <p style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>Likely false-positive combo test. If concern for very recent exposure, retest in 2–4 weeks.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, padding: '14px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--text-secondary)' }}>Source:</strong> Branson BM et al. Revised Recommendations for HIV Testing. <em>MMWR</em> 2014;63(RR-03):1–10. CDC/APHL 2014 Recommended Laboratory HIV Testing Algorithm.
      </div>
    </div>
  )
}
