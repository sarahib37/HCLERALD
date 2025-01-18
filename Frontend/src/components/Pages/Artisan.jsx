import React, { useEffect, useState } from 'react'
import ArtisanList from '../../data/ArtisanList'
import ArtisanBG from '../../assets/ArtisanBG.webp'
import CraftBG from "../../assets/CraftBG.webp"
import { FaArrowRight } from "react-icons/fa"

function Artisan() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    window.scroll(0,0)
  })

  return (
    <section className='flex flex-col gap-20 p-12 min-w-[160%] md:min-w-[100%]'>
        <div className="flex flex-col md:flex-row mt-12 items-center lg:justify-end w-full lg:h-[35em]">
          
          <div className="flex flex-col items-start px-6 py-8 w-[100%] md:w-1/2 lg:px-12">
            <h2 className="text-4xl lg:text-6xl font-bold font-archivo mb-4">
              WHY JOIN US?
            </h2>
            <p className="text-lg lg:text-2xl">
              HCLerald Limited welcomes local artisans to partner with us and
              showcase their crafts to the world.
            </p>
          </div>
          
          <img
            src={ArtisanBG}
            alt="Artisan Background"
            className="w-full md:w-[55%] h-auto object-cover"
          />
        </div>

        <div className="p-6">
          <p className="text-2xl font-bold text-center mb-8">
            By joining our network, artisans gain access to:
          </p>

          <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
              {ArtisanList.map((artisan, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row gap-8 items-center justify-center px-12 py-6 rounded-lg ${
                      artisan.Class === "blue"
                        ? "bg-white text-blue-900"
                        : "bg-blue-900 text-white"
                    }`}
                  >
                    <artisan.icon className="text-4xl" />

                    <div>
                      <h3 className="text-xl font-semibold mb-2">{artisan.title}</h3>
                      <p className="text-sm">{artisan.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 p-6">
          <div className="relative w-full md:w-1/2 flex justify-center">
            {!imageLoaded && (
              <div className="w-3/4 h-64 md:h-auto bg-gray-200 animate-pulse rounded-md"></div>
            )}
            <img
              src={CraftBG}
              alt="Craft Background"
              className={`w-4/4 rounded-md object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold">Application Process</h3>
            <p className="text-base md:text-lg text-justify">
              Interested artisans can apply by submitting their product catalog and
              a brief description of their craft. Our team will review applications
              and collaborate with successful candidates to promote their work.
            </p>
            <a
              href="https://forms.gle/GqVf3sCTSj75H1ow7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-base rounded-lg transition hover:bg-white hover:gap-6 hover:text-black hover:border-black border-2"
            >
              Join us (Artisan)
              <FaArrowRight />
            </a>

          </div>
        </div>
    </section>
    
  )
}

export default Artisan