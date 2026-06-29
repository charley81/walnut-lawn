import TestimonialCard from './TestimonialCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

interface Testimonial {
  avatar?: any
  name: string
  tagline: string
  quote: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 3000 }))

  if (!testimonials?.length) return null

  return (
    <section className="w-full overflow-hidden px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i} className="w-full md:basis-1/2 lg:basis-1/3">
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-100" />
          <CarouselNext className="right-0 translate-x-1/2 border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-100" />
        </Carousel>
      </div>
    </section>
  )
}
