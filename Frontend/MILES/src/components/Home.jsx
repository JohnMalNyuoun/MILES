import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultSiteContent from '../content/defaultSiteContent'
import TeamTeaser from './TeamTeaser'
import aprilSessionsImage from '../assets/April sessions pre.jpg'
import Project1Image from '../assets/Project1.jpg'

const challengesList = [
  {
    title: 'School Dropout & Lost Education',
    body: 'Girls in Kakuma are forced out of school due to early pregnancy, with no pathway back. Education becomes a closed door.',
  },
  {
    title: 'Child & Forced Marriage',
    body: 'Cultural pressure and poverty push girls into early marriage, stripping them of choice, agency, and their future.',
  },
  {
    title: 'Gender-Based Violence & Peer Pressure',
    body: 'GBV is widespread and underreported. Girls face physical, psychological, and economic violence with little protection.',
  },
  {
    title: 'Isolation & Limited Opportunity',
    body: "Young mothers in Kakuma are often invisible — no networks, no mentors, no one to show them what's possible.",
  },
]

const milesValues = [
  {
    title: 'Accountability',
    body: 'We take full ownership of our commitments, maintaining open, transparent reporting to our community, partners, and the youth we serve.',
  },
  {
    title: 'Commitment',
    body: 'We are dedicated to walking alongside girls and young mothers in Kakuma for the long haul, driving sustainable and lasting transformation.',
  },
  {
    title: 'Responsibility',
    body: 'We uphold the highest safeguarding standards to ensure every program creates a secure, dignified, and supportive space for everyone.',
  },
  {
    title: 'Integrity',
    body: 'We act with uncompromised ethics, honesty, and fairness, ensuring our lived refugee experience authentically guides every decision.',
  },
]

const whoWeServe = [
  {
    title: 'Young Mothers & Adolescent Girls',
    body: 'Girls and young mothers facing early pregnancy, school dropout, and structural barriers who need tailored support to reclaim their educational and economic potential.',
  },
  {
    title: 'Displaced Youth & Job Seekers',
    body: 'Young refugees living in Kakuma looking for practical skills, mentorship, and digital pathways to access remote work, scholarships, and higher education opportunities.',
  },
  {
    title: 'Local Community & Families',
    body: 'Elders, family members, and community leaders engaged through dialogue to build safe environments, fight GBV, and shift cultural mindsets around youth empowerment.',
  },
]

function Home({ siteContent = defaultSiteContent }) {
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
      {/* OUR MISSION SECTION WITH IMAGE BACKGROUND */}
      <section className="section py-10 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {/* Mission Image Banner with Text Inside */}
          <div 
            className="relative rounded-2xl overflow-hidden min-h-[360px] md:min-h-[420px] flex items-end p-6 md:p-10 shadow-sm"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 100%), url(${Project1Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-3xl text-left space-y-3 text-white">
              <span className="digital-kakuma-eyebrow block font-bold text-primary tracking-wider uppercase">
                OUR MISSION
              </span>
              <h2 className="font-manrope text-2xl md:text-4xl font-bold leading-tight drop-shadow-sm">
                Empowering Girls &amp; Young Mothers to Reclaim Their Future
              </h2>
              <p className="font-manrope text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl">
                MILES exists to dismantle systemic barriers facing adolescent girls and young mothers in Kakuma Refugee Camp. Through community-led advocacy, mentorship, and educational re-enrollment, we foster an environment where every young woman has the agency, safety, and skills to succeed.
              </p>
            </div>
          </div>

          {/* Pillar Cards Below the Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Advocacy &amp; Safety</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fighting GBV and early marriage by building community support networks and safe spaces.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Educational Access</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Re-opening school doors for young mothers forced out due to early pregnancy.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Youth Leadership</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mentoring displaced youth to access digital pathways, mentorship, and economic opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REALITY & CHALLENGES SECTION */}
      <section className="section py-8 md:py-10 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-left mb-6 space-y-1">
            <h2 className="font-manrope text-headline-md font-bold text-slate-900">
              The Reality in Kakuma
            </h2>
            <span className="digital-kakuma-eyebrow block font-bold">
              CHALLENGES MILES ADDRESSES
            </span>
            <p className="font-manrope text-body-md text-slate-600 max-w-2xl pt-1">
              These are not statistics. These are the daily lived experiences of girls and young mothers in Kakuma Refugee Camp &mdash; and the reason MILES exists.
            </p>
          </div>

          {/* Two Column Layout: Square Challenge Cards on Left, Flat Image on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left Column: 2x2 Square Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challengesList.map((item, index) => (
                <article
                  key={item.title}
                  className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 aspect-square flex flex-col justify-center transition-all hover:shadow-md"
                >
                  <span className="digital-kakuma-number font-bold block mb-1 text-xs text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>

            {/* Right Column: Flat Image */}
            <div className="w-full h-full min-h-[320px]">
              <img
                src={aprilSessionsImage}
                alt="Sessions in Kakuma Refugee Camp"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TARGETED IMPACT / WHO WE SERVE SECTION */}
      <section className="section impact-section bg-surface-container-low py-section-padding">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-left mb-12 space-y-2">
            <h2 className="font-manrope text-headline-lg font-bold text-on-background">
              Targeted Impact
            </h2>
            <span className="digital-kakuma-eyebrow block font-bold">
              WHO WE SERVE
            </span>
            <p className="font-manrope text-body-lg text-on-surface-variant max-w-2xl pt-2">
              Our initiatives focus directly on those who need community support, advocacy, and educational access the most inside Kakuma Refugee Camp.
            </p>
          </div>

          <div className="digital-kakuma-grid">
            {whoWeServe.map((item, index) => (
              <article 
                key={item.title} 
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md"
              >
                <span className="digital-kakuma-number font-bold block mb-2">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES SECTION */}
      <section className="section values-section py-section-padding bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-left mb-12 space-y-2">
            <h2 className="font-manrope text-headline-lg font-bold text-on-background">
              Our Core Values
            </h2>
            <span className="digital-kakuma-eyebrow block font-bold">
              GUIDED BY PRINCIPLE
            </span>
            <p className="font-manrope text-body-lg text-on-surface-variant max-w-2xl pt-2">
              These four foundational pillars guide every program we run, every partnership we build, and how we serve our community daily in Kakuma.
            </p>
          </div>

          <div className="digital-kakuma-grid">
            {milesValues.map((val) => (
              <article 
                key={val.title} 
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{val.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Team Teaser */}
      <TeamTeaser />

      {/* Newsletter / CTA */}
      <section
        className="py-section-padding text-center px-margin-mobile"
        style={{ backgroundColor: 'var(--bg-section-alt)' }}
      >
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
                className="subscribe-now-btn bg-primary text-on-primary px-8 py-3 rounded-lg font-manrope text-label-sm font-semibold hover:bg-surface-tint transition-all whitespace-nowrap"
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