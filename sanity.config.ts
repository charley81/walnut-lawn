import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import {
  siteSettings,
  heroSection,
  aboutSection,
  servicesSection,
  workSection,
  whyUsSection,
  testimonialsSection,
  contactSection,
  page,
} from './src/sanity/schemas'

export default defineConfig({
  name: 'walnut-lawn',
  title: 'Walnut Lawn CMS',
  projectId: 'rpjmkqdf',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [
      siteSettings,
      heroSection,
      aboutSection,
      servicesSection,
      workSection,
      whyUsSection,
      testimonialsSection,
      contactSection,
      page,
    ],
  },
})
