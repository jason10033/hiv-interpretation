import { useState } from 'react'

// Detection windows (days post-exposure, approximate ranges)
// Based on Fiebig stages and current literature
const TESTS = [
  {
    id: 'rna',
    label: 'HIV-1 RNA (NAT)',
    description: 'Nucleic acid amplification test detecting viral RNA',
    detectDay: 10,
    reliableDay: 14,
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#A78BFA',
  },
  {
    id: 'p24',
    label: 'p24 Antigen',
    description: 'HIV-1 capsid protein; detected by 4th-gen combo test',
    detectDay: 14,
    reliableDay: 18,
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#F59E0B',
  },
  {
    id: 'combo',
    label: '4th-Gen Ag/Ab Combo',
    description: 'Detects both p24 antigen and HIV-1/2 antibodies',
    detectDay: 18,
    reliableDay: 23,
    color: '#B45309',
    bg: '#FEF3C7',
    border: '#D97706',
  },
  {
    id: 'ab3',
    label: '3rd-Gen Antibody Only',
    description: 'Detects IgM and IgG antibodies to HIV-1 and HIV-2',
    detectDay: 23,
    reliableDay: 28,
    color: '#0369A1',
    bg: '#E0F2FE',
    border: '#38BDF8',
  },
  {
    id: 'ab2',
    label: '2nd-Gen Antibody Only',
    description: 'Detects IgG antibodies only; older generation test',
    detectDay: 29,
    reliableDay: 42,
    color: '#374151',
    bg: '#F9FAFB',
    border: '#9CA3AF',
  },
]

const MAX_DAYS = 90

function getStatus(test, day) {
  if (day < test.detectDay) return 'negative'
  if (day < test.reliableDay) return 'possible'
  return 'reactive'
}

const STATUS_LABEL = {
  negative: 'Negative',
  possible: 'Possibly reactive',
  reactive: 'Reactive',
}

const STATUS_COLOR = {
  negative: { bg: 'var(--negative-bg)', border: 'var(--negative-border)', text: 'var(--negative)' },
  possible: { bg: '#FFFBEB', border: '#F59E0B', text: '#B45309' },
  reactive: { bg: 'var(--reactive-bg)', border: 'var(--reactive-border)', text: 'var(--reactive)' },
}

// Fiebig stages for reference
const STAGES = [
  { start: 0, end: 10, label: 'Fiebig I', sublabel: 'RNA only detectable', color: '#7C3AED' },
  { start: 10, end: 18, label: 'Fiebig II–III', sublabel: 'Ag detectable; Abs forming', color: '#D97706' },
  { start: 18, end: 28, label: 'Fiebib IV–V', sublabel: '4th gen positive', color: '#B45309' },
  { start: 28, end: 90, label: 'Fiebig VI', sublabel: 'All tests positive', color: '#059669' },
]

export default function WindowPeriod() {
  const [day, setDay] = useState(21)

  const dayLabel = day === 0 ? 'Day 0 — Exposure' : `Day ${day} post-exposure`

  // Determine which stage we're in
  const stage = STAGES.find(s => day >= s.start && day < s.end) || STAGES[STAGES.length - 1]

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Interactive Timeline</p>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Window Period</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Drag the slider to a timepoint after exposure. See which tests would be positive or negative.
        </p>
      </div>

      {/* Slider card */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        marginBottom: 16,
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{dayLabel}</span>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: stage.color,
            background: '#F8FAFC',
            border: `1px solid ${stage.color}40`,
            borderRadius: 20,
            padding: '3px 10px',
          }}>{stage.label}</span>
        </div>

        {/* Visual timeline bar */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          {/* Background track */}
          <div style={{
            height: 8,
            background: 'var(--border)',
            borderRadius: 4,
            position: 'relative',
            overflow: 'visible',
          }}>
            {/* Colored fill */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${(day / MAX_DAYS) * 100}%`,
              background: stage.color,
              borderRadius: 4,
              transition: 'width 0.1s',
            }} />
          </div>

          {/* Stage markers */}
          <div style={{ position: 'relative', height: 20, marginTop: 4 }}>
            {STAGES.slice(0, -1).map(s => (
              <div key={s.start} style={{
                position: 'absolute',
                left: `${(s.end / MAX_DAYS) * 100}%`,
                top: 0,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{ width: 1, height: 8, background: 'var(--border)' }} />
                <span style={{ fontSize: 9, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Day {s.end}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider input */}
        <input
          type="range"
          min={0}
          max={MAX_DAYS}
          value={day}
          onChange={e => setDay(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: stage.color,
            height: 6,
            cursor: 'pointer',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Exposure</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Day 90</span>
        </div>

        {/* Stage context */}
        <div style={{
          marginTop: 16,
          padding: '12px 14px',
          background: `${stage.color}10`,
          border: `1px solid ${stage.color}30`,
          borderRadius: 'var(--radius-sm)',
        }}>
          <p style={{ fontSize: 13, color: stage.color, fontWeight: 600 }}>{stage.sublabel}</p>
          {day < 10 && (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
              No test will reliably detect HIV yet. Viral replication has begun but levels are below detection thresholds.
            </p>
          )}
          {day >= 10 && day < 18 && (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
              RNA NAT is the only reliable test. A negative 4th-gen combo test does not rule out HIV at this stage.
            </p>
          )}
          {day >= 18 && day < 28 && (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
              4th-gen test is reactive. Older antibody-only tests may still be negative. This is why 4th-gen is preferred.
            </p>
          )}
          {day >= 28 && (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>
              All standard tests should be reactive. A negative result at this point effectively rules out HIV from a single exposure event.
            </p>
          )}
        </div>
      </div>

      {/* Test status cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TESTS.map(test => {
          const status = getStatus(test, day)
          const sc = STATUS_COLOR[status]
          return (
            <div key={test.id} style={{
              background: sc.bg,
              border: `1.5px solid ${sc.border}`,
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: sc.text,
                flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: sc.text }}>{test.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.3 }}>{test.description}</div>
                {status === 'negative' && (
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                    Detectable after day {test.detectDay} (reliable after day {test.reliableDay})
                  </div>
                )}
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: sc.text,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>{STATUS_LABEL[status]}</span>
            </div>
          )
        })}
      </div>

      {/* Key insight callout */}
      <div style={{
        marginTop: 20,
        padding: '16px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
      }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Why the 4th-gen test matters</h3>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          The 4th-generation combo test closes the gap between antibody-only tests (Days 23–42) and RNA testing by detecting the p24 antigen from Days 14–18. It narrows the window period by approximately 1 week compared to 3rd-generation antibody tests, with no additional cost or sample volume.
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
          Source: Fiebig EW et al. <em>AIDS</em> 2003;17:1871–9. Branson BM et al. <em>MMWR</em> 2014;63(RR-03).
        </p>
      </div>
    </div>
  )
}
