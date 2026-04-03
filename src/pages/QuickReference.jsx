const TYPE_STYLES = {
  reactive: { dot: 'var(--reactive-dot)', bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', text: 'var(--reactive)' },
  negative: { dot: 'var(--negative-dot)', bg: 'var(--negative-bg)', border: 'var(--negative-border)', text: 'var(--negative)' },
  indeterminate: { dot: 'var(--indeterminate-dot)', bg: 'var(--indeterminate-bg)', border: 'var(--indeterminate-border)', text: 'var(--indeterminate)' },
  info: { dot: 'var(--primary-mid)', bg: 'var(--primary-bg)', border: 'var(--primary-border)', text: 'var(--primary-mid)' },
}

const TABLE_ROWS = [
  {
    combo: 'Non-Reactive',
    hiv1: '—',
    hiv2: '—',
    rna: '—',
    interpretation: 'No HIV-1 or HIV-2 infection',
    detail: 'Report negative. If exposure within past 45 days, repeat at 45 days or offer HIV-1 RNA.',
    type: 'negative',
  },
  {
    combo: 'Reactive',
    hiv1: 'Reactive',
    hiv2: 'Nonreactive',
    rna: '—',
    interpretation: 'HIV-1 Infection',
    detail: 'Confirmed HIV-1. Order CD4 + viral load. Link to care.',
    type: 'reactive',
  },
  {
    combo: 'Reactive',
    hiv1: 'Nonreactive',
    hiv2: 'Reactive',
    rna: '—',
    interpretation: 'HIV-2 Infection',
    detail: 'Confirmed HIV-2. Send HIV-2 specific RNA assay. Specialist referral. NNRTIs are not effective.',
    type: 'info',
  },
  {
    combo: 'Reactive',
    hiv1: 'Reactive',
    hiv2: 'Reactive',
    rna: '—',
    interpretation: 'HIV-1 and/or HIV-2 Infection',
    detail: 'Both HIV-1 and HIV-2 antibodies detected. Rare coinfection possible. Confirm with type-specific NAT.',
    type: 'indeterminate',
  },
  {
    combo: 'Reactive',
    hiv1: 'Indeterminate or Nonreactive',
    hiv2: 'Nonreactive',
    rna: 'Reactive',
    interpretation: 'Acute HIV-1 Infection',
    detail: 'Antibodies not yet developed. Urgent linkage to care — extremely infectious. Immediate ART. Partner notification.',
    type: 'reactive',
  },
  {
    combo: 'Reactive',
    hiv1: 'Indeterminate or Nonreactive',
    hiv2: 'Nonreactive',
    rna: 'Nonreactive',
    interpretation: 'HIV Negative (false-positive Ag/Ab)',
    detail: 'Likely false-positive combo result. Document and reassure. No further HIV workup unless exposure changes. Consider HIV-2 NAT if risk factors present.',
    type: 'negative',
  },
]

export default function QuickReference() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>HIV Testing Algorithm</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Quick Reference Card</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Every result pattern mapped to interpretation and next step.</p>
      </div>

      {/* Main Results Table */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>All Result Combinations</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Based on CDC/APHL 2014 recommended laboratory algorithm.</p>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow)',
        }}>
          {/* Header row */}
          <div style={{ background: '#162447', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1.8fr' }}>
            {[
              { top: '4th-Gen Ag/Ab', bottom: 'Step 1' },
              { top: 'Diff. Assay', bottom: 'HIV-1 result' },
              { top: 'Diff. Assay', bottom: 'HIV-2 result' },
              { top: 'RNA NAAT', bottom: 'Step 3' },
              { top: 'Interpretation', bottom: '& next step' },
            ].map(({ top, bottom }, i) => (
              <div key={i} style={{ padding: '10px 10px', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)', marginBottom: 2 }}>{top}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>{bottom}</div>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {TABLE_ROWS.map((row, i) => {
            const s = TYPE_STYLES[row.type]
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1.8fr',
                  borderTop: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)',
                  borderLeft: `3px solid ${s.dot}`,
                }}
              >
                <div style={{ padding: '10px 10px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, fontWeight: row.combo === 'Reactive' ? 600 : 400, color: row.combo === 'Reactive' ? 'var(--reactive)' : 'var(--text-secondary)' }}>{row.combo}</span>
                </div>
                <div style={{ padding: '10px 10px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{row.hiv1}</span>
                </div>
                <div style={{ padding: '10px 10px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{row.hiv2}</span>
                </div>
                <div style={{ padding: '10px 10px', borderRight: '1px solid var(--border)' }}>
                  <span style={{
                    fontSize: 11,
                    color: row.rna === 'Reactive' ? 'var(--reactive)' : row.rna === 'Nonreactive' ? 'var(--negative)' : 'var(--text-muted)',
                    fontWeight: row.rna !== '—' ? 600 : 400,
                  }}>{row.rna}</span>
                </div>
                <div style={{ padding: '10px 10px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.text, marginBottom: 3 }}>{row.interpretation}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{row.detail}</div>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, paddingLeft: 4 }}>
          Source: CDC/APHL HIV-1/2 Laboratory Testing Algorithm (2014) · Branson BM et al. <em>MMWR</em> 2014;63(RR-03):1–10
        </p>
      </div>

      {/* Special situations */}
      <div style={{
        marginBottom: 28,
        padding: '16px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Special Situations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              title: 'Rapid (3rd-gen) vs. Lab-based (4th-gen) testing',
              text: 'Point-of-care rapid tests are usually 3rd-generation — they detect HIV antibodies only, with a longer window period (~23–90 days). Lab-based 4th-generation assays detect both p24 antigen and antibodies, shortening the window period to ~18–45 days. A reactive rapid test always requires confirmatory lab-based testing per the CDC algorithm. A negative rapid test in an acute exposure window does not rule out HIV.',
            },
            {
              title: 'Recent exposure (<45 days), negative result',
              text: 'A negative 4th-gen test does not rule out HIV within the window period. Repeat at 45 days from last exposure, or offer HIV-1 RNA testing if acute infection is suspected.',
            },
            {
              title: 'Known HIV-2 risk (West African origin, sexual contact with HIV-2 positive person)',
              text: 'Standard HIV-1 viral load assays do not reliably quantify HIV-2. Send an HIV-2 specific RNA assay. HIV-2 is inherently resistant to NNRTIs.',
            },
            {
              title: 'Patient on PrEP',
              text: 'Tenofovir/emtricitabine can blunt seroconversion. A person who acquires HIV on PrEP may show atypical patterns — prolonged indeterminate differentiation, lower viral loads. Maintain high suspicion and use RNA testing.',
            },
            {
              title: 'Infant / perinatal exposure',
              text: 'Maternal antibodies persist up to 18 months. Antibody-based tests are unreliable in infants <18 months. Use HIV-1 DNA PCR or RNA NAT at birth, 14–21 days, 1–2 months, and 4–6 months.',
            },
          ].map(({ title, text }, i, arr) => (
            <div key={title} style={{ paddingBottom: 10, borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '12px 14px',
        background: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 11,
        color: 'var(--text-muted)',
        lineHeight: 1.6,
      }}>
        Based on: Branson BM et al. <em>MMWR</em> 2014;63(RR-03):1–10 · Workowski KA et al. STI Treatment Guidelines 2021 · CDC Laboratory HIV Testing Algorithm. Not a substitute for clinical judgment.
      </div>
    </div>
  )
}
