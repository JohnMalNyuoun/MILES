import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './navbar'
import Hero from './Hero'
import Team from './Team'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Learn from './components/Learn'
import Projects from './components/Projects'
import Workshops from './components/Workshops'
import Blog from './components/Blog'
import DigitalLiteracy from './components/DigitalLiteracy'
import FocusDetail from './components/FocusDetail'
import Donate from './components/Donate'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import AdminRoute from './components/AdminRoute'
import defaultSiteContent from './content/defaultSiteContent'


const  App = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('miles-theme')
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
    })

    useEffect(() => {
        document.body.classList.remove('theme-light', 'theme-dark')
        document.body.classList.add(`theme-${theme}`)
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('miles-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
    }

    const [siteContent, setSiteContent] = useState(defaultSiteContent)

    useEffect(() => {
        const loadSiteContent = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
                const response = await fetch(`${apiBaseUrl}/api/content`)

                if (!response.ok) {
                    return
                }

                const content = await response.json()
                setSiteContent((current) => ({ ...current, ...content }))
            } catch (error) {
                setSiteContent(defaultSiteContent)
            }
        }

        loadSiteContent()
    }, [])

    return (
        <Router>
            <Navbar theme={theme} toggleTheme={toggleTheme} siteContent={siteContent} />
            <Routes>
                <Route path="/" element={<><Hero siteContent={siteContent} /><Home siteContent={siteContent} /></>} />
                <Route path="/about" element={<About siteContent={siteContent} />} />
                <Route path="/contact" element={<Contact siteContent={siteContent} />} />
                <Route path="/team" element={<Team />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/digital-literacy" element={<DigitalLiteracy />} />
                <Route path="/learn" element={<Learn siteContent={siteContent} />} />
                <Route path="/focus/:topic" element={<FocusDetail />} />
                <Route path="/donate" element={<Donate siteContent={siteContent} />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
            <Footer />
        </Router>

    )
}

export default App;
