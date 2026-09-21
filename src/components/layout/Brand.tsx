import { PageLink } from '../navigation/PageLink'

export interface BrandProps {
  className?: string
}

/**
 * Reusable brand logo and title linked to the home page.
 */
export function Brand({ className }: BrandProps) {
  return (
    <PageLink page="home" className={className ?? 'k-brand'} ariaLabel="A-Picks Solutions home">
      <img src="./images/apicks-logo.webp" alt="" width="52" height="39" draggable={false} />
      <span>
        <strong>A-PICKS</strong>
        <small>SOLUTIONS</small>
      </span>
    </PageLink>
  )
}
