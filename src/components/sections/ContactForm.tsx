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

export default function ContactForm({ formLabels = {} }: ContactFormProps) {
  const labels = { ...defaults, ...formLabels }

  return (
    <form
      method="POST"
      className="mx-auto max-w-6xl space-y-6 rounded-lg bg-white"
      name="contact"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />

      <h3 className="text-lg font-semibold text-gray-900">{labels.sectionHeading}</h3>

      <div className="grid gap-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input type="text" id="firstName" name="firstName" required placeholder={labels.firstName} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input type="text" id="lastName" name="lastName" required placeholder={labels.lastName} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input type="email" id="email" name="email" required placeholder={labels.email} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input type="tel" id="phone" name="phone" required placeholder={labels.phone} />
          </div>
        </div>
      </div>

      <h3 className="mt-16 text-lg font-semibold text-gray-900">Address</h3>

      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input type="text" id="street" name="street" required placeholder={labels.street} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input type="text" id="city" name="city" required placeholder={labels.city} />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Select name="state">
              <SelectTrigger id="state" aria-label="State">
                <SelectValue placeholder={labels.state} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SC">South Carolina</SelectItem>
                <SelectItem value="NC">North Carolina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input type="text" id="zip" name="zip" required minLength={5} placeholder={labels.zip} />
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Select name="referralSource">
            <SelectTrigger id="referralSource" aria-label="Referral Source">
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
        </div>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-emerald-950 px-4 py-3 font-medium text-emerald-50 shadow-sm transition-colors duration-200 hover:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
      >
        {labels.submitText}
      </Button>
    </form>
  )
}
