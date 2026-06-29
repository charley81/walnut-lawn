import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'aboutSection' }),
        defineArrayMember({ type: 'servicesSection' }),
        defineArrayMember({ type: 'workSection' }),
        defineArrayMember({ type: 'whyUsSection' }),
        defineArrayMember({ type: 'testimonialsSection' }),
        defineArrayMember({ type: 'contactSection' }),
      ],
    }),
  ],
})
