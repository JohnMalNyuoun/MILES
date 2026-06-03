import React from 'react'
import { Link } from 'react-router-dom'
import fullpicImg from './assets/fullpic.jpeg'


const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${fullpicImg})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>MILES</h1>
          <h2>Mothers in Learning, Empowerment &amp; Support</h2>
          <p>Empowering mothers and girls through education, community support, and mentorship.</p>
         
        </div>
      </div>
      
    </section>
    
  )
}

export default Hero;
