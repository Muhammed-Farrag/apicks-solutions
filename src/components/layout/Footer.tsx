import { ArrowUpRight } from 'lucide-react'
import { Brand } from './Brand'
import { PageLink } from '../navigation/PageLink'

/**
 * Site footer displaying navigation links, brand mission, and legal copyright.
 */
export function Footer() {
  return (
    <footer className="k-footer">
      <div className="k-container k-footer-grid">
        <div>
          <Brand />
          <p>Real estate sales support for the conversations that move deals.</p>
        </div>
        <div>
          <span>EXPLORE</span>
          <PageLink page="about">About</PageLink>
          <PageLink page="services">Services</PageLink>
          <PageLink page="pricing">Pricing</PageLink>
          <PageLink page="leads">Lead room</PageLink>
        </div>
        <div>
          <span>GET ANSWERS</span>
          <PageLink page="faq">FAQ</PageLink>
          <PageLink page="contact">Contact</PageLink>
          <PageLink page="account">Account access</PageLink>
        </div>
        <div>
          <span>CONTACT</span>
          <div className="k-footer-contact-item">
            <span>Tel: </span>
            <a href="tel:+14014225616">(401) 422-5616</a>
          </div>
          <div className="k-footer-contact-item">
            <span>WhatsApp: </span>
            <a href="https://wa.me/14014225616" target="_blank" rel="noopener noreferrer">
              +1 (401) 422-5616
            </a>
          </div>
          <div className="k-footer-contact-item">
            <span>Email: </span>
            <a href="mailto:info@apicks-solutions.com">info@apicks-solutions.com</a>
          </div>
          <div className="k-footer-contact-item">
            <span>Address: </span>
            <span>Albuquerque, NM</span>
          </div>
        </div>
        <div className="k-footer-cta">
          <span>THE NEXT DEAL IS OUT THERE.</span>
          <PageLink page="contact">
            LET’S FIND THE OPENING. <ArrowUpRight size={30} />
          </PageLink>
        </div>
      </div>
      <div className="k-container k-footer-bottom">
        <span>© 2026 A-PICKS SOLUTIONS</span>
        <span>ALBUQUERQUE, NEW MEXICO</span>
        <PageLink page="home">BACK TO THE TOP ↑</PageLink>
      </div>
    </footer>
  )
}
