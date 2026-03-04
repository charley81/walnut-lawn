import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    hero: collection({
      label: 'Hero Content',
      slugField: 'headline',
      path: 'src/content/hero/*',
      format: { contentField: 'content' },
      schema: {
        headline: fields.slug({ name: { label: 'Hero Headline' } }),
        ctaText: fields.text({ label: 'CTA Text' }),
        ctaButtonText: fields.text({ label: 'CTA Button Text' }),
      },
    }),
  },
  singletons: {},
})
