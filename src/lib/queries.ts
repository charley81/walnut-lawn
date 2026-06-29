import groq from 'groq'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
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
  }
`

export const pageQuery = groq`
  *[_type == "page"][0] {
    title,
    pageBuilder[] {
      _type,
      ...,
      servicesList[] { title, icon, description },
      features[] { title, answer },
      testimonials[] { avatar, name, tagline, quote }
    }
  }
`
