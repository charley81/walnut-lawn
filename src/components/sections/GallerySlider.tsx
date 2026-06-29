import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'

interface GallerySliderProps {
  images: string[]
}

export function GallerySlider({ images }: GallerySliderProps) {
  const plugin = React.useRef(Autoplay({ delay: 3000 }))

  if (!images.length) {
    // Fallback: load local images
    const modules = import.meta.glob<{ default: { src: string } }>('../../images/work/*', { eager: true })
    images = Object.values(modules).map((module) => module.default.src)
  }

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
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
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
