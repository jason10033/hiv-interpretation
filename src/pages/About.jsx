const BRAND_RED = '#8B1A1A'
const BRAND_BLUE = '#5B9EC9'
const BRAND_DARK = '#162447'

const REFERENCES = [
  {
    id: 1,
    citation: 'Branson BM, Owen SM, Wesolowski LG, et al. Laboratory Testing for the Diagnosis of HIV Infection: Updated Recommendations.',
    journal: 'CDC/APHL',
    year: '2014',
    detail: 'The primary source for the recommended laboratory HIV testing algorithm used throughout this tool.',
  },
  {
    id: 2,
    citation: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021.',
    journal: 'MMWR Recomm Rep',
    year: '2021',
    detail: '2021;70(4):1–187.',
  },
  {
    id: 3,
    citation: 'Masciotra S, McDougal JS, Feldman J, et al. Evaluation of an alternative HIV diagnostic algorithm using specimens from seroconversion panels and individuals with established HIV infections.',
    journal: 'J Clin Virol',
    year: '2011',
    detail: '2011;52(Suppl 1):S17–22.',
  },
  {
    id: 4,
    citation: 'Fiebig EW, Wright DJ, Rawal BD, et al. Dynamics of HIV viremia and antibody seroconversion in plasma donors: implications for diagnosis and staging of primary HIV infection.',
    journal: 'AIDS',
    year: '2003',
    detail: '2003;17(13):1871–9.',
  },
  {
    id: 5,
    citation: 'Styer LM, Sullivan TJ, Parker MM. Evaluation of an alternative supplemental testing strategy for HIV diagnosis by retrospective analysis of clinical HIV testing data.',
    journal: 'J Clin Virol',
    year: '2011',
    detail: '2011;52(Suppl 1):S5–10.',
  },
  {
    id: 6,
    citation: 'Nasrullah M, Ethridge SF, Delaney KP, et al. Comparison of alternative interpretive criteria for the HIV-1 Western blot and results of the Multispot HIV-1/HIV-2 Rapid Test for classifying HIV-1 and HIV-2 infections.',
    journal: 'J Clin Virol',
    year: '2011',
    detail: '2011;52(Suppl 1):S23–7.',
  },
  {
    id: 7,
    citation: 'Gottlieb GS, Sow PS, Hawes SE, et al. Equal plasma viral loads predict a similar rate of CD4+ T cell decline in human immunodeficiency virus (HIV) type 1– and HIV-2–infected individuals from Senegal, West Africa.',
    journal: 'J Infect Dis',
    year: '2002',
    detail: 'See also: CDC recommendations for HIV-2 diagnosis and management.',
  },
]

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
          src="/ptc-logo.png"
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
          About HIV Algorithm
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
          This HIV test interpretation reference is brought to you by the <strong style={{ color: 'var(--text-primary)' }}>NYC STI/HIV Prevention Training Center (PTC)</strong>, a CDC-funded regional training center serving New York, New Jersey, Puerto Rico, the U.S. Virgin Islands, Michigan, Ohio and Indiana.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>
          A program of <strong style={{ color: 'var(--text-primary)' }}>Columbia University Mailman School of Public Health</strong> Department of Sociomedical Sciences, the PTC is dedicated to increasing the sexual health knowledge and skills of clinical health professionals in the prevention, diagnosis, and management of sexually transmitted infections (STIs). We work with clinical providers and are part of the <strong style={{ color: 'var(--text-primary)' }}>National Network of STD Clinical Prevention Training Centers (NNPTC)</strong>.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          This tool is designed to support clinicians at the point of care in interpreting results from the CDC/APHL 2014 Recommended Laboratory HIV Testing Algorithm, providing both rapid lookup and durable clinical education in one place.
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
          { icon: '⬡', label: 'Interactive Algorithm', desc: 'Tap-to-expand nodes explaining each step of the recommended testing sequence' },
          { icon: '⊞', label: 'Clinical Case Library', desc: '5 canonical result patterns with tap-to-reveal interpretations and evidence-based rationale' },
          { icon: '◷', label: 'Window Period Explorer', desc: 'Interactive timeline showing when each test becomes detectable after exposure' },
          { icon: '≡', label: 'Summary', desc: 'Every result combination mapped to interpretation and next step. Built to bookmark.' },
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
          This tool is intended as an educational reference for licensed clinicians. It does not replace clinical judgment. Results should always be interpreted in the context of individual patient history and risk.
        </p>
      </div>

      {/* NNPTC Clinical Consultation */}
      <a
        href="https://www.stdccn.org/render/Public"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          background: BRAND_RED,
          color: 'white',
          borderRadius: 'var(--radius)',
          padding: '16px 20px',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-md)',
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Have a complicated clinical question?</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>NNPTC Clinical Consultation — free expert guidance for providers</div>
        </div>
        <span style={{ fontSize: 20, opacity: 0.8 }}>→</span>
      </a>

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
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Visit the NYC STI/HIV PTC</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Training, resources, and consultation for clinicians</div>
        </div>
        <span style={{ fontSize: 20, opacity: 0.7 }}>→</span>
      </a>

      {/* References */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>References</h2>
        </div>
        {REFERENCES.map((ref, i) => (
          <div key={ref.id} style={{
            padding: '14px 20px',
            borderBottom: i < REFERENCES.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary-mid)', flexShrink: 0, marginTop: 1 }}>{ref.id}.</span>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 3 }}>{ref.citation}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  <em>{ref.journal}</em>{ref.year ? ` ${ref.year}.` : '.'} {ref.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
