import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultSiteContent from '../content/defaultSiteContent'

function Home({ siteContent = defaultSiteContent }) {
  const homeContent = siteContent.home || defaultSiteContent.home
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribeError, setSubscribeError] = useState('')
  const [subscribeLoading, setSubscribeLoading] = useState(false)

  const handleSubscribe = async (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setSubscribeError('Please enter your email address.')
      return
    }

    setSubscribeError('')

    try {
      setSubscribeLoading(true)
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
      const response = await fetch(`${apiBaseUrl}/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Unable to subscribe right now.')
      }

      setSubscribed(true)
      setEmail('')
    } catch (error) {
      setSubscribeError(error.message || 'Unable to subscribe right now.')
    } finally {
      setSubscribeLoading(false)
    }
  }

  return (
    <main>
      {/* Welcome Section & Core Areas */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-manrope text-headline-lg font-bold text-primary">
              {homeContent.welcomeTitle || 'Welcome to MILES'}
            </h2>
            <p className="font-manrope text-body-lg text-on-surface-variant leading-relaxed">
              {homeContent.welcomeText ||
                'MILES is dedicated to uplifting mothers and girls by providing access to education, building strong community networks, and fostering mentorship opportunities that create lasting change.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/about"
                className="bg-primary text-on-primary px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:bg-surface-tint transition-colors inline-block"
              >
                Learn More
              </Link>
              <Link
                to="/team"
                className="border border-primary text-primary px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:bg-primary/10 transition-colors inline-block"
              >
                Meet Our Team
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Education Card */}
            <div className="home-focus-card bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all group flex flex-col h-full">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 block">school</span>
              <h3 className="font-manrope text-headline-md font-semibold text-primary mb-3">Education</h3>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Access learning resources and programs designed to help mothers continue their education journey.
              </p>
            </div>

            {/* Community Card */}
            <div className="home-focus-card bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all group flex flex-col h-full">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 block">groups</span>
              <h3 className="font-manrope text-headline-md font-semibold text-primary mb-3">Community Role</h3>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Join a supportive network of mothers who share experiences, advice, and encouragement.
              </p>
            </div>

            {/* Mentorship Card */}
            <div className="home-focus-card bg-surface-container-low p-8 rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all group flex flex-col h-full">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 block">psychology</span>
              <h3 className="font-manrope text-headline-md font-semibold text-primary mb-3">Mentorship</h3>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Connect with mentors who guide and inspire you to reach your full potential.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-12">
          <Link
            to="/projects"
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:bg-surface-tint transition-colors flex items-center gap-2 inline-flex"
          >
            Our Projects
          </Link>
          <Link
            to="/donate"
            className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:opacity-90 transition-colors flex items-center gap-2 inline-flex"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            Donate
          </Link>
        </div>
      </section>

      {/* Pillars of Impact Section */}
      <section className="py-section-padding bg-surface-container-lowest">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="mb-12">
            <h2 className="font-manrope text-headline-lg font-bold text-primary mb-4">Our Pillars of Impact</h2>
            <p className="text-on-surface-variant max-w-3xl font-manrope text-body-lg">
              Mothers in Learning, Empowerment &amp; Support operates a comprehensive intervention framework to uplift young mothers and girls.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="home-pillars-card bg-surface-container p-6 rounded-xl border-l-4 border-primary shadow-sm hover:-translate-y-1 transition-transform flex flex-col h-full">
              <h4 className="font-manrope text-headline-md font-semibold text-primary mb-4">Academic Re-enrollment</h4>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Actively monitoring, mentoring, and establishing pathways for young mothers to return to school and continue their education.
              </p>
            </div>
            <div className="home-pillars-card bg-surface-container p-6 rounded-xl border-l-4 border-primary shadow-sm hover:-translate-y-1 transition-transform flex flex-col h-full">
              <h4 className="font-manrope text-headline-md font-semibold text-primary mb-4">Pregnancy Prevention</h4>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Deploying targeted workshops and awareness tracks to safeguard young girls, offering guidance, resources, and advocacy.
              </p>
            </div>
            <div className="home-pillars-card bg-surface-container p-6 rounded-xl border-l-4 border-primary shadow-sm hover:-translate-y-1 transition-transform flex flex-col h-full">
              <h4 className="font-manrope text-headline-md font-semibold text-primary mb-4">Resilience Against Peer Pressure</h4>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Building strong peer-led support structures to combat negative social pressure and empower young women with confidence.
              </p>
            </div>
            <div className="home-pillars-card bg-surface-container p-6 rounded-xl border-l-4 border-primary shadow-sm hover:-translate-y-1 transition-transform flex flex-col h-full">
              <h4 className="font-manrope text-headline-md font-semibold text-primary mb-4">Community Mentorship</h4>
              <p className="text-on-surface-variant text-body-md font-manrope">
                Providing personalized family monitoring, community networks, and critical intervention advocacy alongside mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advocacy Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container-high rounded-[2rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10 max-w-4xl">
            <h2 className="font-manrope text-headline-lg font-bold text-primary mb-6">
              Advocacy &amp; GBV Prevention
            </h2>
            <p className="font-manrope text-body-lg text-on-surface-variant mb-12 leading-relaxed">
              Challenging deep-rooted cultural beliefs and protecting the girl child from dangerous traditional practices.
              Click to explore our complete protection framework.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="home-advocacy-item space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">security</span>
                </div>
                <h5 className="font-manrope text-headline-md font-semibold text-on-background">Countering GBV</h5>
                <p className="text-on-surface-variant text-body-md font-manrope">
                  Systematically breaking down the silence surrounding physical, psychological, and economic violence against women and girls.
                </p>
              </div>
              <div className="home-advocacy-item space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">shield</span>
                </div>
                <h5 className="font-manrope text-headline-md font-semibold text-on-background">Eradicating Harmful Practices</h5>
                <p className="text-on-surface-variant text-body-md font-manrope">
                  Confronting child, early, and forced marriages, and female genital mutilation (FGM) which strip girls of their dignity.
                </p>
              </div>
              <div className="home-advocacy-item space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">campaign</span>
                </div>
                <h5 className="font-manrope text-headline-md font-semibold text-on-background">Community Awareness</h5>
                <p className="text-on-surface-variant text-body-md font-manrope">
                  Engaging traditional elders and youth leaders in structured dialogue to shift community mindsets and replace outdated dogmas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-section-padding bg-primary/5 text-center px-margin-mobile">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-manrope text-headline-lg font-bold text-on-background">Join Our Mission</h2>
          <p className="font-manrope text-body-lg text-on-surface-variant">
            Stay updated with our latest stories of impact and community projects.
          </p>
          {subscribed ? (
            <p className="text-primary font-manrope text-body-lg font-semibold">
              Thank you for joining! We&apos;ll keep you updated.
            </p>
          ) : (
            <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubscribe}>
              <input
                className="flex-1 bg-surface-container-highest border border-outline rounded-lg px-6 py-3 text-on-surface font-manrope focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="bg-primary text-on-primary px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:bg-surface-tint transition-all whitespace-nowrap"
                type="submit"
                disabled={subscribeLoading}
              >
                {subscribeLoading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          )}
          {subscribeError && (
            <p className="text-red-500 font-manrope text-body-md font-semibold">{subscribeError}</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home

