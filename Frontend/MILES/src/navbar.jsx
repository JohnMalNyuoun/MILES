import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/Logo.jpeg'

const Navbar = ({ theme, toggleTheme }) =>  {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                    MILES
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
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/projects" onClick={handleLinkClick}>Projects</Link></li>
                <li><Link to="/donate" onClick={handleLinkClick}>Donate</Link></li>
                <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
                <li><Link to="/admin" onClick={handleLinkClick}>Admin</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar