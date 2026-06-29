import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  LucideConstruction,
  LucideHeartPulse,
  LucideSunSnow,
  LucideImagePlus,
  LucideDroplet,
} from 'lucide-react'

const icons: Record<string, React.ComponentType<any>> = {
  LucideConstruction,
  LucideHeartPulse,
  LucideSunSnow,
  LucideImagePlus,
  LucideDroplet,
}

interface Service {
  title: string
  icon: string
  description: string
}

interface ServicesAccordionProps {
  services: Service[]
}

export default function ServicesAccordion({ services }: ServicesAccordionProps) {
  if (!services?.length) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service, i) => {
        const Icon = icons[service.icon] || LucideConstruction
        return (
          <AccordionItem key={i} value={String(i)} className="group">
            <AccordionTrigger className="py-4 text-lg font-semibold">
              <div>
                <Icon className="size-8 text-slate-500 transition-all group-hover:text-emerald-500" />
                {service.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closes]:animate-accordion-up pb-4 leading-relaxed text-gray-600">
              {service.description}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
