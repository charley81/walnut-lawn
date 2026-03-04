import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
  id: number
  author: string
  tagline: string
  quote: string
  image: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <Card className="h-full w-full border-neutral-200 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-y-4 p-6">
        <div className="h-20 w-20">
          <img
            src={testimonial.image || '/placeholder.svg'}
            alt={testimonial.author}
            className="rounded-full object-cover ring-2 ring-emerald-600"
          />
        </div>
        <p className="font-medium tracking-wider text-emerald-800">
          {testimonial.tagline}
        </p>

        <p className="break-words text-slate-500">{testimonial.quote}</p>

        <p className="font-medium">{testimonial.author}</p>
      </CardContent>
    </Card>
  )
}
