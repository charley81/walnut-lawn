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
    <Carousel className="w-full">
      <CarouselContent className="-ml-4">
        {testimonials.map((src, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="">
              <Card className="overflow-hidden">
                <CardContent className="aspect-square items-center justify-center">
                  {/* Image */}
                  <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-green-100">
                    <img
                      src={
                        typeof src.image === 'string' ? src.image : src.image
                      }
                      alt={src.author}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Tagline */}
                  <p className="font-light tracking-wide uppercase">
                    {src.tagline}
                  </p>

                  {/* Quote */}
                  <p className="text-gray-500">{src.quote}</p>

                  {/* Author */}
                  <p className="font-medium text-gray-900">{src.author}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  )
}
