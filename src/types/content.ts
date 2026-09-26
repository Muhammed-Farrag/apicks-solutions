export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
}

export interface BenefitItem {
  number: string
  title: string
  description: string
}

export interface WorkProcessStep {
  step: string
  title: string
  description: string
}

export interface MetricItem {
  value: string
  label: string
}
