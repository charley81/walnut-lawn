import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'topBannerText',
      title: 'Top Banner Text',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerInfo',
      title: 'Footer Info',
      type: 'object',
      fields: [
        defineField({ name: 'contactTitle', title: 'Contact Title', type: 'string' }),
        defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
        defineField({ name: 'contactPhone', title: 'Contact Phone', type: 'string' }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'platform', title: 'Platform', type: 'string' }),
                defineField({ name: 'url', title: 'URL', type: 'url' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
