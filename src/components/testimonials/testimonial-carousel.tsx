import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

interface Testimonial {
  id: number
  author: string
  tagline: string
  quote: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Mark & Sarah Johnson',
    tagline: 'SATISFIED LONG-TERM CUSTOMER',
    quote:
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
    image: '/images/testimonials/testimonial-4.png',
  },
  {
    id: 5,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/images/testimonials/testimonial-5.png',
  },
  {
    id: 6,
    author: 'The Carter Family',
    tagline: 'VALUE-CONSCIOUS PARENT',
    quote:
      "With three kids, our weekends are packed. Walnut Lawn gives us our Saturdays back. The price is fair for the peace of mind, and knowing we're supporting a local family business makes it even better. Highly recommend!",
    image: '/images/testimonials/testimonial-6.png',
  },
]

export function TestimonialCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  )

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
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

                    <p className="leading-relaxed text-pretty break-words text-slate-500">
                      {testimonial.quote}
                    </p>

                    <p className="font-medium">{testimonial.author}</p>
                  </CardContent>
                </Card>
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
