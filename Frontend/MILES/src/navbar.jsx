import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/Logo.jpeg'
import defaultSiteContent from './content/defaultSiteContent'

const Navbar = ({ theme, toggleTheme, siteContent = defaultSiteContent }) =>  {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navContent = siteContent.navbar || defaultSiteContent.navbar

    const handleMenuToggle = () => {
        setIsMenuOpen((currentState) => !currentState)
    }

    const handleLinkClick = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" onClick={handleLinkClick}>
                    <img src={logo} alt="MILES Logo" className="navbar-logo" />
                    {navContent.brandText}
                </Link>
            </div>

            <div className="navbar-actions">
                <button className="theme-toggle" type="button" onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark Mode' : 'Day Mode'}
                </button>

                <button
                    className="menu-toggle"
                    type="button"
                    onClick={handleMenuToggle}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={handleLinkClick}>{navContent.homeLabel}</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>{navContent.aboutLabel}</Link></li>
                <li><Link to="/projects" onClick={handleLinkClick}>{navContent.projectsLabel}</Link></li>
                <li><Link to="/donate" onClick={handleLinkClick}>{navContent.donateLabel}</Link></li>
                <li><Link to="/contact" onClick={handleLinkClick}>{navContent.contactLabel}</Link></li>
                <li><Link to="/admin" onClick={handleLinkClick}>{navContent.adminLabel}</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar