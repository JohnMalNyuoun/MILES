import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultSiteContent from '../content/defaultSiteContent'
import TeamTeaser from './TeamTeaser'
import aprilSessionsImage from '../assets/April sessions pre.jpg'

const kakumaReasons = [
  {
    title: 'A generation born into displacement',
    body: 'Most youth in Kakuma have grown up inside the camp with limited exposure to computers, smartphones, or the internet. Without digital skills, they are locked out of the modern economy before they ever get a chance to compete in it.',
  },
  {
    title: 'School alone is not enough',
    body: 'Classrooms here are overcrowded and under-resourced, and the national curriculum offers very little practical ICT training. Digital literacy fills that gap so learners can research, type assignments, and prepare for exams and scholarships on their own.',
  },
  {
    title: 'Online work is the new opportunity',
    body: 'Remote jobs, online freelancing, digital trade, and refugee-friendly platforms are some of the few income paths available inside the camp. None of them are reachable without basic computer, email, and internet skills.',
  },
  {
    title: 'Safety and dignity online',
    body: 'Young people, especially young women and mothers, are increasingly targeted by online scams, misinformation, and exploitation. Teaching safe internet use protects them and gives them confidence to participate online on their own terms.',
  },
  {
    title: 'A bridge to resettlement and higher education',
    body: 'Resettlement interviews, university applications, and scholarship portals (DAFI, WUSC, online universities) are all digital. Digital literacy is often the difference between a youth accessing those doors and missing them entirely.',
  },
  {
    title: 'Breaking the cycle for the next generation',
    body: 'When a young mother learns to use a computer, her children grow up around someone who already knows. Digital skills do not stay with one person and spread through families and the wider Kakuma community.',
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
      {/* The Kakuma Reality & Our Response — always dark, exempt from theme toggle */}
      <section
        className="kakuma-reality"
        style={{
          backgroundImage: `linear-gradient(rgba(var(--kakuma-overlay-rgb), 0.86), rgba(var(--kakuma-overlay-rgb), 0.86)), url(${aprilSessionsImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="reality-header">
          <h2>The Reality in Kakuma</h2>
          <p>
            These are not statistics. These are the daily lived experiences of girls and young
            mothers in Kakuma Refugee Camp &mdash; and the reason MILES exists.
          </p>
        </div>

        <div className="reality-grid">
          {/* Row 1 */}
          <div className="reality-challenge">
            <span className="challenge-label">The Challenge</span>
            <h3>School Dropout &amp; Lost Education</h3>
            <p>
              Girls in Kakuma are forced out of school due to early pregnancy, with no pathway
              back. Education becomes a closed door.
            </p>
          </div>
          <div className="reality-divider" aria-hidden="true">&rarr;</div>
          <div className="reality-response">
            <span className="response-label">How MILES Responds</span>
            <h3>Academic Re-enrollment &amp; Mentorship</h3>
            <p>
              We actively mentor young mothers and advocate directly with schools to reopen their
              doors and support continued education.
            </p>
          </div>

          {/* Row 2 */}
          <div className="reality-challenge">
            <span className="challenge-label">The Challenge</span>
            <h3>Child &amp; Forced Marriage</h3>
            <p>
              Cultural pressure and poverty push girls into early marriage, stripping them of
              choice, agency, and their future.
            </p>
          </div>
          <div className="reality-divider" aria-hidden="true">&rarr;</div>
          <div className="reality-response">
            <span className="response-label">How MILES Responds</span>
            <h3>Community Involvement Sessions</h3>
            <p>
              We engage elders, families, and community leaders in structured dialogue to shift
              mindsets and protect girls from harmful practices.
            </p>
          </div>

          {/* Row 3 */}
          <div className="reality-challenge">
            <span className="challenge-label">The Challenge</span>
            <h3>Gender-Based Violence &amp; Peer Pressure</h3>
            <p>
              GBV is widespread and underreported. Girls face physical, psychological, and
              economic violence with little protection.
            </p>
          </div>
          <div className="reality-divider" aria-hidden="true">&rarr;</div>
          <div className="reality-response">
            <span className="response-label">How MILES Responds</span>
            <h3>Peer-Led Resilience Structures</h3>
            <p>
              We build strong peer support networks that give girls safe spaces, confidence, and
              tools to counter violence and pressure.
            </p>
          </div>

          {/* Row 4 */}
          <div className="reality-challenge">
            <span className="challenge-label">The Challenge</span>
            <h3>Isolation &amp; Limited Opportunity</h3>
            <p>
              Young mothers in Kakuma are often invisible &mdash; no networks, no mentors, no one
              to show them what&apos;s possible.
            </p>
          </div>
          <div className="reality-divider" aria-hidden="true">&rarr;</div>
          <div className="reality-response">
            <span className="response-label">How MILES Responds</span>
            <h3>Mentorship &amp; Community Networks</h3>
            <p>
              We connect young mothers with mentors and community figures who open doors, share
              resources, and walk the journey with them.
            </p>
          </div>
        </div>
      </section>

      <section className="section digital-kakuma-section">
        <span className="digital-kakuma-eyebrow">The Reality in Kakuma</span>
        <h2>Why Digital Literacy for Youth in Kakuma?</h2>
        <p>
          Kakuma Refugee Camp is home to hundreds of thousands of young people whose futures are
          being shaped under exceptional pressure &mdash; limited resources, restricted movement,
          and a job market that has gone almost entirely online. Digital literacy is no longer a
          bonus skill here; it is a lifeline.
        </p>

        <div className="digital-kakuma-grid">
          {kakumaReasons.map((reason, index) => (
            <article key={reason.title} className="digital-kakuma-card">
              <span className="digital-kakuma-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
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

