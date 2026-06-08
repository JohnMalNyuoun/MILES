import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import defaultSiteContent from './content/defaultSiteContent'

const Navbar = ({ theme, toggleTheme, siteContent = defaultSiteContent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)

  const handleMenuToggle = () => setIsMenuOpen((s) => !s)
  const handleLinkClick = () => setIsMenuOpen(false)

  const primaryLinks = [
    { to: '/', label: 'Impact', end: true },
    { to: '/projects', label: 'Projects' },
    { to: '/workshops', label: 'Mentorship' },
    { to: '/about', label: 'Advocacy' },
    { to: '/admin', label: 'Admin' },
  ]

  const allLinks = [
    { to: '/', label: 'Impact', end: true },
    { to: '/about', label: 'About' },
    { to: '/team', label: 'Team' },
    { to: '/workshops', label: 'Workshops' },
    { to: '/projects', label: 'Projects' },
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
            className="inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface-container-low p-2 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to dark mode'}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
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
