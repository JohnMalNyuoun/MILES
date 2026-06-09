import React from 'react'
import { Link } from 'react-router-dom'
import fullpicImg from './assets/fullpic.jpeg'
import defaultSiteContent from './content/defaultSiteContent'

const Hero = ({ siteContent = defaultSiteContent }) => {
  const heroContent = siteContent.hero || defaultSiteContent.hero

  return (
    <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="MILES Community"
          className="w-full h-full object-cover"
          src={fullpicImg}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto space-y-6">
        <h1
          className="font-manrope text-4xl md:text-display-lg uppercase tracking-[0.2em] font-extrabold"
          style={{ color: 'var(--green-primary)' }}
        >
          MILES
        </h1>
        <p
          className="font-manrope text-headline-lg-mobile md:text-headline-lg max-w-2xl mx-auto font-bold"
          style={{ color: '#FFFFFF' }}
        >
          {heroContent.subtitle || 'Mothers in Learning, Empowerment & Support'}
        </p>
        <p
          className="font-manrope text-body-lg max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {heroContent.description || 'Empowering mothers and girls through education, community support, and mentorship.'}
        </p>
        <div className="pt-4">
          <Link
            to="/learn"
            className="inline-block px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--green-primary)', color: 'var(--text-on-green)' }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

