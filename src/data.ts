import type { CallerPackage, FaqItem, Lead, Page, ServiceItem } from './types'

export type { CallerPackage, FaqItem, Lead, Page, ServiceItem }

export const leads: Lead[] = [
  { id: 'AP-101', title: 'The established ranch', city: 'Albuquerque', state: 'NM', image: './images/ranch.webp', category: 'Single family', opening: 75, description: 'An owner conversation with a clear investor follow-up path.', details: ['Seller contact', 'Investor fit', 'Follow-up brief'] },
  { id: 'AP-102', title: 'The brick townhouse', city: 'Columbus', state: 'OH', image: './images/townhouse.webp', category: 'Townhouse', opening: 90, description: 'An urban opportunity with a qualified conversation on record.', details: ['Qualified lead', 'Owner conversation', 'Next-step brief'] },
  { id: 'AP-103', title: 'The modern residence', city: 'Phoenix', state: 'AZ', image: './images/modern.webp', category: 'Single family', opening: 120, description: 'A recent owner discussion prepared for acquisition review.', details: ['Acquisition brief', 'Recent contact', 'Market fit'] },
]

export const services: ServiceItem[] = [
  { number: '01', name: 'Cold calling', short: 'Reach the sellers others never speak to.', description: 'Targeted outbound calls connect your team with motivated sellers. Trained callers handle objections, document the conversation, and keep the pipeline active.', output: 'Seller conversations', steps: ['List alignment', 'Targeted calling', 'Qualified handoff'] },
  { number: '02', name: 'Appointment setting', short: 'Turn interest into a real meeting.', description: 'Skilled outreach qualifies prospective buyers and sellers before time is added to your calendar, so your team can focus on conversations with a clear next step.', output: 'Booked appointments', steps: ['Interest check', 'Qualification', 'Calendar handoff'] },
  { number: '03', name: 'Acquisition support', short: 'Keep a deal moving after the first yes.', description: 'Junior and senior acquisition managers support offer conversations, negotiation, and contract follow-through from early opportunity to closing.', output: 'Deal progression', steps: ['Opportunity review', 'Offer support', 'Follow-through'] },
  { number: '04', name: 'Data & list pulling', short: 'A cleaner list makes every call count.', description: 'Accurate list pulling, skip-tracing coordination, and ongoing data management give callers better information and investors a clearer view of the pipeline.', output: 'Investor-ready data', steps: ['List creation', 'Data enrichment', 'CRM delivery'] },
]

export const callerPackages: CallerPackage[] = [
  { name: 'Focused', callers: '2–3 callers', price: 1300, range: [2, 3], features: ['Dialer included', 'QA manager', 'Number rotation', 'Daily reports', '3,000+ dials/day'] },
  { name: 'Growth', callers: '4–8 callers', price: 1200, range: [4, 8], features: ['Everything in Focused', 'Client success manager', '6,000+ dials/day', '10+ qualified leads/day', 'Special skip-tracing pricing'] },
  { name: 'Scale', callers: '9+ callers', price: 1100, range: [9, 40], features: ['Everything in Growth', 'Dedicated acquisition manager', '10,000+ dials/day', 'Priority campaign management', 'Advanced reporting'] },
]

export const faqs: FaqItem[] = [
  { category: 'Getting started', question: 'How quickly can you set up appointments?', answer: 'The existing A-Picks site says outreach typically starts within 24 hours of a discovery call, with first appointments within 48–72 hours.' },
  { category: 'Results', question: 'What is your appointment qualification rate?', answer: 'The existing site describes an appointment-to-close ratio averaging 35–45%, depending on market and buying criteria. Ask the team for current performance in your market.' },
  { category: 'Coverage', question: 'Do you work with international investors?', answer: 'Yes. A-Picks serves wholesalers and investors nationwide and has experience with cross-border deals.' },
  { category: 'Getting started', question: 'Can I see results before committing?', answer: 'The existing site describes a performance-based trial period. Contact the team to discuss the current terms and what success would look like for your campaign.' },
  { category: 'Team', question: 'How are callers trained?', answer: 'Callers go through onboarding on scripts, objections, CRM tools, and real-estate terminology before working live leads.' },
  { category: 'Pricing', question: 'What does pricing include?', answer: 'The listed plans include dedicated callers, reporting, and CRM lead delivery. Acquisition management and skip tracing are available separately.' },
  { category: 'Pricing', question: 'Can I change or cancel a plan?', answer: 'The existing site describes month-to-month plans with no long-term contract. Confirm current terms with A-Picks before starting.' },
  { category: 'Getting started', question: 'How do I get started?', answer: 'Send your market, buying criteria, and outreach goals through the contact page. The team can then arrange a discovery call and explain onboarding.' },
]
