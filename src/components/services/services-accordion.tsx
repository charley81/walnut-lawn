import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Service {
  id: string
  title: string
  description: string
}

interface ServicesAccordionProps {
  services: Service[]
}

export default function ServicesAccordion({
  services,
}: ServicesAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {services.map((service) => (
        <AccordionItem key={service.id} value={service.id}>
          <AccordionTrigger className="py-4 text-lg font-semibold hover:no-underline">
            {service.title}
          </AccordionTrigger>
          <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closes]:animate-accordion-up pb-4 leading-relaxed text-gray-600">
            {service.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
