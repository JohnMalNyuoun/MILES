import React, { useEffect, useState } from 'react'
import nyajuokImg from './assets/Nyajuok.jpeg'
import bhanImg from './assets/Bhan.jpeg'
import abrahamImg from './assets/abraham.jpeg'
import johnImg from './assets/John.jpeg'
import nyaluitImg from './assets/Nyaluit.jpeg'

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const imageMap = {
        'Nyajuok.jpeg': nyajuokImg,
        'Bhan.jpeg': bhanImg,
        'abraham.jpeg': abrahamImg,
        'John.jpeg': johnImg,
        'Nyaluit.jpeg': nyaluitImg,
    }

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
                const response = await fetch(`${apiBaseUrl}/api/team`)

                if (!response.ok) {
                    throw new Error('Failed to fetch team data')
                }

                const data = await response.json()
                setTeamMembers(data)
            } catch (err) {
                setError('Unable to load team members right now.')
            } finally {
                setLoading(false)
            }
        }

        fetchTeam()
    }, [])

    if (loading) {
        return (
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p>Loading team members...</p>
            </section>
        )
    }

    if (error) {
        return (
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p>{error}</p>
            </section>
        )
    }

    return (
        <section className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        {member.image && imageMap[member.image] ? (
                            <img src={imageMap[member.image]} alt={member.name} className="team-img" />
                        ) : (
                            <div className="team-img-placeholder" />
                        )}
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p>{member.bio}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Team
    