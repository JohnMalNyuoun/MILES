import React from 'react'
import fullpicImg from './assets/fullpic.jpeg'
import defaultSiteContent from './content/defaultSiteContent'


const Hero = ({ siteContent = defaultSiteContent }) => {
  const heroContent = siteContent.hero || defaultSiteContent.hero

  return (
    <section className="hero" style={{ backgroundImage: `url(${fullpicImg})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>{heroContent.title}</h1>
          <h2>{heroContent.subtitle}</h2>
          <p>{heroContent.description}</p>
         
        </div>
      </div>
      
    </section>
    
  )
}

export default Hero;
