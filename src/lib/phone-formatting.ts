function clean(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '')
}

export function formatPhoneNumber(phoneNumber: string) {
  // remove all non-digit characters and limit to 10
  const cleaned = clean(phoneNumber).slice(0, 10)

  if (cleaned.length === 0) return ''
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
}

export function isValidPhoneNumber(phoneNumber: string) {
  return clean(phoneNumber).length === 10
}

export function sanitizePhoneInput(input: string) {
  return clean(input).substring(0, 10)
}
