export interface DataProps {
  id: string
  title: string
  description: string
}

export const data: DataProps[] = [
  {
    id: '1',
    title: 'Why Choose a Neighborhood-Focused Company?',
    description:
      "When you choose a local company, you get personalized attention and quick response times that big corporations can't match. We know Walnut Creek neighborhoods intimately - from soil conditions to seasonal patterns. Plus, your investment stays in our community, supporting local families and businesses. We're not just serving customers; we're caring for neighbors.",
  },
  {
    id: '2',
    title: 'What Does "Family-Owned & Faith-Based" Really Mean for You?',
    description:
      "It means you'll receive honest pricing, reliable service, and treatment that reflects our Christian values. We see our work as a calling to serve our neighbors with integrity. You'll never get upsold on services you don't need, and we stand behind our work with a satisfaction guarantee. For us, every lawn we care for represents a relationship built on trust and mutual respect.",
  },
  {
    id: '3',
    title: 'How Does Your Pricing Compare to Big Box Companies?',
    description:
      'We offer competitive, transparent pricing without hidden fees. While we may not always be the cheapest option, we provide exceptional value through our expertise, reliability, and personalized service. Big companies often charge for overhead and marketing - we invest in quality equipment and trained team members. You get professional results with the personal touch of a local business at a fair price.',
  },
  {
    id: '4',
    title: 'What Makes Your Service Experience Different?',
    description:
      "From your first call to every weekly visit, you'll notice the difference. We take time to understand your specific needs and preferences. You'll have direct access to our team, consistent crew members who learn your property, and proactive communication about your lawn's health. We don't just cut grass - we build relationships and become your trusted lawn care partners.",
  },
] as const
