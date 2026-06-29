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

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const avatarUrl = testimonial.avatar?.asset ? urlFor(testimonial.avatar).width(80).height(80).url() : null

  return (
    <Card className="h-full w-full border-neutral-200 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-y-4 p-6">
        <div className="h-20 w-20">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={testimonial.name}
              className="h-full w-full rounded-full object-cover ring-2 ring-emerald-600"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600 ring-2 ring-emerald-600">
              {testimonial.name.charAt(0)}
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
