import React from 'react'
import Logo from '../../assets/LogoPlaceHolder.webp'
import { FaDashcube, FaDoorOpen, FaRegStickyNote, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

function AdminSideBar() {
  const location = useLocation()

  const routes = [
    { path: '/admin', icon: <FaDashcube className="text-2xl" />, name: 'Dashboard' },
    { path: '/admin/quotes', icon: <FaRegStickyNote className="text-2xl" />, name: 'Quotes' },
    { path: '/admin/users', icon: <FaUser className="text-2xl" />, name: 'Users' },
  ]

  return (
    <div className="min-h-screen h-[100%] flex bg-[#0C0C12]">
      <div className="flex flex-col justify-between items-center py-6 px-3 pt-4 md:w-64 md:flex-col">
        <div className="flex flex-col items-center gap-4">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
          <div className="flex flex-col gap-6 items-center">
            {routes.map((route) => (
              <span
                key={route.path}
                className={`cursor-pointer p-[0.3em] rounded-md ${
                  location.pathname === route.path
                    ? 'bg-[#454564] text-white' 
                    : 'hover:bg-[#454564] hover:text-white'
                }`}
              >
                <Link to={route.path}>{route.icon}</Link>
              </span>
            ))}
          </div>
        </div>

        <Link to="/" className="mt-6">
          <FaDoorOpen className="text-xl cursor-pointer text-gray-400 hover:text-white" />
        </Link>
      </div>
    </div>
  )
}

export default AdminSideBar
