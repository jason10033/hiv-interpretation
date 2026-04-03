import { useState } from 'react'

const SCENARIOS = [
  {
    id: 1,
    title: 'Classic Reactive',
    tag: 'HIV-1 Confirmed',
    tagType: 'reactive',
    context: '34-year-old man presents for routine HIV testing. No prior testing history. Reports a male partner in the past year.',
    results: [
      { test: 'HIV-1/2 Ag/Ab Combo (4th gen)', result: 'REACTIVE', type: 'reactive' },
      { test: 'HIV-1/2 Antibody Differentiation', result: 'HIV-1 REACTIVE', type: 'reactive' },
      { test: 'HIV-1 NAT / RNA', result: 'Not performed', type: 'neutral' },
    ],
    interpretation: 'HIV-1 infection confirmed. HIV-1 antibodies detected.',
    rationale: 'A reactive 4th-gen test followed by a reactive HIV-1 differentiation assay confirms HIV-1 infection. NAT is not required when differentiation is definitive. This is the most common result pattern.',
    source: 'CDC/APHL 2014 Algorithm, Step 1 → Step 2',
    nextSteps: 'Refer to HIV care. Order CD4 count and HIV-1 viral load. Offer partner services.',
  },
  {
    id: 2,
    title: 'Acute HIV',
    tag: 'Acute HIV-1',
    tagType: 'reactive',
    context: '22-year-old woman presents with 5-day history of fever, pharyngitis, and diffuse lymphadenopathy. Last unprotected sex 18 days ago.',
    results: [
      { test: 'HIV-1/2 Ag/Ab Combo (4th gen)', result: 'REACTIVE', type: 'reactive' },
      { test: 'HIV-1/2 Antibody Differentiation', result: 'NEGATIVE (indeterminate pattern)', type: 'indeterminate' },
      { test: 'HIV-1 NAT / RNA', result: 'REACTIVE — 2,400,000 copies/mL', type: 'reactive' },
    ],
    interpretation: 'Acute HIV-1 infection. Patient is in the window period before full seroconversion.',
    rationale: 'The p24 antigen triggered the 4th-gen test. Antibodies have not yet fully formed, so differentiation is negative/indeterminate. A reactive NAT confirms active viral replication. This is the classic acute HIV pattern — patients are highly infectious at this stage.',
    source: 'Fiebig EW et al. AIDS 2003; Branson et al. MMWR 2014',
    nextSteps: 'Urgent HIV care referral. Extremely high viral load means high transmission risk. Offer immediate ART initiation. Discuss partner notification.',
  },
  {
    id: 3,
    title: 'False Positive',
    tag: 'HIV Negative',
    tagType: 'negative',
    context: '28-year-old pregnant woman. HIV test ordered at first prenatal visit. No risk factors reported. Feels well.',
    results: [
      { test: 'HIV-1/2 Ag/Ab Combo (4th gen)', result: 'REACTIVE', type: 'reactive' },
      { test: 'HIV-1/2 Antibody Differentiation', result: 'NEGATIVE', type: 'negative' },
      { test: 'HIV-1 NAT / RNA', result: 'NONREACTIVE (undetectable)', type: 'negative' },
    ],
    interpretation: 'HIV-1/HIV-2 negative. Initial reactive result was a false positive.',
    rationale: 'Reactive 4th-gen tests with a negative differentiation and negative RNA are interpreted as HIV-negative. False positives on combo tests occur in ~0.5% of low-risk individuals. Pregnancy is a known cause of biologic false positivity on immunoassays due to polyclonal B-cell activation.',
    source: 'Styer LM et al. J Clin Virol 2011; CDC MMWR 2014',
    nextSteps: 'Reassure patient. Document false-positive result. No further HIV workup needed unless exposure history changes. Routine prenatal care continues.',
  },
  {
    id: 4,
    title: 'Indeterminate + RNA Positive',
    tag: 'Likely HIV-1',
    tagType: 'indeterminate',
    context: '31-year-old man, known injection drug user, presents to the ED. Records show a prior negative HIV test 8 months ago.',
    results: [
      { test: 'HIV-1/2 Ag/Ab Combo (4th gen)', result: 'REACTIVE', type: 'reactive' },
      { test: 'HIV-1/2 Antibody Differentiation', result: 'INDETERMINATE (bands for both HIV-1 and HIV-2)', type: 'indeterminate' },
      { test: 'HIV-1 NAT / RNA', result: 'REACTIVE — 48,000 copies/mL', type: 'reactive' },
    ],
    interpretation: 'Consistent with HIV-1 infection. Indeterminate differentiation with positive RNA most likely represents HIV-1 with cross-reactive antibodies.',
    rationale: 'When both HIV-1 and HIV-2 bands are present on the differentiation assay, the result is called indeterminate. A positive HIV-1 RNA in this setting strongly favors HIV-1. HIV-2 is rare in the US and in PWID populations. The algorithm designates this as "HIV-positive, HIV type undetermined" pending confirmatory testing.',
    source: 'CDC MMWR 2014; Nasrullah et al. J Infect Dis 2011',
    nextSteps: 'Treat as HIV-1 until proven otherwise. Start ART. Send confirmatory HIV-2 testing if clinically needed. Report per jurisdiction requirements.',
  },
  {
    id: 5,
    title: 'HIV-2 Infection',
    tag: 'HIV-2 Detected',
    tagType: 'info',
    context: '45-year-old man, originally from West Africa, presents for routine testing. Has lived in the US for 12 years. No symptoms.',
    results: [
      { test: 'HIV-1/2 Ag/Ab Combo (4th gen)', result: 'REACTIVE', type: 'reactive' },
      { test: 'HIV-1/2 Antibody Differentiation', result: 'HIV-2 REACTIVE', type: 'info' },
      { test: 'HIV-1 NAT / RNA', result: 'Not performed', type: 'neutral' },
    ],
    interpretation: 'HIV-2 antibodies detected. Consistent with HIV-2 infection.',
    rationale: 'HIV-2 is endemic in West Africa. The differentiation assay uses separate antigens for HIV-1 and HIV-2 and can distinguish them. HIV-2 has a slower natural history but standard HIV-1 RNA assays do not reliably quantify HIV-2. Send HIV-2 RNA if available.',
    source: 'Gottlieb GS et al. Lancet Infect Dis 2008; CDC 2014',
    nextSteps: 'Refer to HIV specialist experienced with HIV-2. Order HIV-2 RNA (specific assay required — standard HIV-1 viral load is unreliable). CD4 count. NNRTIs are not effective against HIV-2.',
  },
]

const TAG_STYLES = {
  reactive: { bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', color: 'var(--reactive)' },
  negative: { bg: 'var(--negative-bg)', border: 'var(--negative-border)', color: 'var(--negative)' },
  indeterminate: { bg: 'var(--indeterminate-bg)', border: 'var(--indeterminate-border)', color: 'var(--indeterminate)' },
  info: { bg: 'var(--primary-bg)', border: 'var(--primary-border)', color: 'var(--primary-mid)' },
  neutral: { bg: '#F8FAFC', border: 'var(--border)', color: 'var(--text-muted)' },
}

function ResultRow({ test, result, type }) {
  const s = TAG_STYLES[type] || TAG_STYLES.neutral
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px',
      borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.3, flex: 1 }}>{test}</span>
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 6,
        padding: '3px 8px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>{result}</span>
    </div>
  )
}

function ScenarioCard({ scenario }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>
            Case {scenario.id} of {SCENARIOS.length}
          </div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{scenario.title}</h2>
        </div>
        {(() => {
          const s = TAG_STYLES[scenario.tagType]
          return (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: s.color,
              background: s.bg,
              border: `1px solid ${s.border}`,
              borderRadius: 20,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>{scenario.tag}</span>
          )
        })()}
      </div>

      {/* Clinical context */}
      <div style={{ padding: '14px 16px', background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{scenario.context}</p>
      </div>

      {/* Lab report */}
      <div>
        <div style={{ padding: '8px 14px 4px', background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Laboratory Results</span>
        </div>
        {scenario.results.map((r, i) => (
          <ResultRow key={i} {...r} />
        ))}
      </div>

      {/* Reveal prompt / interpretation */}
      {!revealed ? (
        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>
            What is your interpretation?
          </p>
          <button
            onClick={() => setRevealed(true)}
            style={{
              width: '100%',
              background: '#0F172A',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '13px 20px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Reveal Interpretation
          </button>
        </div>
      ) : (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Interpretation */}
          <div style={{
            padding: '14px',
            background: TAG_STYLES[scenario.tagType].bg,
            border: `1.5px solid ${TAG_STYLES[scenario.tagType].border}`,
            borderRadius: 'var(--radius-sm)',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: TAG_STYLES[scenario.tagType].color, marginBottom: 6 }}>Interpretation</div>
            <p style={{ fontSize: 14, fontWeight: 600, color: TAG_STYLES[scenario.tagType].color, lineHeight: 1.4 }}>{scenario.interpretation}</p>
          </div>

          {/* Rationale */}
          <div style={{ padding: '14px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 6 }}>Rationale</div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{scenario.rationale}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Source: {scenario.source}</p>
          </div>

          {/* Next steps */}
          <div style={{ padding: '14px', background: 'var(--primary-bg)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-mid)', marginBottom: 6 }}>Recommended Next Steps</div>
            <p style={{ fontSize: 13, color: 'var(--primary)', lineHeight: 1.6 }}>{scenario.nextSteps}</p>
          </div>

          <button
            onClick={() => setRevealed(false)}
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '8px',
              cursor: 'pointer',
            }}
          >Reset case</button>
        </div>
      )}
    </div>
  )
}

export default function Scenarios() {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>5 canonical patterns</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Clinical Scenario Library</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Read the case and lab results, form your interpretation, then reveal the answer with evidence-based rationale.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {SCENARIOS.map(s => <ScenarioCard key={s.id} scenario={s} />)}
      </div>
    </div>
  )
}
