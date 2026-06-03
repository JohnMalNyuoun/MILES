import React from 'react';

function Contact() {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center';

  return (
    <div className="page">
      <h1>Contact Us</h1>
      <section className="section">
        <p>We'd love to hear from you. Reach out to learn more about our programs or to get involved.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> <a href="mailto:milesproject@gmail.com">milesproject@gmail.com</a></p>

          <p><strong>Phone:</strong> <a href="tel:+254112419468">+254 112 419 468</a></p>
          <p><strong>Address:</strong> <a href={mapUrl} target="_blank" rel="noreferrer">Kakuma Refugee Camp, Scorpion Center</a></p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
