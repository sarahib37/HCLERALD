import React, { useEffect, useState } from 'react'
import AboutBG from '../../assets/VisionBG.webp'
import { FaArrowRight } from 'react-icons/fa'
import AboutIMG from '../../assets/AboutUs.webp'
import { Link } from 'react-router-dom'
import Values from '../../data/ValuesList'

function AboutUs() {
  const [isImageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    window.scroll(0,0)
  })

  return (
    <section className='min-w-[160%] md:min-w-[100%] flex flex-col gap-12'>
      <div
        className="bg-cover bg-center w-full py-20 pt-[27em] md:pt-[38em] lg:pt-[45em] pb-[.5em] relative flex flex-col justify-between items-center gap-40 sm:gap-30" 
        style={{ backgroundImage: `url(${AboutBG})` }}
      >
        <h2 className="text-center text-5xl sm:text-7xl lg:text-8xl font-bold font-archivo mt-[-6em]">
          ABOUT US
        </h2>
        <p className="text-center text-base sm:text-lg lg:text-xl px-6 sm:px-16 lg:px-40 pb-50 mb-30">
          At Hclerald Limited, we envision a world where local artisans are celebrated, their craft valued, 
          and their talents shared globally. We are committed to promoting sustainability, fair trade 
          practices, and empowering local communities through the procurement of their high-quality, 
          handmade products.
        </p>
      </div>
      <div className="flex flex-col gap-8 px-6 sm:px-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-archivo text-center">
          OUR MISSION
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-center w-full sm:w-11/12 lg:w-9/12 mx-auto">
          Our mission is to provide a platform that connects local artisans with customers worldwide, fostering economic growth and cultural exchange while ensuring that every product not only meets high standards of quality but also resonates with authenticity.
        </p>
        <div className="relative w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] mx-auto">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
          )}
          <img
            src={AboutIMG}
            alt="About Us"
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="flex flex-row gap-4 sm:gap-8 justify-center">
          <Link to="/artisan">
            <button className="flex items-center gap-2 font-bold border border-white py-2 lg:py-4 px-6 rounded-full text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
              Join us (Artisan) <FaArrowRight />
            </button>
          </Link>
          <Link to="/products">
            <button className="flex items-center gap-2 font-bold bg-white text-black py-2 lg:py-4 px-6 rounded-full text-sm sm:text-base hover:bg-black hover:border-white hover:border hover:text-white transition-colors">
              View our Products <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-8 px-6 sm:px-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center font-archivo">
          OUR VALUES
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10">
          {Values.map((value, index) => (
            <div
              key={index}
              className="w-full sm:w-5/12 lg:w-1.01/2 flex flex-col gap-4 bg-white text-black p-6 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              <span className="text-4xl">{value.icon}</span>
              <h3 className="text-xl sm:text-2xl font-bold font-archivo">
                {value.title}
              </h3>
              <p className="text-sm sm:text-base">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs