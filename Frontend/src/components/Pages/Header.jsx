import React, { useEffect, useState } from 'react'
import Logo from '../../assets/LogoPlaceHolder.webp'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaBars, FaTimes, FaUser } from "react-icons/fa"

function Header() {
  const { currentUser, loading } = useSelector(state => state.user)

  console.log(currentUser)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="flex fixed top-0 left-0 right-0 items-center justify-between px-5 lg:px-10 m-4 bg-white/50 backdrop-blur-lg rounded-2xl gap-12 text-black z-50 shadow-md">
      <div className="lg:hidden">
        <button onClick={toggleMobileMenu} className="text-2xl"><FaBars /></button>
      </div>
      
      <Link to="/" className="flex items-center gap-2 text-black no-underline">
        <img src={Logo} alt="Logo" className="my-4" />
        <h2 className="font-archivo text-3xl font-bold ">HCLERALD</h2>
      </Link>
      <nav className='hidden lg:block'>
        <ul className="flex gap-10 text-xl font-bold">
          <li><Link to="/products" className="text-black no-underline hover:text-gray-700">Products</Link></li>
          <li><Link to="/how-it-works" className="text-black no-underline hover:text-gray-700">How it Works</Link></li>
          <li><Link to="/artisan" className="text-black no-underline hover:text-gray-700">Join us</Link></li>
          <li className="text-black no-underline hover:text-gray-700">Blog</li>
          <li><Link to="/contact" className="text-black no-underline hover:text-gray-700">Contact us</Link></li>
          {currentUser && <li><Link to="/quotes" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>My Quotes</Link></li>}
        </ul>
      </nav>
      <Link to={currentUser ? '/profile' : '/signin'}>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full cursor-pointer text-lg">
          {!currentUser ? 'SIGN IN' : (<div className='flex'>
            <FaUser className="mr-2" />
            <span>{loading ? "SIGN IN" :currentUser.username}</span>
          </div>)}
        </button>
      </Link>

      <div className={`fixed lg:hidden top-0 left-0 h-screen w-3/4 bg-white/50 backdrop-blur-lg shadow-lg z-30 p-6 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="lg:hidden ">
          <button onClick={toggleMobileMenu} className="text-2xl"><FaTimes /></button>
        </div>
        <ul className="flex flex-col gap-6 text-lg font-bold">
          <li><Link to="/products" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>Products</Link></li>
          <li><Link to="/how-it-works" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>How it Works</Link></li>
          <li><Link to="/artisan" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>Join us</Link></li>
          <li><Link to="/blog" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>Blog</Link></li>
          <li><Link to="/contact" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>Contact us</Link></li>
          {currentUser && <li><Link to="/quotes" className="text-black no-underline hover:text-gray-700" onClick={toggleMobileMenu}>My Quotes</Link></li>}
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  )
}

export default Header