import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  LucideConstruction,
  LucideHeartHandshake,
  LucideSunSnow,
  LucideHeartPulse,
  LucideImagePlus,
  LucideDroplet,
} from 'lucide-react'

const icons = {
  LucideConstruction,
  LucideHeartHandshake,
  LucideSunSnow,
  LucideHeartPulse,
  LucideImagePlus,
  LucideDroplet,
}

interface Service {
  id: string
  title: string
  description: string
  icon: keyof typeof icons
}

interface ServicesAccordionProps {
  services: readonly Service[]
}

export default function ServicesAccordion({
  services,
}: ServicesAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service) => {
        const Icon = icons[service.icon]
        return (
          <AccordionItem key={service.id} value={service.id} className="group">
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
