import { login } from '../actions'

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <div className="login">
      <h1 style={{ fontSize: '2.4rem', marginBottom: 20 }}>Sign in</h1>
      {error && <p className="msg err" role="alert">{error === 'rate' ? 'Too many attempts. Try again in a few minutes.' : 'Wrong password.'}</p>}
      <form action={login}>
        <label>Email<input name="email" type="email" required autoComplete="username" /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
        <button className="btn ink" type="submit">Sign in</button>
      </form>
    </div>
  )
}
