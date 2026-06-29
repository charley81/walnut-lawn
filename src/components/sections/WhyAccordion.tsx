import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Feature {
  title: string
  answer: string
}

interface WhyAccordionProps {
  data: Feature[]
}

export default function WhyAccordion({ data }: WhyAccordionProps) {
  if (!data?.length) return null

  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item, i) => (
        <AccordionItem key={i} value={String(i)} className="group">
          <AccordionTrigger className="py-4 text-lg font-semibold">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closes]:animate-accordion-up pb-4 leading-relaxed text-gray-600">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
