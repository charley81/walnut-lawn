import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.enum(['SC', 'NC'], { required_error: 'We only service SC or NC' }),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  referralSource: z.enum(
    ['friend', 'google', 'social', 'driveby', 'sign', 'other'],
    {
      required_error: 'Please select a referral source',
    },
  ),
})

export const server = {
  contact: defineAction({
    accept: 'form',
    handler: async (formData) => {
      try {
        // Parse and validate form data
        const validatedData = contactSchema.parse(formData)

        // Prepare data for netlify
        const netlifyData = new URLSearchParams()

        // Add all form data to URLSearchParams
        Object.entries(validatedData).forEach(([key, value]) => {
          netlifyData.append(key, value.toString())
        })

        // Submit to Netlify forms
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: netlifyData.toString(),
        })

        if (!response.ok) {
          throw new Error('Failed to submit to Netlify forms')
        }

        return {
          success: true,
          message: 'Thank you! your message has been sent.',
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            success: false,
            message: 'Please correct the errors in the form.',
          }
        }

        return {
          success: false,
          message: 'An unexpected error occurred. Please try again.',
        }
      }
    },
  }),
}
