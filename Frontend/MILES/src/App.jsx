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
import FocusDetail from './components/FocusDetail'
import Donate from './components/Donate'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import AdminRoute from './components/AdminRoute'


const  App = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('miles-theme')
        return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light'
    })

    useEffect(() => {
        document.body.classList.remove('theme-light', 'theme-dark')
        document.body.classList.add(`theme-${theme}`)
        localStorage.setItem('miles-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <Router>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
                <Route path="/" element={<><Hero /><Home /></>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/focus/:topic" element={<FocusDetail />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
            <Footer />
        </Router>

    )
}

export default App;
