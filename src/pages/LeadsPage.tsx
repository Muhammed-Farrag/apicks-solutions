import { useState } from 'react'
import { ArrowUpRight, Search, ShieldCheck } from 'lucide-react'
import { leads } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero } from '../components/common'
import { LeadTile } from '../components/leads'

/**
 * Leads (Lead Room Preview) Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Utilizes shared `PageHero` with index 07 and 3D signal scene.
 * - Interactive category filters: All, Single family, Townhouse.
 * - Real-time keyword search bar filtering across property title, city, and state.
 * - Displays sample opportunity count badge.
 * - Renders grid of `LeadTile` components linking to the lead modal.
 * - Deep linking support (`?page=leads&lead=AP-101`) orchestrated cleanly by `Site.tsx`.
 * - Educational terms banner explaining live auction roadmap and verification rules.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Extract search and filtering logic into a custom `useLeadFilter` hook with debounce.
 * - Add pagination or infinite scroll for live database lead listings.
 * - Connect to live WebSocket / polling feed for real-time bid updates once backend is live.
 */
export function LeadsPage() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', 'Single family', 'Townhouse']
  const shown = leads.filter(
    (item) =>
      (filter === 'All' || item.category === filter) &&
      `${item.title} ${item.city} ${item.state}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <PageHero
        index="07"
        label="LEAD ROOM"
        title={<>FIND THE LEAD.<br /><em>MAKE YOUR MOVE.</em></>}
        description="Browse a sample of the lead-bidding experience. The properties, briefs, and bid amounts below are illustrative until live inventory is connected."
      >
        <PageLink page="account" className="k-action k-action-mint">GET ACCOUNT ACCESS <ArrowUpRight size={18} /></PageLink>
      </PageHero>
      <section className="k-leads-section k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>OPPORTUNITY BOARD / PREVIEW</span></div>
          <div className="k-lead-toolbar">
            <div role="group" aria-label="Filter leads">
              {categories.map((item) => (
                <button
                  key={item}
                  className={filter === item ? 'is-active' : ''}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label>
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search city or property"
                aria-label="Search leads"
              />
            </label>
          </div>
          <div className="k-lead-count">
            {shown.length.toString().padStart(2, '0')} SAMPLE OPPORTUNITIES <span>IMAGE LINKS OPEN THE A-PICKS LEAD ROOM</span>
          </div>
          {shown.length ? (
            <div className="k-lead-grid">
              {shown.map((item) => <LeadTile key={item.id} lead={item} index={leads.indexOf(item)} />)}
            </div>
          ) : (
            <div className="k-lead-empty">No sample leads match your search. Try another city or property type.</div>
          )}
          <div className="k-lead-terms">
            <ShieldCheck size={25} />
            <div>
              <strong>Bid with clarity when live access opens.</strong>
              <p>The preview lets you review an amount; no bid is submitted, charged, or stored. Live bidding needs verified accounts and a server-backed lead auction.</p>
            </div>
            <PageLink page="account">JOIN THE WAITLIST <ArrowUpRight size={17} /></PageLink>
          </div>
        </div>
      </section>
    </>
  )
}
