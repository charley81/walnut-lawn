import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { testimonials } from '@/data/testimonials'

export function TestimonialSlider() {
  return (
    <Carousel className="mx-auto w-full max-w-[2000px]">
      <CarouselContent className="-ml-2 md:-ml-4">
        {testimonials.map((testimonial) => (
          <CarouselItem
            key={testimonial.id}
            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
          >
            <div className="p-1">
              <Card className="overflow-hidden border-0 bg-white shadow-lg">
                <CardContent className="flex h-full flex-col gap-y-6 p-6">
                  {/* Image */}
                  <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-green-100">
                    <img
                      src={
                        typeof testimonial.image === 'string'
                          ? testimonial.image
                          : testimonial.image
                      }
                      alt={testimonial.author}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Tagline */}
                  <p className="font-light tracking-wide uppercase">
                    {testimonial.tagline}
                  </p>

                  {/* Quote */}
                  <p className="flex-grow text-gray-500">{testimonial.quote}</p>

                  {/* Author */}
                  <p className="font-medium text-gray-900">
                    {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 md:left-4" />
      <CarouselNext className="right-2 md:right-4" />
    </Carousel>
  )
}
