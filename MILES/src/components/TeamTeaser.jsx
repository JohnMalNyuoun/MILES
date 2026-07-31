import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import nyajuokImg from '../assets/NyajuitFounder.png'
import bhanImg from '../assets/Bhan.jpeg'
import abrahamImg from '../assets/abraham.jpeg'
import johnImg from '../assets/John.jpeg'
import nyaluitImg from '../assets/Nyaluit.jpeg'

const imageMap = {
  'NyajuitFounder.png': nyajuokImg,
  'Nyajuok.jpeg': nyajuokImg,
  'Bhan.jpeg': bhanImg,
  'abraham.jpeg': abrahamImg,
  'John.jpeg': johnImg,
  'Nyaluit.jpeg': nyaluitImg,
}

const TeamTeaser = () => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
        const response = await fetch(`${apiBaseUrl}/api/team?profile=team&featured=true`)
        if (!response.ok) return
        const data = await response.json()
        setMembers(Array.isArray(data) ? data.slice(0, 4) : [])
      } catch {
        setMembers([])
      }
    }
    load()
  }, [])

  if (!members.length) return null

  return (
    <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-[#0E1A14] text-white">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {members.map((member) => {
            const src = member.image ? imageMap[member.image] : null
            return (
              <div key={member._id || member.name} className="flex flex-col items-center text-center">
                {src ? (
                  <img
                    src={src}
                    alt={member.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10" />
                )}
                <h3 className="mt-5 font-manrope text-body-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="mt-1 font-manrope text-label-md" style={{ color: '#1D9E75' }}>
                  {member.role}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/team"
            className="font-manrope text-label-md font-semibold hover:underline"
            style={{ color: '#1D9E75' }}
          >
            Meet the Full Team &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TeamTeaser
