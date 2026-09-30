#!/usr/bin/env node
// Generates admin login details for /admin.
//   node scripts/generate-admin.mjs            print a new password and secret
//   node scripts/generate-admin.mjs --write    save them into .env.local (keeps the current AUTH_SECRET)
//   node scripts/generate-admin.mjs --write --rotate   also replace AUTH_SECRET (signs everyone out)
import { randomBytes, randomInt } from 'node:crypto'
import fs from 'node:fs'

const args = new Set(process.argv.slice(2))
const file = '.env.local'

// No look-alike characters (0/O, 1/l/I), so it is easy to read and type.
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
const chunk = () => Array.from({ length: 5 }, () => alphabet[randomInt(alphabet.length)]).join('')
const password = [chunk(), chunk(), chunk(), chunk()].join('-') // 20 characters, about 116 bits

const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
const current = k => existing.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]
const rotate = args.has('--rotate') || !current('AUTH_SECRET')
const secret = rotate ? randomBytes(32).toString('hex') : current('AUTH_SECRET')

const setVar = (text, k, v) => {
  const re = new RegExp(`^${k}=.*$`, 'm')
  return re.test(text) ? text.replace(re, () => `${k}=${v}`) : text.replace(/\n*$/, '\n') + `${k}=${v}\n`
}

console.log('\nSunivera admin login')
console.log('  URL:       http://localhost:3000/admin')
console.log('  Username:  none, the login is password only')
console.log(`  Password:  ${password}\n`)

if (args.has('--write')) {
  let out = setVar(existing, 'ADMIN_PASSWORD', password)
  out = setVar(out, 'AUTH_SECRET', secret)
  fs.writeFileSync(file, out, { mode: 0o600 })
  fs.chmodSync(file, 0o600) // also tightens an existing file
  console.log(`Saved to ${file}. Restart "npm run dev" so it picks up the new values.`)
  if (rotate && current('AUTH_SECRET')) console.log('AUTH_SECRET was replaced, so any open admin session is signed out.')
} else {
  console.log('Add these to .env.local (or re-run with --write to do it for you):\n')
  console.log(`ADMIN_PASSWORD=${password}`)
  console.log(`AUTH_SECRET=${secret}\n`)
}
console.log('Store the password in a password manager. Do not commit .env.local or share it.\n')
