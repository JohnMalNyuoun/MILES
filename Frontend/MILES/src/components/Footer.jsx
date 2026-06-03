import React from 'react'

const Footer = () => {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center'

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="mailto:milesproject@gmail.com">Email Us</a>
        <a href="tel:+254112419468">Contact Us</a>
        <a href={mapUrl} target="_blank" rel="noreferrer">Visit Us</a>
      </div>
      <p>&copy; 2026 MILES — Mothers in Learning, Empowerment &amp; Support. All rights reserved.</p>
    </footer>
  )
}

export default Footer
