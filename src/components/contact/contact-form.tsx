import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export default function ContactForm() {
  return (
    <form
      method="POST"
      className="-gray-200 mx-auto max-w-6xl space-y-6 rounded-lg bg-white"
      name="contact"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="contact" />

      {/* Contact Section */}
      <h3 className="text-lg font-semibold text-gray-900">Contact</h3>

      <div className="grid gap-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="First name..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Last name..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Phone..."
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <h3 className="mt-16 text-lg font-semibold text-gray-900">Address</h3>

      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              id="street"
              name="street"
              required
              placeholder="Street..."
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              id="city"
              name="city"
              required
              placeholder="City..."
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full items-center gap-1.5">
            <Select name="state">
              <SelectTrigger id="state" aria-label="State">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SC">South Carolina</SelectItem>
                <SelectItem value="NC">North Carolina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              id="zip"
              name="zip"
              required
              minLength={5}
              placeholder="ZIP"
            />
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Select name="referralSource">
            <SelectTrigger id="referralSource" aria-label="Referral Source">
              <SelectValue placeholder="Select a source" />
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-emerald-950 px-4 py-3 font-medium text-emerald-50 shadow-sm transition-colors duration-200 hover:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
      >
        Send Request
      </Button>
    </form>
  )
}
