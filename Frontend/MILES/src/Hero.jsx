import React from 'react'
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
        <h1 className="font-manrope text-4xl md:text-display-lg text-primary uppercase tracking-[0.2em] font-extrabold">
          MILES
        </h1>
        <p className="font-manrope text-headline-lg-mobile md:text-headline-lg text-on-background max-w-2xl mx-auto font-bold">
          {heroContent.subtitle || 'Mothers in Learning, Empowerment & Support'}
        </p>
        <p className="font-manrope text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          {heroContent.description || 'Empowering mothers and girls through education, community support, and mentorship.'}
        </p>
      </div>
    </section>
  )
}

export default Hero

