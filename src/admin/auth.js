// Credentials — phone + hashed password
// Password: Outside2026! → SHA-256
const PHONE = '221785273187'
const PASS_HASH = '5901cab1b0e6d07d5dc9ce93eff8d8b347a18ab50a299114bcb9d1ead923c83c'

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function login(phone, password) {
  const hash = await sha256(password)
  if (phone.replace(/\s/g, '') === PHONE && hash === PASS_HASH) {
    const token = btoa(`${Date.now()}:outside-admin`)
    sessionStorage.setItem('outside_admin_token', token)
    return true
  }
  return false
}

export function isAuthenticated() {
  return !!sessionStorage.getItem('outside_admin_token')
}

export function logout() {
  sessionStorage.removeItem('outside_admin_token')
}
