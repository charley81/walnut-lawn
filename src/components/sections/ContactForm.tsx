import { useState, useRef, useCallback, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormLabels {
  sectionHeading?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  referralSource?: string
  submitText?: string
}

interface ContactFormProps {
  formLabels?: FormLabels
}

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  referralSource?: string
}

const defaults: FormLabels = {
  sectionHeading: 'Contact',
  firstName: 'First name...',
  lastName: 'Last name...',
  email: 'Email...',
  phone: 'Phone...',
  street: 'Street...',
  city: 'City...',
  state: 'Select a state',
  zip: 'ZIP',
  referralSource: 'Select a source',
  submitText: 'Send Request',
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string): boolean {
  // Accepts: (123) 456-7890, 123-456-7890, 1234567890, +1 (123) 456-7890
  return /^[\d\s\-().+]{7,20}$/.test(phone)
}

function validateZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip)
}

export default function ContactForm({ formLabels = {} }: ContactFormProps) {
  const labels = { ...defaults, ...formLabels }
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [toast, setToast] = useState<{ type: 'success'; message: string } | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const showToast = useCallback((message: string) => {
    setToast({ type: 'success', message })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }, [])

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form)
    const errors: FieldErrors = {}
    const firstName = (data.get('firstName') as string)?.trim() || ''
    const lastName = (data.get('lastName') as string)?.trim() || ''
    const email = (data.get('email') as string)?.trim() || ''
    const phone = (data.get('phone') as string)?.trim() || ''
    const street = (data.get('street') as string)?.trim() || ''
    const city = (data.get('city') as string)?.trim() || ''
    const state = (data.get('state') as string) || ''
    const zip = (data.get('zip') as string)?.trim() || ''
    const referralSource = (data.get('referralSource') as string) || ''

    if (!firstName) errors.firstName = 'First name is required'
    if (!lastName) errors.lastName = 'Last name is required'
    if (!email) errors.email = 'Email is required'
    else if (!validateEmail(email)) errors.email = 'Please enter a valid email address'
    if (!phone) errors.phone = 'Phone number is required'
    else if (!validatePhone(phone)) errors.phone = 'Please enter a valid phone number'
    if (!street) errors.street = 'Street address is required'
    if (!city) errors.city = 'City is required'
    if (!state) errors.state = 'Please select a state'
    if (!zip) errors.zip = 'ZIP code is required'
    else if (!validateZip(zip)) errors.zip = 'Please enter a 5-digit ZIP code'
    if (!referralSource) errors.referralSource = 'Please select a referral source'

    return errors
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const errors = validate(form)
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    setStatus('loading')
    setErrorMessage('')
    setToast(null)

    const formData = new FormData(form)

    try {
      const params = new URLSearchParams()
      formData.forEach((value, key) => {
        params.append(key, value.toString())
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      formRef.current?.reset()
      setFieldErrors({})
      setStatus('idle')
      showToast('Message sent! We\'ll get back to you within 24 hours.')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <>
      {/* Success toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-emerald-600 px-6 py-4 text-emerald-50 shadow-lg transition-all duration-300"
          role="status"
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-auto cursor-pointer text-emerald-200 hover:text-emerald-50"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        acceptCharset="UTF-8"
        className="mx-auto max-w-6xl space-y-6 rounded-lg bg-white"
        name="contact"
        data-netlify="true"
        noValidate
      >
        <input type="hidden" name="form-name" value="contact" />

        <h3 className="text-lg font-semibold text-gray-900">{labels.sectionHeading}</h3>

        {/* Error banner */}
        {status === 'error' && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldWrapper error={fieldErrors.firstName}>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder={labels.firstName}
                disabled={status === 'loading'}
                autoComplete="given-name"
                aria-invalid={fieldErrors.firstName ? 'true' : undefined}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldErrors.lastName}>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder={labels.lastName}
                disabled={status === 'loading'}
                autoComplete="family-name"
                aria-invalid={fieldErrors.lastName ? 'true' : undefined}
              />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldWrapper error={fieldErrors.email}>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder={labels.email}
                disabled={status === 'loading'}
                autoComplete="email"
                aria-invalid={fieldErrors.email ? 'true' : undefined}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldErrors.phone}>
              <Input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder={labels.phone}
                disabled={status === 'loading'}
                autoComplete="tel"
                aria-invalid={fieldErrors.phone ? 'true' : undefined}
              />
            </FieldWrapper>
          </div>
        </div>

        <h3 className="mt-16 text-lg font-semibold text-gray-900">Address</h3>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldWrapper error={fieldErrors.street}>
              <Input
                type="text"
                id="street"
                name="street"
                required
                placeholder={labels.street}
                disabled={status === 'loading'}
                autoComplete="street-address"
                aria-invalid={fieldErrors.street ? 'true' : undefined}
              />
            </FieldWrapper>
            <FieldWrapper error={fieldErrors.city}>
              <Input
                type="text"
                id="city"
                name="city"
                required
                placeholder={labels.city}
                disabled={status === 'loading'}
                autoComplete="address-level2"
                aria-invalid={fieldErrors.city ? 'true' : undefined}
              />
            </FieldWrapper>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <FieldWrapper error={fieldErrors.state}>
              <Select name="state" disabled={status === 'loading'}>
                <SelectTrigger id="state" aria-label="State" data-invalid={fieldErrors.state ? 'true' : undefined}>
                  <SelectValue placeholder={labels.state} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SC">South Carolina</SelectItem>
                  <SelectItem value="NC">North Carolina</SelectItem>
                </SelectContent>
              </Select>
            </FieldWrapper>
            <FieldWrapper error={fieldErrors.zip}>
              <Input
                type="text"
                id="zip"
                name="zip"
                required
                minLength={5}
                placeholder={labels.zip}
                disabled={status === 'loading'}
                autoComplete="postal-code"
                aria-invalid={fieldErrors.zip ? 'true' : undefined}
              />
            </FieldWrapper>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <FieldWrapper error={fieldErrors.referralSource}>
              <Select name="referralSource" disabled={status === 'loading'}>
                <SelectTrigger id="referralSource" aria-label="Referral Source" data-invalid={fieldErrors.referralSource ? 'true' : undefined}>
                  <SelectValue placeholder={labels.referralSource} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friend">Referred by friend/family</SelectItem>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="driveby">Drive-by / Saw our work</SelectItem>
                  <SelectItem value="sign">Yard Sign</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FieldWrapper>
          </div>
        </div>

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full cursor-pointer rounded-md bg-emerald-950 px-4 py-3 font-medium text-emerald-50 shadow-sm transition-colors duration-200 hover:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            labels.submitText
          )}
        </Button>
      </form>
    </>
  )
}

function FieldWrapper({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {children}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
