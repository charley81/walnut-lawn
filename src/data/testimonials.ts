export interface Testimonial {
  id: number
  quote: string
  author: string
  tagline: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    tagline: 'Mark & Sarah Johnson',
    quote: 'SATISFIED LONG-TERM CUSTOMER',
    author:
      "We've used Walnut Lawn for three seasons now, and our lawn has never looked better. They're incredibly reliable—rain or shine, they show up on time and do a fantastic job. It's such a relief to not have to worry about it anymore.",
    image: '/images/testimonials/testimonial-1.png',
  },
  {
    id: 2,
    author: 'Brenda Miller',
    tagline: 'COMMUNITY FOCUSED NEIGHBOR',
    quote:
      "It feels good to hire someone who actually lives in our neighborhood. You can tell they take real pride in their work because they're not just maintaining lawns—they're helping our whole community look its best. True professionals.",
    image: '/images/testimonials/testimonial-2.png',
  },
  {
    id: 3,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/images/testimonials/testimonial-3.png',
  },
  {
    id: 4,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/woman-dark-hair.jpg',
  },
  {
    id: 5,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/images/testimonials/testimonial-4.png',
  },
  {
    id: 6,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/images/testimonials/testimonial-5.png',
  },
]

// export const testimonials: Testimonial[] = [
//   {
//     id: '1',
//     tagline: 'SATISFIED LONG-TERM CUSTOMER',
//     quote:
//       "We've used Walnut Lawn for three seasons now, and our lawn has never looked better. They're incredibly reliable—rain or shine, they show up on time and do a fantastic job. It's such a relief to not have to worry about it anymore.",
//     author: 'Mark & Sarah Johnson',
//     image: '/images/testimonials/testimonial-1.png',
//   },
//   {
//     id: '2',
//     tagline: 'COMMUNITY FOCUSED NEIGHBOR',
//     quote:
//       "It feels good to hire someone who actually lives in our neighborhood. You can tell they take real pride in their work because they're not just maintaining lawns—they're helping our whole community look its best. True professionals.",
//     author: 'Brenda Miller',
//     image: '/images/testimonials/testimonial-2.png',
//   },
//   {
//     id: '3',
//     tagline: 'VALUE-CONSCIOUS PARENT',
//     quote:
//       "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
//     author: 'The Carter Family',
//     image: '/images/testimonials/testimonial-3.png',
//   },
//   {
//     id: '4',
//     tagline: 'QUALITY-FOCUSED HOMEOWNER',
//     quote:
//       'After trying several lawn services, Walnut Lawn stands out for their attention to detail. They notice things others miss and actually care about the health of our lawn, not just cutting it. The edges are always crisp and they clean up perfectly every time.',
//     author: 'David Chen',
//     image: '/images/testimonials/testimonial-4.png',
//   },
//   {
//     id: '5',
//     tagline: 'LOCAL BUSINESS PARTNER',
//     quote:
//       "As a small business owner myself, I appreciate working with other local entrepreneurs who understand customer service. Walnut Lawn has maintained our office landscaping for two years, and they're always professional, responsive, and reasonably priced.",
//     author: 'Roberto Martinez',
//     image: '/images/testimonials/testimonial-5.png',
//   },
//   {
//     id: '6',
//     tagline: 'ENVIRONMENTALLY CONSCIOUS CLIENT',
//     quote:
//       'I was impressed by their knowledge of water-wise landscaping and eco-friendly practices. They helped transform our thirsty lawn into a beautiful, sustainable landscape that saves water and looks amazing. Their expertise made all the difference.',
//     author: 'Dr. Emily Watson',
//     image: '/images/testimonials/testimonial-6.png',
//   },
// ] as const
