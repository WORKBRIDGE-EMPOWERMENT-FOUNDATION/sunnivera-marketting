const adminEmails = () =>
  new Set(
    (process.env.SUPABASE_ADMIN_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )

export function isAdminEmail(email?: string | null) {
  return Boolean(email && adminEmails().has(email.trim().toLowerCase()))
}