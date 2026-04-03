const ROWS = [
  {
    combo: 'Nonreactive',
    diff: '—',
    nat: '—',
    interpretation: 'HIV-1/HIV-2 Negative',
    nextStep: 'Report negative. If <45 days from exposure, consider RNA or retest at 45 days.',
    type: 'negative',
  },
  {
    combo: 'Reactive',
    diff: 'HIV-1 Reactive',
    nat: 'Not performed',
    interpretation: 'HIV-1 Antibodies Detected',
    nextStep: 'Confirmed HIV-1. Order CD4 + viral load. Link to care.',
    type: 'reactive',
  },
  {
    combo: 'Reactive',
    diff: 'HIV-2 Reactive',
    nat: 'Not performed',
    interpretation: 'HIV-2 Antibodies Detected',
    nextStep: 'Confirmed HIV-2. HIV-2 RNA (specific assay). Specialist referral. NNRTIs ineffective.',
    type: 'info',
  },
  {
    combo: 'Reactive',
    diff: 'HIV-1 (+) and HIV-2 (+)',
    nat: 'Not performed',
    interpretation: 'Differentiated HIV-1/HIV-2 (both reactive)',
    nextStep: 'Proceed to HIV-1 NAT. Concurrent HIV-1/2 infection possible but rare.',
    type: 'indeterminate',
  },
  {
    combo: 'Reactive',
    diff: 'Negative',
    nat: 'Reactive',
    interpretation: 'Acute HIV-1 Infection',
    nextStep: 'Urgent linkage to care. Extremely infectious. Immediate ART. Partner notification.',
    type: 'reactive',
  },
  {
    combo: 'Reactive',
    diff: 'Negative',
    nat: 'Nonreactive',
    interpretation: 'HIV-1/HIV-2 Negative (false-positive combo)',
    nextStep: 'Document false positive. No further HIV workup unless exposure changes.',
    type: 'negative',
  },
  {
    combo: 'Reactive',
    diff: 'Indeterminate (both bands)',
    nat: 'Reactive',
    interpretation: 'HIV-positive, type undetermined (likely HIV-1)',
    nextStep: 'Treat as HIV-1. Confirmatory HIV-2 testing if indicated. Report per jurisdiction.',
    type: 'indeterminate',
  },
  {
    combo: 'Reactive',
    diff: 'Indeterminate (both bands)',
    nat: 'Nonreactive',
    interpretation: 'HIV-positive, type undetermined',
    nextStep: 'Repeat testing in 2–4 weeks. Consult HIV specialist.',
    type: 'indeterminate',
  },
]

const TYPE_STYLES = {
  reactive: { dot: 'var(--reactive-dot)', bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', text: 'var(--reactive)' },
  negative: { dot: 'var(--negative-dot)', bg: 'var(--negative-bg)', border: 'var(--negative-border)', text: 'var(--negative)' },
  indeterminate: { dot: 'var(--indeterminate-dot)', bg: 'var(--indeterminate-bg)', border: 'var(--indeterminate-border)', text: 'var(--indeterminate)' },
  info: { dot: 'var(--primary-mid)', bg: 'var(--primary-bg)', border: 'var(--primary-border)', text: 'var(--primary-mid)' },
}

function ReferenceRow({ row }) {
  const s = TYPE_STYLES[row.type]
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid var(--border)`,
      borderLeft: `3px solid ${s.dot}`,
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
    }}>
      {/* Tests */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: 'var(--background)',
        borderBottom: '1px solid var(--border)',
      }}>
        {[
          { label: '4th-Gen Ag/Ab', value: row.combo },
          { label: 'Differentiation', value: row.diff },
          { label: 'HIV-1 NAT', value: row.nat },
        ].map(({ label, value }) => (
          <div key={label} style={{ padding: '8px 10px', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{value}</div>
          </div>
        ))}
      </div>
      {/* Interpretation + Next step */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0, marginTop: 4 }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: s.text, lineHeight: 1.3 }}>{row.interpretation}</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, paddingLeft: 16 }}>{row.nextStep}</p>
      </div>
    </div>
  )
}

export default function QuickReference() {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>HIV Testing Algorithm</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Quick Reference Card</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Every result pattern mapped to interpretation and next step. Bookmark this page.</p>
      </div>

      {/* Differentiation Assay Table — TOP */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Differentiation Assay Interpretation</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>CDC reference table — step 2 result patterns and their meaning.</p>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow)',
        }}>
          {/* Header row */}
          <div style={{ background: '#162447', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.6fr' }}>
            <div style={{ padding: '10px 12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>4th-Gen Ag/Ab</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>Immunoassay</div>
            </div>
            <div style={{ padding: '10px 12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Differentiation</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>HIV-1 result</div>
            </div>
            <div style={{ padding: '10px 12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Differentiation</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>HIV-2 result</div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Interpretation</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>& next step</div>
            </div>
          </div>

          {/* Data rows */}
          {[
            {
              combo: 'Non-Reactive',
              hiv1: '—',
              hiv2: '—',
              interpretation: 'No HIV-1 or HIV-2 infection',
              detail: 'Unless individual has had HIV exposure in past 45 days.',
              type: 'negative',
            },
            {
              combo: 'Reactive',
              hiv1: 'Reactive',
              hiv2: 'Nonreactive',
              interpretation: 'HIV-1 Infection',
              detail: 'Confirmed HIV-1. Order CD4 + viral load. Link to care.',
              type: 'reactive',
            },
            {
              combo: 'Reactive',
              hiv1: 'Nonreactive',
              hiv2: 'Reactive',
              interpretation: 'HIV-2 Infection',
              detail: 'Confirmed HIV-2. Requires HIV-2 specific RNA assay. Specialist referral. NNRTIs are not effective.',
              type: 'info',
            },
            {
              combo: 'Reactive',
              hiv1: 'Reactive',
              hiv2: 'Reactive',
              interpretation: 'HIV-1 and HIV-2 Coinfection',
              detail: 'Both HIV-1 and HIV-2 antibodies detected. Rare. Confirm with type-specific NAT.',
              type: 'indeterminate',
            },
            {
              combo: 'Reactive',
              hiv1: 'Indeterminate or Nonreactive',
              hiv2: 'Nonreactive',
              interpretation: 'HIV-1 RNA indicated',
              detail: 'If RNA positive → Acute HIV-1. If RNA negative → likely false-positive combo result. In persons with HIV-2 risk factors, consider HIV-2 NAT.',
              type: 'indeterminate',
              wide: true,
            },
          ].map((row, i) => {
            const s = TYPE_STYLES[row.type]
            return (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1.6fr',
                  borderTop: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)',
                  borderLeft: `3px solid ${s.dot}`,
                }}
              >
                <div style={{ padding: '10px 12px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, fontWeight: row.combo === 'Reactive' ? 600 : 400, color: row.combo === 'Reactive' ? 'var(--reactive)' : 'var(--text-secondary)' }}>{row.combo}</span>
                </div>
                <div style={{ padding: '10px 12px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.hiv1}</span>
                </div>
                <div style={{ padding: '10px 12px', borderRight: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{row.hiv2}</span>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.text, marginBottom: 3 }}>{row.interpretation}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{row.detail}</div>
                </div>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, paddingLeft: 4 }}>
          Source: CDC/APHL HIV-1/2 Differentiation Assay Interpretation Table (2014)
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
              title: 'Recent exposure (<45 days), negative result',
              text: 'A negative 4th-gen test does not rule out HIV within the window period. Repeat at 45 days from exposure or offer HIV-1 RNA testing.',
            },
            {
              title: 'Known HIV-2 risk (West African origin, sexual contact with HIV-2 positive)',
              text: 'Standard HIV-1 viral load assays do not reliably quantify HIV-2. Send HIV-2 specific RNA. HIV-2 is resistant to NNRTIs.',
            },
            {
              title: 'Patient on PrEP',
              text: 'Tenofovir/emtricitabine can blunt seroconversion. A person who acquires HIV on PrEP may show atypical patterns — prolonged indeterminate differentiation, lower viral loads. Maintain high suspicion and use RNA.',
            },
            {
              title: 'Infant / perinatal exposure',
              text: 'Maternal antibodies persist up to 18 months. Antibody-based tests are unreliable in infants <18 months. Use HIV-1 DNA PCR or RNA NAT.',
            },
          ].map(({ title, text }) => (
            <div key={title} style={{ paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reference cards */}
      <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>All Result Combinations</h2>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 12,
        padding: '10px 14px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
      }}>
        {[
          { label: 'HIV confirmed', type: 'reactive' },
          { label: 'HIV negative', type: 'negative' },
          { label: 'Indeterminate', type: 'indeterminate' },
          { label: 'HIV-2 / Other', type: 'info' },
        ].map(({ label, type }) => {
          const s = TYPE_STYLES[type]
          return (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot }} />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{label}</span>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROWS.map((row, i) => <ReferenceRow key={i} row={row} />)}
      </div>

      <div style={{
        marginTop: 16,
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
