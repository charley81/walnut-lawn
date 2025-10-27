import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  referralSource: z.string().min(1, 'Please tell us how you heard about us'),
})

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Please enter a valid email'),
    }),
    handler: async (input) => {
      console.log('Received contact form submission:', input)

      // In a real application, you would:
      // 1. Send an email notification
      // 2. Save to a database
      // 3. Integrate with your CRM
      // 4. Send to a service like Formspree or Netlify Forms

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message:
          'Thank you for contacting us! We will get back to you shortly.',
      }
    },
  }),
}
