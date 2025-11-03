'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { testimonials } from '@/data/testimonials'

export function TestimonialCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {testimonials.map((src, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="h-full">
              <Card className="overflow-hidden p-4">
                <CardContent className="flex flex-col gap-y-4">
                  <img
                    src={src.image}
                    alt=""
                    className="h-16 w-16 rounded-full border-2 border-emerald-500"
                  />
                  <p className="font-light">{src.tagline}</p>
                  <p className="tracking-wider text-slate-500">{src.quote}</p>
                  <p className="mt-auto font-medium">{src.author}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
