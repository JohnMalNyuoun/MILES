import React from 'react'

const Footer = () => {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Kakuma+Refugee+Camp+Scorpion+Center'

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 pt-20 pb-10">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center gap-gutter text-center">
        <span className="font-manrope text-headline-md font-black tracking-tighter text-primary">MILES</span>

        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="mailto:wmal44884@gmail.com"
            className="font-manrope text-label-sm text-on-surface-variant hover:text-primary underline transition-all"
          >
            Email Us
          </a>
          <a
            href="tel:+254112419468"
            className="font-manrope text-label-sm text-on-surface-variant hover:text-primary underline transition-all"
          >
            Contact Us
          </a>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="font-manrope text-label-sm text-on-surface-variant hover:text-primary underline transition-all"
          >
            Visit Us
          </a>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href="mailto:wmal44884@gmail.com"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Email"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
          </a>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Location"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </a>
        </div>

        <p className="font-manrope text-body-md text-on-surface-variant/60 mt-8 max-w-lg">
          &copy; 2026 MILES — Mothers in Learning, Empowerment &amp; Support. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

