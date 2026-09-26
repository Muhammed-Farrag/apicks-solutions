import type {
  BenefitItem,
  CallerPackage,
  FaqItem,
  Lead,
  MetricItem,
  Page,
  ServiceItem,
  TestimonialItem,
  WorkProcessStep,
} from './types'

export type {
  BenefitItem,
  CallerPackage,
  FaqItem,
  Lead,
  MetricItem,
  Page,
  ServiceItem,
  TestimonialItem,
  WorkProcessStep,
}

export const heroMetrics: MetricItem[] = [
  { value: '25', label: 'ACTIVE CALLERS' },
  { value: '10', label: 'ON STANDBY' },
  { value: '16+', label: 'CLIENTS SERVED' },
  { value: '1,500+', label: 'LEADS MONTHLY' },
]

export const whatWeDoPoints = [
  'Ease and assist real estate wholesalers through their entire sales process',
  'Deliver cost-efficient solutions customized to specific business needs',
  'Build enduring client relationships through consistently high-quality service',
  'Handle everything from cold calling to closing so clients can focus on growth',
] as const

export const whyChooseUs: BenefitItem[] = [
  {
    number: '01',
    title: 'Fast Turnaround',
    description: 'Get results in 24–48 hours with our rapid-response appointment setting and lead qualification process.',
  },
  {
    number: '02',
    title: 'Expert Team',
    description: '25+ experienced callers dedicated to closing deals and maximizing your pipeline quality.',
  },
  {
    number: '03',
    title: 'Proven Results',
    description: '1,500+ leads delivered monthly across 16+ clients.',
  },
  {
    number: '04',
    title: 'Full Support',
    description: 'From cold calling to data management, we handle the entire sales funnel so clients can focus on closing.',
  },
]

export const leads: Lead[] = [
  { id: 'AP-101', title: 'The established ranch', city: 'Albuquerque', state: 'NM', image: './images/ranch.webp', category: 'Single family', opening: 75, description: 'An owner conversation with a clear investor follow-up path.', details: ['Seller contact', 'Investor fit', 'Follow-up brief'] },
  { id: 'AP-102', title: 'The brick townhouse', city: 'Columbus', state: 'OH', image: './images/townhouse.webp', category: 'Townhouse', opening: 90, description: 'An urban opportunity with a qualified conversation on record.', details: ['Qualified lead', 'Owner conversation', 'Next-step brief'] },
  { id: 'AP-103', title: 'The modern residence', city: 'Phoenix', state: 'AZ', image: './images/modern.webp', category: 'Single family', opening: 120, description: 'A recent owner discussion prepared for acquisition review.', details: ['Acquisition brief', 'Recent contact', 'Market fit'] },
]

export const services: ServiceItem[] = [
  {
    number: '01',
    name: 'Real Estate Cold Calling',
    short: 'Targeted outbound calling to connect with motivated sellers and qualified leads.',
    description: 'Targeted outbound calls connect your team with motivated sellers. Trained callers handle objections, document the conversation, and keep the pipeline active.',
    output: 'Seller conversations',
    steps: ['List alignment', 'Targeted calling', 'Qualified handoff'],
  },
  {
    number: '02',
    name: 'Realtor Appointment Setting',
    short: 'Book more appointments with motivated buyers and sellers through skilled outreach.',
    description: 'Skilled outreach qualifies prospective buyers and sellers before time is added to your calendar, so your team can focus on conversations with a clear next step.',
    output: 'Booked appointments',
    steps: ['Interest check', 'Qualification', 'Calendar handoff'],
  },
  {
    number: '03',
    name: 'JR & Senior Acquisition Managers',
    short: 'Experienced acquisition managers to support deal flow and negotiations.',
    description: 'Junior and senior acquisition managers support offer conversations, negotiation, and contract follow-through from early opportunity to closing.',
    output: 'Deal progression',
    steps: ['Opportunity review', 'Offer support', 'Follow-through'],
  },
  {
    number: '04',
    name: 'Data Management & List Pulling',
    short: 'Accurate list pulling and data management to keep the pipeline full.',
    description: 'Accurate list pulling, skip-tracing coordination, and ongoing data management give callers better information and investors a clearer view of the pipeline.',
    output: 'Investor-ready data',
    steps: ['List creation', 'Data enrichment', 'CRM delivery'],
  },
]

export const workProcessSteps: WorkProcessStep[] = [
  {
    step: '01',
    title: 'Discovery Call',
    description: "We learn about the client's business, goals, and challenges to customize our approach.",
  },
  {
    step: '02',
    title: 'Strategy & Setup',
    description: 'Our team develops a targeted outreach plan and builds lead lists.',
  },
  {
    step: '03',
    title: 'Outreach Campaign',
    description: 'We execute cold calling, appointment setting, and lead qualification.',
  },
  {
    step: '04',
    title: 'Results & Reporting',
    description: 'Weekly updates on appointments booked, leads qualified, and deals closed.',
  },
]

export const testimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: 'A-Picks Solutions helped our team close more deals in one month than we had in the previous quarter.',
    author: 'Jordan M.',
    role: 'Real Estate Investor',
  },
  {
    id: 'test-2',
    quote: 'Their outreach process is clear, professional, and consistently delivers high-quality leads.',
    author: 'Alex R.',
    role: 'Wholesaler',
  },
  {
    id: 'test-3',
    quote: 'From first call to final contract, the team was on point and made every step easier.',
    author: 'Sam K.',
    role: 'Acquisition Manager',
  },
]

export const trustBadges = [
  '24-Hour Response',
  'Proven Track Record',
  'Transparent Pricing',
  'Dedicated Support',
  'Expert Training',
  'Custom Solutions',
] as const

export const callerPackages: CallerPackage[] = [
  { name: 'Focused', callers: '2–3 callers', price: 1300, range: [2, 3], features: ['Dialer included', 'QA manager', 'Number rotation', 'Daily reports', '3,000+ dials/day'] },
  { name: 'Growth', callers: '4–8 callers', price: 1200, range: [4, 8], features: ['Everything in Focused', 'Client success manager', '6,000+ dials/day', '10+ qualified leads/day', 'Special skip-tracing pricing'] },
  { name: 'Scale', callers: '9+ callers', price: 1100, range: [9, 40], features: ['Everything in Growth', 'Dedicated acquisition manager', '10,000+ dials/day', 'Priority campaign management', 'Advanced reporting'] },
]

export const faqs: FaqItem[] = [
  { category: 'Getting started', question: 'How quickly can you set up appointments?', answer: 'We typically start outreach within 24 hours of your discovery call and book your first appointments within 48–72 hours.' },
  { category: 'Results', question: "What's your appointment qualification rate?", answer: 'Our appointment-to-close ratio averages 35–45% depending on your specific market and criteria.' },
  { category: 'Coverage', question: 'Do you work with international investors?', answer: 'Yes! We serve wholesalers and investors nationwide and have experience with cross-border deals.' },
  { category: 'Getting started', question: 'Can I see real results before committing?', answer: 'Absolutely. We offer a performance-based trial period so you can see our results firsthand.' },
  { category: 'Team', question: 'How are callers trained?', answer: 'Callers go through onboarding on scripts, objections, CRM tools, and real-estate terminology before working live leads.' },
  { category: 'Pricing', question: 'What does pricing include?', answer: 'The listed plans include dedicated callers, reporting, and CRM lead delivery. Acquisition management and skip tracing are available separately.' },
  { category: 'Pricing', question: 'Can I change or cancel a plan?', answer: 'Month-to-month plans with no long-term contracts allow you to scale or adjust your outreach capacity as deal volume evolves.' },
  { category: 'Getting started', question: 'How do I get started?', answer: 'Send your market, buying criteria, and outreach goals through our contact page or discovery call to begin onboarding.' },
]

export const homeFaqs: FaqItem[] = faqs.slice(0, 4)
