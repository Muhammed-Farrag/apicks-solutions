/**
 * Continuous animated ticker bar for A-Picks Solutions.
 * Displays "MOTIVATED SELLERS ✳ QUALIFIED CONVERSATIONS ✳ INVESTOR-READY LEADS"
 * with an infinite seamless loop and pause-on-hover behavior.
 */
export function Marquee() {
  return (
    <div className="k-marquee" aria-hidden="true">
      <div className="k-marquee-track">
        MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span> MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span>MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span> MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span>MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span> MOTIVATED SELLERS <span>✳</span> QUALIFIED CONVERSATIONS <span>✳</span> INVESTOR-READY LEADS <span>✳</span>
      </div>
    </div>
  )
}
