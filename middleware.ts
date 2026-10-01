import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { getSupabaseConfig } from '@/lib/supabase/config'
import { isAdminEmail } from '@/lib/admin-auth'

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const isAdminApi = pathname.startsWith('/api/admin/')
  let response = NextResponse.next({ request: req })
  const { url, anonKey } = getSupabaseConfig()
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
        response = NextResponse.next({ request: req })
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const isNestedLogin = pathname === '/blog-db/app/admin/login'
  const isLogin = pathname === '/admin/login' || isNestedLogin
  const isAdmin = isAdminEmail(user?.email)

  if (isAdminApi) {
    if (!isAdmin) {
      const unauthorized = NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
      response.cookies.getAll().forEach(cookie => unauthorized.cookies.set(cookie))
      return unauthorized
    }
    const requestHeaders = new Headers(req.headers)
    requestHeaders.delete('x-sunivera-admin')
    requestHeaders.set('x-sunivera-admin', 'verified')
    const apiResponse = NextResponse.next({ request: { headers: requestHeaders } })
    response.cookies.getAll().forEach(cookie => apiResponse.cookies.set(cookie))
    return apiResponse
  }

  if (isNestedLogin) {
    const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url))
    response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie))
    return redirectResponse
  }

  if (pathname === '/admin/login' && isAdmin) {
    const redirectResponse = NextResponse.redirect(new URL('/admin', req.url))
    response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie))
    return redirectResponse
  }

  if (isLogin || isAdmin) return response

  const redirectResponse = NextResponse.redirect(new URL('/admin/login', req.url))
  response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie))
  return redirectResponse
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*', '/blog-db/app/admin/:path*'] }
