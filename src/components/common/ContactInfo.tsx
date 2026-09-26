/**
 * ContactInfo Component.
 *
 * Displays the core agency contact channels: Phone, Email, Location, and Business Hours.
 * Shared between the dedicated ContactPage and the landing page ContactSection.
 */
export function ContactInfo() {
  return (
    <div className="k-contact-info">
      <div>
        <span>PHONE</span>
        <a href="tel:+14014225616">+1 (401) 422-5616</a>
      </div>
      <div>
        <span>EMAIL</span>
        <a href="mailto:info@apicks-solutions.com">info@apicks-solutions.com</a>
      </div>
      <div>
        <span>LOCATION</span>
        <strong>Albuquerque, New Mexico</strong>
      </div>
      <div>
        <span>HOURS</span>
        <strong>Monday–Friday, 9am–6pm EST</strong>
      </div>
    </div>
  )
}
