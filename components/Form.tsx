'use client'
import { useState } from 'react'

const EMAIL = 'hello@suniveralogisticsltd.com'

export default function Form() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      form.reset()
      setState('sent')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  if (state === 'sent')
    return (
      <div className="sent" role="status">
        <h3>Enquiry received.</h3>
        <p>Thank you. We will reply to the email address you gave.</p>
      </div>
    )

  return (
    <form onSubmit={submit}>
      <label>Your name<input name="n" required autoComplete="name" /></label>
      <label>Work email<input name="e" type="email" required autoComplete="email" /></label>
      <label>Company<input name="c" autoComplete="organization" /></label>
      <label>What do you need?
        <select name="t">{['Procurement', 'Compliance', 'Project delivery', 'Workforce', 'Technology', 'Logistics'].map(o => <option key={o}>{o}</option>)}</select>
      </label>
      <label>The enquiry<textarea name="m" rows={3} required /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn ink" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      {state === 'error' && (
        <p className="err" role="alert">{msg} You can also write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      )}
    </form>
  )
}
