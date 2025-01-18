import React, { useEffect, useState } from 'react'
import LandingBG from "../../assets/LandingBG.webp"
import Hand from '../../assets/HandShake.webp'
import Clay from '../../assets/ClayMould.webp'
import Thanks from '../../assets/ThankLocal.webp'
import { Link } from 'react-router-dom'

function Landing() {
  const [isLoading, setIsLoading] = useState({
    hand: true,
    clay: true,
    thanks: true,
  })

  useEffect(() => {
    window.scroll(0,0)
  })

  const handleImageLoad = (key) => {
    setIsLoading((prevState) => ({ ...prevState, [key]: false }))
  }

  return (
    <section>
      <div className="bg-cover bg-no-repeat bg-center min-w-[160%] md:min-w-[100%] w-full h-screen text-center flex flex-col justify-center items-center px-6 pt-50 mb-20"
      style={{ backgroundImage: `url(${LandingBG})` }}>

        <h1 className="font-archivo text-4xl md:text-6xl text-white font-bold drop-shadow-md">
          Welcome to HCLERALD Limited
        </h1>
        <p className="text-lg md:text-xl text-white font-semibold mt-4 max-w-lg md:max-w-2xl mx-auto drop-shadow-md">
          ...your premier source for locally made products crafted by skilled
          artisans.
        </p>
        <Link to='/about-us'><button className="mt-6 px-8 py-3 text-white border border-white rounded-full font-semibold text-lg md:text-xl hover:bg-white/50 backdrop-blur-lg hover:text-black transition-all">
          About us
        </button></Link>
      </div>
    
      <div className="px-6 md:px-12 flex flex-col gap-20 font-inter min-w-[160%] md:min-w-[100%]">
      
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-between">
          <p className="text-lg md:text-2xl leading-relaxed md:pr-8 max-w-[50%]">
            Our mission is to bridge the gap between talented local creators and customers both at home and abroad.
          </p>
          <div className="relative w-full md:w-1/2">
            {isLoading.hand && (
              <div className="w-full h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
            )}
            <img
              src={Hand}
              alt="Two hands shaking"
              className={`rounded-3xl w-full h-auto transition-opacity duration-500 ${
                isLoading.hand ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad('hand')}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-16 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            {isLoading.clay && (
              <div className="w-full h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
            )}
            <img
              src={Clay}
              alt="Clay molding process"
              className={`rounded-3xl w-full min-w-[45vw] h-auto transition-opacity duration-500 ${
                isLoading.clay ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad('clay')}
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 ml-8">
              Something to believe in...
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed md:pl-8">
              We believe in the power of local craftsmanship and are dedicated to ensuring that the unique stories and cultures behind each product reach a wider audience.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative w-full">
            {isLoading.thanks && (
              <div className="w-full h-64 bg-gray-200 rounded-3xl animate-pulse"></div>
            )}
            <img
              src={Thanks}
              alt="Thanks for shopping local banner"
              className={`rounded-3xl w-full h-[35em]  transition-opacity duration-500 ${
                isLoading.thanks ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => handleImageLoad('thanks')}
            />
          </div>
          <p className="text-center text-lg md:text-2xl leading-relaxed max-w-3xl">
            Discover the beauty of handmade items that reflect the essence of our community, and join us in supporting local artisans.
          </p>
        </div>
      </div>

    </section>
  )
}

export default Landing