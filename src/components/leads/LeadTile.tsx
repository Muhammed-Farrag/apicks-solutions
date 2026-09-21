import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Lead } from '../../types'
import { dragLink, pageUrl } from '../../utils/url'
import { useRoute } from '../navigation/RouteContext'

export interface LeadTileProps {
  lead: Lead
  index: number
  onOpen?: (lead: Lead) => void
}

/**
 * Opportunity card displaying property imagery, location, opening illustrative price,
 * and triggering the modal bid dialog.
 */
export function LeadTile({ lead, index, onOpen }: LeadTileProps) {
  const route = useRoute()
  const handleOpen = onOpen ?? route.openLead

  return (
    <article
      className="k-lead-tile"
      data-reveal
      style={{ '--delay': `${index * 100}ms` } as CSSProperties}
    >
      <a
        href={pageUrl('leads', lead.id)}
        onDragStart={dragLink}
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return
          }
          event.preventDefault()
          handleOpen(lead)
        }}
        aria-label={`View ${lead.title} in the A-Picks lead room`}
      >
        <img
          src={lead.image}
          alt={`Illustrative property: ${lead.title}`}
          loading="lazy"
          draggable={false}
          width="670"
          height="765"
        />
        <span className="k-image-corner">
          <ArrowUpRight size={24} />
        </span>
      </a>
      <div className="k-lead-tile-body">
        <span>
          0{index + 1} / {lead.id} <b>ILLUSTRATIVE</b>
        </span>
        <h3>{lead.title}</h3>
        <div>
          {lead.city}, {lead.state} <span>·</span> {lead.category}
        </div>
        <button onClick={() => handleOpen(lead)}>
          OPEN BID PREVIEW <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  )
}
