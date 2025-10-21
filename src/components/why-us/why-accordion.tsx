import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface DataProps {
  id: string
  title: string
  description: string
}

interface WhyAccordionProps {
  data: readonly DataProps[]
}

export default function WhyAccordion({ data }: WhyAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item: DataProps) => {
        return (
          <AccordionItem key={item.id} value={item.id} className="group">
            <AccordionTrigger className="py-4 text-lg font-semibold">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closes]:animate-accordion-up pb-4 leading-relaxed text-gray-600">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
