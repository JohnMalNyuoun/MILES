import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './assets/Logo.jpeg'
import defaultSiteContent from './content/defaultSiteContent'

const Navbar = ({ theme, toggleTheme, siteContent = defaultSiteContent }) =>  {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navRef = useRef(null)
    const navContent = siteContent.navbar || defaultSiteContent.navbar

    const handleMenuToggle = () => {
        setIsMenuOpen((currentState) => !currentState)
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }

    const themeIcon = theme === 'light' ? '☀' : '🌙'
    const themeLabel = theme === 'light' ? 'Day Mode' : 'Night Mode'
    const workshopLabel = navContent.workshopsLabel || defaultSiteContent.navbar.workshopsLabel
    const menuTitle = 'Menu'

    useEffect(() => {
        if (!isMenuOpen) return

        const handleOutsideTouch = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('pointerdown', handleOutsideTouch)

        return () => {
            document.removeEventListener('pointerdown', handleOutsideTouch)
        }
    }, [isMenuOpen])

    return (
        <nav className="navbar" ref={navRef}>
            <div className="navbar-brand">
                <button
                    className="menu-toggle menu-toggle-inline"
                    type="button"
                    onClick={handleMenuToggle}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <Link to="/" onClick={handleLinkClick}>
                    <span className="navbar-menu-title">{menuTitle}</span>
                </Link>
            </div>

            <div className="navbar-actions">
                <Link to="/" onClick={handleLinkClick} className="navbar-logo-link" aria-label="Go to home">
                    <img src={logo} alt="MILES Logo" className="navbar-logo" />
                </Link>

                <button className="theme-toggle" type="button" onClick={toggleTheme}>
                    <span aria-hidden="true">{themeIcon}</span>
                    <span>{themeLabel}</span>
                </button>
            </div>

            <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                <li><NavLink to="/" end onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.homeLabel}</NavLink></li>
                <li><NavLink to="/about" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.aboutLabel}</NavLink></li>
                <li><NavLink to="/workshops" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{workshopLabel}</NavLink></li>
                <li><NavLink to="/projects" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.projectsLabel}</NavLink></li>
                <li><NavLink to="/donate" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.donateLabel}</NavLink></li>
                <li><NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.contactLabel}</NavLink></li>
                <li><NavLink to="/admin" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active' : ''}>{navContent.adminLabel}</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar