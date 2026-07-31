import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import defaultSiteContent from './content/defaultSiteContent'

const heroImageModules = import.meta.glob('./assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
})

const heroImages = Object.entries(heroImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([, imageUrl]) => imageUrl)

const Hero = ({ siteContent = defaultSiteContent }) => {
  const heroContent = siteContent.hero || defaultSiteContent.hero
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentHeroImage = useMemo(() => {
    if (!heroImages.length) {
      return ''
    }

    return heroImages[currentImageIndex % heroImages.length]
  }, [currentImageIndex])

  useEffect(() => {
    if (heroImages.length <= 1) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((previousIndex) => (previousIndex + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="hero-section relative min-h-[819px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="MILES Community"
          className="w-full h-full object-cover"
          src={currentHeroImage}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative z-10 text-center px-margin-mobile max-w-4xl mx-auto space-y-6">
        <h1
          className="font-manrope text-4xl md:text-display-lg uppercase tracking-[0.2em] font-extrabold"
          style={{ color: 'var(--hero-foreground)' }}
        >
          MILES
        </h1>
        <p
          className="font-manrope text-headline-lg-mobile md:text-headline-lg max-w-2xl mx-auto font-bold"
          style={{ color: 'var(--hero-foreground)' }}
        >
          {heroContent.subtitle || 'Mothers in Learning, Empowerment & Support'}
        </p>
        <p
          className="font-manrope text-body-lg max-w-2xl mx-auto"
          style={{ color: 'var(--hero-foreground)', opacity: 0.95 }}
        >
          {heroContent.description || 'Empowering mothers and girls through education, community support, and mentorship.'}
        </p>
        <div className="pt-4">
          <Link
            to="/learn"
            className="inline-block px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--hero-foreground)',
              border: '1px solid var(--hero-foreground)',
            }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

