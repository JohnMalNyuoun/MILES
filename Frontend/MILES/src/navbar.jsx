import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import defaultSiteContent from './content/defaultSiteContent'

const Navbar = ({ theme, toggleTheme, siteContent = defaultSiteContent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)

  const handleMenuToggle = () => setIsMenuOpen((s) => !s)
  const handleLinkClick = () => setIsMenuOpen(false)

  const whatWeDoLinks = [
    { to: '/projects', label: 'Projects' },
    { to: '/workshops', label: 'Mentorship' },
    { to: '/digital-literacy', label: 'Digital Literacy' },
  ]

  const primaryLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/contact', label: 'Get Involved' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'Advocacy' },
    { to: '/admin', label: 'Admin' },
  ]

  const allLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/contact', label: 'Get Involved' },
    { to: '/about', label: 'About' },
    { to: '/team', label: 'Team' },
    { to: '/blog', label: 'Blog' },
    { to: '/donate', label: 'Donate' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin', label: 'Admin' },
  ]

  useEffect(() => {
    if (!isMenuOpen) return
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsMenuOpen(false)
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [isMenuOpen])

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm"
    >
      <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link to="/" onClick={handleLinkClick}>
            <span className="font-manrope text-headline-lg font-black tracking-tighter text-primary">MILES</span>
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative group">
            <button
              type="button"
              className="font-manrope text-body-md text-on-surface-variant hover:text-primary transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-2"
            >
              What We Do
              <span className="material-symbols-outlined text-lg" aria-hidden="true">expand_more</span>
            </button>

            <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block min-w-[220px]">
              <div className="bg-background border border-outline-variant/40 rounded-xl shadow-lg py-2">
                {whatWeDoLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `block px-4 py-3 font-manrope text-body-md transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={Boolean(link.end)}
              className={({ isActive }) =>
                link.label === 'Admin'
                  ? isActive
                    ? 'font-manrope text-body-md text-on-primary bg-primary px-4 py-1 rounded-full'
                    : 'font-manrope text-body-md text-primary border border-primary px-4 py-1 rounded-full hover:bg-primary hover:text-on-primary transition-colors'
                  : isActive
                  ? 'font-manrope text-body-md text-primary border-b-2 border-primary pb-1'
                  : 'font-manrope text-body-md text-on-surface-variant hover:text-primary transition-colors'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/donate"
            onClick={handleLinkClick}
            className="hidden md:flex items-center px-6 py-2 rounded-full font-manrope text-label-sm font-semibold text-on-primary bg-primary hover:bg-surface-tint active:scale-95 transition-all"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center bg-transparent border-0 cursor-pointer text-2xl leading-none p-2 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-secondary)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span aria-hidden="true">{theme === 'dark' ? '\u263E' : '\u2600'}</span>
          </button>
          <button
            type="button"
            onClick={handleMenuToggle}
            className="md:hidden material-symbols-outlined text-on-surface-variant text-2xl bg-transparent border-0 cursor-pointer"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            menu
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/30 py-4 px-margin-mobile">
          <ul className="flex flex-col gap-1">
            <li>
              <div className="px-4 pt-3 pb-2 font-manrope text-label-sm font-semibold tracking-wide text-primary uppercase">
                What We Do
              </div>
            </li>
            {whatWeDoLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-manrope text-body-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10 border-l-2 border-primary'
                        : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {allLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={Boolean(link.end)}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-manrope text-body-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10 border-l-2 border-primary'
                        : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
