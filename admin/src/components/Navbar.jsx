

import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setToken }) => {

  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }
  return (
    <header className="w-full border-b bg-black">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">

        {/* Logo wrapper (IMPORTANT) */}
        <div className="flex items-center max-w-[220px] gap-2">
          <img
            src={assets.logo}
            alt="Admin Logo"
            className="h-15 w-auto object-contain block"
          />
          <p className="text-white text-xl font-semibold">ADMIN</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => logoutHandler()}
          className="bg-white hover:scale-105 text-black px-5 py-2 rounded-full text-sm font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
