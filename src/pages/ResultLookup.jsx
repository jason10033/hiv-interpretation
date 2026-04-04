import { useState } from 'react'

const BRAND_DARK = '#162447'

const RESULTS = {
  idConsult: {
    type: 'indeterminate',
    title: 'Atypical Result Pattern — ID Consult Recommended',
    body: 'This combination of results does not fit a standard algorithm pathway.',
    next: 'Consult an Infectious Disease specialist or HIV expert. Document all results carefully. Consider HIV-2 specific testing, repeat testing in 2-4 weeks, and review for unusual clinical circumstances (e.g. recent immunization, autoimmune disease, prior HIV treatment).',
  },
  negative: {
    type: 'negative',
    title: 'HIV Negative',
    body: 'No HIV-1 or HIV-2 infection detected.',
    next: 'Report negative. If exposure was within the past 45 days, repeat testing at 45 days or offer HIV-1 RNA now.',
  },
  hiv1: {
    type: 'reactive',
    title: 'HIV-1 Infection',
    body: 'HIV-1 antibodies confirmed.',
    next: 'Order CD4 count and viral load. Link to HIV care. Report per jurisdiction requirements.',
  },
  hiv2: {
    type: 'info',
    title: 'HIV-2 Infection',
    body: 'HIV-2 antibodies confirmed.',
    next: 'Refer to HIV specialist. Order HIV-2 specific RNA (standard HIV-1 viral load is unreliable for HIV-2). NNRTIs are not effective against HIV-2.',
  },
  coinfection: {
    type: 'indeterminate',
    title: 'HIV-1 and/or HIV-2 Infection',
    body: 'Both HIV-1 and HIV-2 antibodies detected. Rare coinfection possible.',
    next: 'Proceed to HIV-1 RNA. Treat as HIV-1 until type-specific NAT confirms. Specialist referral recommended.',
  },
  acute: {
    type: 'reactive',
    title: 'Acute HIV-1 Infection',
    body: 'HIV-1 RNA detected before full seroconversion. Patient is in the window period.',
    next: 'Urgent linkage to care. Extremely high transmission risk. Initiate ART immediately. Discuss partner notification.',
  },
  falsePositive: {
    type: 'negative',
    title: 'HIV Negative (False-Positive Ag/Ab)',
    body: 'Reactive Ag/Ab with negative differentiation and negative RNA is interpreted as HIV-negative.',
    next: 'Document false positive. Reassure patient. No further HIV workup unless exposure history changes. If concern for very recent exposure, retest in 2-4 weeks.',
  },
}

const RESULT_STYLES = {
  reactive: { bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', dot: 'var(--reactive-dot)', text: 'var(--reactive)' },
  negative: { bg: 'var(--negative-bg)', border: 'var(--negative-border)', dot: 'var(--negative-dot)', text: 'var(--negative)' },
  indeterminate: { bg: 'var(--indeterminate-bg)', border: 'var(--indeterminate-border)', dot: 'var(--indeterminate-dot)', text: 'var(--indeterminate)' },
  info: { bg: 'var(--primary-bg)', border: 'var(--primary-border)', dot: 'var(--primary-mid)', text: 'var(--primary-mid)' },
}

function getResult(s1, s2hiv1, s2hiv2, s3) {
  if (s1 === 'nonreactive') return RESULTS.negative
  if (s2hiv1 === null || s2hiv2 === null) return null
  if (s2hiv1 === 'reactive' && s2hiv2 === 'nonreactive') return RESULTS.hiv1
  if (s2hiv1 === 'nonreactive' && s2hiv2 === 'reactive') return RESULTS.hiv2
  if (s2hiv1 === 'reactive' && s2hiv2 === 'reactive') return RESULTS.coinfection
  if (needsRNA(s2hiv1, s2hiv2)) {
    if (s3 === 'reactive') return RESULTS.acute
    if (s3 === 'nonreactive') return RESULTS.falsePositive
    return null // waiting for RNA input
  }
  // Any other combination (e.g. indeterminate HIV-1 + reactive HIV-2)
  return RESULTS.idConsult
}

function needsRNA(s2hiv1, s2hiv2) {
  return (s2hiv1 === 'indeterminate' || s2hiv1 === 'nonreactive') && s2hiv2 === 'nonreactive'
}

function OptionButton({ label, selected, onClick, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '14px 10px',
        borderRadius: 10,
        border: selected ? `2px solid ${color}` : '2px solid var(--border)',
        background: selected ? color : 'var(--surface)',
        color: selected ? 'white' : 'var(--text-secondary)',
        fontWeight: 700,
        fontSize: 13,
        cursor: 'pointer',
        transition: 'all 0.12s',
        opacity: selected === false ? 0.45 : 1,
      }}
    >
      {label}
    </button>
  )
}

function StepCard({ number, title, children }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{
        background: BRAND_DARK,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
        }}>{number}</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{title}</span>
      </div>
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  )
}

export default function ResultLookup() {
  const [s1, setS1] = useState(null)
  const [s2hiv1, setS2hiv1] = useState(null)
  const [s2hiv2, setS2hiv2] = useState(null)
  const [s3, setS3] = useState(null)

  const showStep2 = s1 === 'reactive'
  const showStep3 = showStep2 && s2hiv1 !== null && s2hiv2 !== null && needsRNA(s2hiv1, s2hiv2)
  const result = getResult(s1, s2hiv1, s2hiv2, s3)

  function reset() {
    setS1(null); setS2hiv1(null); setS2hiv2(null); setS3(null)
  }

  function handleS1(val) {
    setS1(val); setS2hiv1(null); setS2hiv2(null); setS3(null)
  }
  function handleS2hiv1(val) {
    setS2hiv1(val); setS2hiv2(null); setS3(null)
  }
  function handleS2hiv2(val) {
    setS2hiv2(val); setS3(null)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Step-by-step</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>What do your results show?</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Select each result as it comes in. Interpretation appears automatically.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Step 1 */}
        <StepCard number={1} title="4th-Gen Ag/Ab Combination Immunoassay">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>What was the result?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <OptionButton
              label="Reactive"
              selected={s1 === null ? null : s1 === 'reactive'}
              onClick={() => handleS1('reactive')}
              color="var(--reactive)"
            />
            <OptionButton
              label="Nonreactive"
              selected={s1 === null ? null : s1 === 'nonreactive'}
              onClick={() => handleS1('nonreactive')}
              color="var(--negative)"
            />
          </div>
        </StepCard>

        {/* Step 2 */}
        {showStep2 && (
          <StepCard number={2} title="HIV-1/HIV-2 Antibody Differentiation Assay">
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>HIV-1 result</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <OptionButton label="Reactive" selected={s2hiv1 === null ? null : s2hiv1 === 'reactive'} onClick={() => handleS2hiv1('reactive')} color="var(--reactive)" />
                <OptionButton label="Indeterminate" selected={s2hiv1 === null ? null : s2hiv1 === 'indeterminate'} onClick={() => handleS2hiv1('indeterminate')} color="var(--indeterminate)" />
                <OptionButton label="Nonreactive" selected={s2hiv1 === null ? null : s2hiv1 === 'nonreactive'} onClick={() => handleS2hiv1('nonreactive')} color="var(--negative)" />
              </div>
            </div>
            {s2hiv1 !== null && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>HIV-2 result</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <OptionButton label="Reactive" selected={s2hiv2 === null ? null : s2hiv2 === 'reactive'} onClick={() => handleS2hiv2('reactive')} color="var(--reactive)" />
                  <OptionButton label="Nonreactive" selected={s2hiv2 === null ? null : s2hiv2 === 'nonreactive'} onClick={() => handleS2hiv2('nonreactive')} color="var(--negative)" />
                </div>
              </div>
            )}
          </StepCard>
        )}

        {/* Step 3 */}
        {showStep3 && (
          <StepCard number={3} title="HIV-1 RNA NAAT">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>What was the result?</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <OptionButton label="Reactive" selected={s3 === null ? null : s3 === 'reactive'} onClick={() => setS3('reactive')} color="var(--reactive)" />
              <OptionButton label="Nonreactive" selected={s3 === null ? null : s3 === 'nonreactive'} onClick={() => setS3('nonreactive')} color="var(--negative)" />
            </div>
          </StepCard>
        )}

        {/* Result */}
        {result && (() => {
          const s = RESULT_STYLES[result.type]
          return (
            <div style={{
              background: s.bg,
              border: `2px solid ${s.border}`,
              borderRadius: 'var(--radius)',
              padding: '20px',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 17, fontWeight: 700, color: s.text }}>{result.title}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{result.body}</p>
              <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.text, marginBottom: 5 }}>Recommended next steps</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{result.next}</p>
              </div>
            </div>
          )
        })()}

        {/* Reset */}
        {s1 !== null && (
          <button
            onClick={reset}
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              cursor: 'pointer',
              marginTop: 4,
            }}
          >
            Start over
          </button>
        )}
      </div>

      <p style={{ marginTop: 28, fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Based on CDC/APHL 2014 Recommended Laboratory HIV Testing Algorithm. Not a substitute for clinical judgment.
      </p>
    </div>
  )
}
