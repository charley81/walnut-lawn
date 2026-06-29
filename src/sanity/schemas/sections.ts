import { defineType, defineField, defineArrayMember } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
})

export const workSection = defineType({
  name: 'workSection',
  title: 'Work Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text' }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})

export const whyUsSection = defineType({
  name: 'whyUsSection',
  title: 'Why Us Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
})

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
})

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionNumber', title: 'Section Number', type: 'string' }),
    defineField({ name: 'sectionDescription', title: 'Section Description', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text' }),
    defineField({
      name: 'formLabels',
      title: 'Form Labels',
      type: 'object',
      fields: [
        defineField({ name: 'sectionHeading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'firstName', title: 'First Name Placeholder', type: 'string' }),
        defineField({ name: 'lastName', title: 'Last Name Placeholder', type: 'string' }),
        defineField({ name: 'email', title: 'Email Placeholder', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Placeholder', type: 'string' }),
        defineField({ name: 'street', title: 'Street Placeholder', type: 'string' }),
        defineField({ name: 'city', title: 'City Placeholder', type: 'string' }),
        defineField({ name: 'state', title: 'State Placeholder', type: 'string' }),
        defineField({ name: 'zip', title: 'ZIP Placeholder', type: 'string' }),
        defineField({ name: 'referralSource', title: 'Referral Source Placeholder', type: 'string' }),
        defineField({ name: 'submitText', title: 'Submit Button Text', type: 'string' }),
      ],
    }),
  ],
})
