# Implementation Specification: Sanity CMS Integration for Astro Site

## 1. Project Overview

- **Goal**: Replace hardcoded data with dynamic, editable content from Sanity CMS on the main landing page.
- **Tech Stack**: Astro (SSG), React (islands), shadcn/ui (Radix/React), Tailwind CSS.
- **Routing**: Single-page website (`src/pages/index.astro`).
- **Data Fetching**: Static Site Generation (SSG) at build time via `@sanity/client`.
- **Form Submission**: Ignored. Do not implement contact form backend; just render the static UI with labels from Sanity.

## 2. Environment Setup & Dependencies

### 2.1 Install Required Packages

Run the following command in the project root:

```bash
npm install @sanity/client groq @portabletext/react
```

2.2 Environment Variables
Create a .env file in the root directory. The agent must ask the user for SANITY_API_TOKEN before proceeding.

env
PUBLIC_SANITY_PROJECT_ID=rpjmkqdf
PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<USER_MUST_PROVIDE_THIS_TOKEN>
Instructions for the User to generate the Token:

Go to your Sanity dashboard -> Manage -> API.

Click "Add API Token".

Name it "Astro SSG Token", give it Read permissions only.

Copy the generated token and paste it into the .env file.

3. Project Directory Structure
   Ensure the agent creates the following file structure:

text
src/
├── lib/
│ ├── sanity.ts # Sanity client setup
│ └── queries.ts # All GROQ queries
├── components/
│ ├── layout/
│ │ ├── Header.astro
│ │ └── Footer.astro
│ ├── sections/
│ │ ├── Hero.astro
│ │ ├── About.astro
│ │ ├── Services.astro (React Island - Component wrapper)
│ │ ├── Work.astro
│ │ ├── WhyUs.astro (React Island - Component wrapper)
│ │ ├── Testimonials.astro
│ │ └── Contact.astro
│ └── ui/ # (Shadcn existing components)
└── pages/
└── index.astro 4. Sanity Client & Queries (src/lib/)
4.1 src/lib/sanity.ts
Create the client configured for SSG. Use fetch directly without cache to ensure fresh data at build time.

typescript
import { createClient } from '@sanity/client';

export const client = createClient({
projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
dataset: import.meta.env.PUBLIC_SANITY_DATASET,
useCdn: false, // Set to false for SSG build times to ensure static content is accurate
token: import.meta.env.SANITY_API_TOKEN,
apiVersion: '2023-05-03', // Use current date
});
4.2 src/lib/queries.ts
Write explicit GROQ queries to fetch the exact data shape matching the previous Sanity schemas.

typescript
import groq from 'groq';

// Global Header/Footer
export const siteSettingsQuery = groq`  *[_type == "siteSettings"][0] {
    topBannerText,
    phone,
    email,
    navLinks,
    footerInfo {
      contactTitle,
      contactEmail,
      contactPhone,
      socialLinks
    },
    footerLinks,
    copyrightText
  }`;

// Full Page Builder Data
export const pageQuery = groq`  *[_type == "page"][0] {
    title,
    pageBuilder[] {
      _type,
      ...,
      // Specific projections for nested arrays to reduce payload
      servicesList[] { title, icon, description },
      features[] { title, answer },
      testimonials[] { avatar, name, role, testimonial }
    }
  }`; 5. Frontend Rendering (src/pages/index.astro)
5.1 Data Fetching (Frontmatter)
Use the frontmatter to fetch data via SSG and pass it to components.

## typescript

import Layout from '../components/layout/Layout.astro';
import Hero from '../components/sections/Hero.astro';
import About from '../components/sections/About.astro';
import Services from '../components/sections/Services.astro'; // React Island
import Work from '../components/sections/Work.astro';
import WhyUs from '../components/sections/WhyUs.astro'; // React Island
import Testimonials from '../components/sections/Testimonials.astro';
import Contact from '../components/sections/Contact.astro';

import { client } from '../lib/sanity';
import { siteSettingsQuery, pageQuery } from '../lib/queries';

const siteSettings = await client.fetch(siteSettingsQuery);
const pageData = await client.fetch(pageQuery);
const pageBuilder = pageData?.pageBuilder || [];

---

5.2 Component Mapping (Template)
Loop over pageBuilder and conditionally render the correct Astro/React component.

html
<Layout settings={siteSettings}>
{
pageBuilder.map((section, index) => {
switch (section.\_type) {
case 'heroSection':
return <Hero data={section} key={index} />;
case 'aboutSection':
return <About data={section} key={index} />;
case 'servicesSection':
return <Services data={section} key={index} client:load />; // React island for Accordion
case 'workSection':
return <Work data={section} key={index} />;
case 'whyUsSection':
return <WhyUs data={section} key={index} client:load />; // React island for Accordion
case 'testimonialsSection':
return <Testimonials data={section} key={index} />;
case 'contactSection':
return <Contact data={section} key={index} />;
default:
return null;
}
})
}
</Layout> 6. Component Implementation Guidelines (Astro + React Islands)
6.1 Global Layout (Header.astro & Footer.astro)
Header: Use siteSettings.topBannerText, siteSettings.navLinks, siteSettings.phone, and siteSettings.email.

Footer: Use siteSettings.footerInfo, siteSettings.footerLinks, and siteSettings.copyrightText. Wire social links to external URLs.

6.2 Static Astro Sections (Hero, About, Work, Testimonials, Contact)
About: Use @portabletext/react to render <PortableText value={data.body} />.

Work: Map over data.gallery array and use Astro <Image /> component for optimized images.

Contact: Render inputs using data.formLabels for the placeholder attributes. Disable the action/method (since submission is ignored).

6.3 Interactive React Islands (Services & WhyUs)
Because these sections contain shadcn Accordions (which rely on React Context), they must be React components wrapped with client:load.

Services.tsx: Accept data prop (containing title, introText, image, servicesList). Render the UI with the Tailwind styling. Render the shadcn <Accordion> component iterating over servicesList. Use the description field as the accordion's content.

WhyUs.tsx: Accept data prop. Render the visual layout and <Accordion> mapping over data.features. Use answer as the accordion content.

Important: Ensure shadcn Collapsible/Accordion contexts are available in the Astro wrapper.

7. Build & Deployment Check
   SSG Pre-rendering: The agent must verify that astro build successfully pulls the Sanity data and outputs a fully static dist folder.

Security: Verify that .env is added to .gitignore so SANITY_API_TOKEN is never committed.

8. Action Items for the Agent
   Request SANITY_API_TOKEN from the user.

Create src/lib/sanity.ts and src/lib/queries.ts.

Build all components listed in Section 6 using existing UI patterns (Tailwind, shadcn).

Update src/pages/index.astro to pass the Sanity data to the components.

Run npm run build and confirm no errors occur.
