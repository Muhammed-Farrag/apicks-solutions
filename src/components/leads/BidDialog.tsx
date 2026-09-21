import { useRef, useState } from 'react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import type { Lead } from '../../types'
import { PageLink } from '../navigation/PageLink'
import { useBodyScrollLock, useFocusTrap } from '../../hooks'

export interface BidDialogProps {
  lead: Lead
  close: () => void
}

/**
 * Modal dialog displaying detailed lead information, illustrative opening bid,
 * bid preview amount calculation, and accessible focus trapping.
 */
export function BidDialog({ lead, close }: BidDialogProps) {
  const [value, setValue] = useState(String(lead.opening))
  const [reviewed, setReviewed] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useBodyScrollLock(true)
  useFocusTrap(ref, true, close, '.k-dialog-close')

  const amount = Number(value)

  return (
    <div
      className="k-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <section
        className="k-bid-dialog"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bid-title"
      >
        <button className="k-dialog-close" onClick={close} aria-label="Close bid preview">
          <X size={22} />
        </button>
        <div className="k-bid-image">
          <img src={lead.image} alt={`Illustrative property: ${lead.title}`} draggable={false} />
          <span>LEAD ROOM / {lead.id}</span>
        </div>
        <div className="k-bid-content">
          <span>OPPORTUNITY PREVIEW / {lead.id}</span>
          <h2 id="bid-title">
            {lead.title}
            <em>.</em>
          </h2>
          <p>
            {lead.city}, {lead.state} · {lead.category}
          </p>
          <div className="k-bid-description">{lead.description}</div>
          <div className="k-bid-tags">
            {lead.details.map((item) => (
              <span key={item}>
                <Check size={13} />
                {item}
              </span>
            ))}
          </div>
          <div className="k-bid-line">
            <span>ILLUSTRATIVE OPENING BID</span>
            <strong>${lead.opening}</strong>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (amount >= lead.opening) setReviewed(true)
            }}
          >
            <label htmlFor="bid-preview-amount">YOUR BID PREVIEW</label>
            <div>
              <span>$</span>
              <input
                id="bid-preview-amount"
                type="number"
                min={lead.opening}
                step="1"
                required
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  setReviewed(false)
                }}
              />
              <button className="k-action k-action-mint" type="submit">
                REVIEW AMOUNT <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
          {reviewed && (
            <p className="k-bid-reviewed" role="status">
              ${amount.toLocaleString()} reviewed. This sample bid has not been submitted.
            </p>
          )}
          <PageLink page="account" className="k-underlink" onClick={close}>
            GET ACCESS TO LIVE LEADS <ArrowUpRight size={16} />
          </PageLink>
          <small>Sample property and pricing. This preview does not place a bid.</small>
        </div>
      </section>
    </div>
  )
}
