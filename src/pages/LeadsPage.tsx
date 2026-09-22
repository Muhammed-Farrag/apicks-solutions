import { useState } from 'react'
import { ArrowUpRight, Search, ShieldCheck } from 'lucide-react'
import { leads } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero } from '../components/common'
import { LeadTile } from '../components/leads'
import { LEAD_CATEGORIES, filterLeads, formatOpportunityCount } from '../utils'

/**
 * Leads (Lead Room Preview) Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Pure filtering & case-insensitive search logic extracted to `src/utils/leads.ts`.
 * - Category list centralized as `LEAD_CATEGORIES`.
 * - Clear descriptive state naming (`selectedCategory`, `searchQuery`, `filteredLeads`).
 * - Formatted opportunity count extracted to pure helper `formatOpportunityCount`.
 */
export function LeadsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const filteredLeads = filterLeads(leads, selectedCategory, searchQuery)

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
              {LEAD_CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? 'is-active' : ''}
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <label>
              <Search size={17} />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search city or property"
                aria-label="Search leads"
              />
            </label>
          </div>
          <div className="k-lead-count">
            {formatOpportunityCount(filteredLeads.length)} SAMPLE OPPORTUNITIES <span>IMAGE LINKS OPEN THE A-PICKS LEAD ROOM</span>
          </div>
          {filteredLeads.length ? (
            <div className="k-lead-grid">
              {filteredLeads.map((lead) => (
                <LeadTile key={lead.id} lead={lead} index={leads.indexOf(lead)} />
              ))}
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
