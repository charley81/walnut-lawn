import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { ImageMetadata } from 'astro'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../../images/work/*',
  {
    eager: true,
  },
)

const images = Object.values(modules).map((module) => module.default.src)

export function GallerySlider() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }))

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-4">
        {images.map((src, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div>
              <Card className="overflow-hidden">
                <CardContent className="aspect-square items-center justify-center">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
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
