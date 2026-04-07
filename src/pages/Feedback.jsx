import { useState } from 'react'

const BRAND_DARK = '#162447'

export default function Feedback() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const body = new URLSearchParams({ 'form-name': 'feedback', message, email })
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      if (res.ok) {
        setStatus('success')
        setMessage('')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '28px 16px 56px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Feedback</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Found an error, have a suggestion, or want to report something? We want to hear from you. Your feedback helps keep this tool accurate and useful for clinicians.
        </p>
      </div>

      {status === 'success' ? (
        <div style={{
          background: 'var(--negative-bg)',
          border: '1.5px solid var(--negative-border)',
          borderRadius: 'var(--radius)',
          padding: '24px 20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>&#10003;</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--negative)', marginBottom: 6 }}>Thank you!</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Your message has been received. We review all feedback and will follow up if you left an email address.</p>
          <button
            onClick={() => setStatus('idle')}
            style={{ marginTop: 16, fontSize: 13, color: 'var(--negative)', background: 'none', border: '1px solid var(--negative-border)', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          name="feedback"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <input type="hidden" name="form-name" value="feedback" />

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Your message <span style={{ color: 'var(--reactive)' }}>*</span>
            </label>
            <textarea
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Describe the error, suggestion, or feedback..."
              style={{
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--border)',
                padding: '12px 14px',
                fontSize: 14,
                color: 'var(--text-primary)',
                background: 'var(--surface)',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Your email <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-muted)' }}>(optional, if you would like a reply)</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--border)',
                padding: '12px 14px',
                fontSize: 14,
                color: 'var(--text-primary)',
                background: 'var(--surface)',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {status === 'error' && (
            <p style={{ fontSize: 13, color: 'var(--reactive)', margin: 0 }}>
              Something went wrong. Please try again or email us directly at jz2700@cumc.columbia.edu.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting' || !message.trim()}
            style={{
              background: status === 'submitting' || !message.trim() ? 'var(--border)' : BRAND_DARK,
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              fontSize: 14,
              fontWeight: 700,
              cursor: status === 'submitting' || !message.trim() ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
            }}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
          </button>
        </form>
      )}
    </div>
  )
}
