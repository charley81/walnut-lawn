export function formatPhoneNumber(phoneNumber: string) {
  // remove all non-digit characters and limit to 10
  const cleaned = phoneNumber.replace(/\D/g, '').slice(0, 10)

  if (cleaned.length === 0) return ''
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

export function isValidPhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replace(/\D/g, '')
  return cleaned.length === 10
}

export function sanitizePhoneInput(input: string) {
  return input.replace(/\D/g, '').substring(0, 10)
}
