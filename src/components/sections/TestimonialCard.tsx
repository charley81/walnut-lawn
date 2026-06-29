import { Card, CardContent } from '@/components/ui/card'
import { urlFor } from '../../lib/sanity'

interface Testimonial {
  avatar?: any
  name: string
  tagline: string
  quote: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// Map testimonial names to their fallback local images
type TestimonialMap = Record<string, string>
const localAvatars: TestimonialMap = {
  'Mark & Sarah Johnson': '/images/testimonials/testimonial-1.png',
  'Brenda Miller': '/images/testimonials/testimonial-2.png',
  'The Carter Family': '/images/testimonials/testimonial-3.png',
  'David Chen': '/images/testimonials/testimonial-4.png',
  'Roberto Martinez': '/images/testimonials/testimonial-5.png',
  'Dr. Emily Watson': '/images/testimonials/testimonial-6.png',
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const sanitUrl = testimonial.avatar?.asset ? urlFor(testimonial.avatar).width(80).height(80).format('webp').url() : null
  const fallbackUrl = localAvatars[testimonial.name] || null
  const avatarUrl = sanitUrl || fallbackUrl

  return (
    <Card className="h-full w-full border-neutral-200 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-y-4 p-6">
        <div className="h-20 w-20">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={testimonial.name}
              className="h-full w-full rounded-full object-cover ring-2 ring-emerald-600" loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600 ring-2 ring-emerald-600">
              {getInitials(testimonial.name)}
            </div>
          )}
        </div>
        <p className="font-medium tracking-wider text-emerald-800">
          {testimonial.tagline}
        </p>

        <p className="break-words text-slate-500">{testimonial.quote}</p>

        <p className="font-medium">{testimonial.name}</p>
      </CardContent>
    </Card>
  )
}
