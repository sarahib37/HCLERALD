import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 min-h-screen h-[100%] bg-gray-900 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 md:w-16`}
      >
        <AdminSideBar />
      </div>

      <div className="flex-1 ml-0 md:ml-16">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
