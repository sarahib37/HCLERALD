import React, { useEffect, useState } from 'react'
import ProductBG from '../../assets/Products.webp'
import ProductsList from '../../data/ProductsList'
import { FaArrowRight } from 'react-icons/fa'
import ShippingList from '../../data/ShippingList'
import ArtisanImage from '../../assets/Artisan.webp'
import { Link } from 'react-router-dom'

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Furniture")
  const [loadingImages, setLoadingImages] = useState({})
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    window.scroll(0,0)
  })

  function handleSelectCategory(menu) {
    setSelectedCategory(menu)
  }

  const handleImageLoad = (desc) => {
    setLoadingImages((prevState) => ({ ...prevState, [desc]: false }))
  }

  return (
    <section className='min-w-[160%] md:min-w-[100%]'>
        <img src={ProductBG} alt='Product Page Background' className='w-full'/>
        <div className="flex flex-col gap-8 p-4 md:p-8">
          <p className="text-lg md:text-xl">
            Explore our range of locally made products, crafted with love and quality:
          </p>
          <nav className="flex justify-center">
            <ul className="flex flex-wrap gap-4 md:gap-8 text-base md:text-lg list-none m-0 p-0">
              {ProductsList.map((products) => (
                <li
                  key={products.Category}
                  onClick={() => handleSelectCategory(products.Category)}
                  className={`cursor-pointer ${
                    products.Category === selectedCategory
                      ? "underline text-blue-600"
                      : "hover:underline hover:text-blue-600"
                  }`}
                >
                  {products.Category}
                </li>
              ))}
            </ul>
          </nav>

          {ProductsList.map((products) => {
            if (products.Category === selectedCategory) {
              return (
                <div key={products.Category} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {products.Description.map((desc) => (
                      <div key={desc.Sub}>
                        <p>
                          <span className="font-bold">{desc.Sub}</span> {desc.Desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
                    {products.Images.map((image) => (
                      <div key={image.Desc} className="relative w-full h-56 md:h-72">
                        {loadingImages[image.Desc] !== false && (
                          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg"></div>
                        )}
                        <img
                          src={image.Image}
                          alt={image.Desc}
                          className={`w-full h-full object-cover rounded-lg ${
                            loadingImages[image.Desc] === false ? "block" : "hidden"
                          }`}
                          onLoad={() => handleImageLoad(image.Desc)}
                        />
                        <p className="text-center mt-2">{image.Desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          })}
          <Link to="/quote-form"><button className="mx-auto mt-8 bg-blue-600 text-white rounded-full px-6 py-3 text-lg font-bold flex items-center gap-2 hover:bg-blue-700">
            Make your custom quote <FaArrowRight /> 
          </button></Link>
        </div>

        <div className="px-6 py-8 flex flex-col gap-16">
          <div>
            <h3 className="text-3xl text-center font-bold">SHIPPING INFORMATION PAGE</h3>
            <p className="text-lg text-left mt-4">
              At HCLerald Limited, we prioritize the smooth delivery of your purchases:
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-around mt-12 gap-6">
              <p className="text-5xl font-bold lg:w-1/5 text-center">
                Shipping Made Easy
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                {ShippingList.map((shipping, index) => (
                  <div
                    key={index}
                    className="bg-white text-black flex flex-col items-center p-4 rounded-lg shadow-md"
                  >
                    {!imageLoaded && (
                      <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                    )}
                    <img
                      src={shipping.image}
                      alt={shipping.Title}
                      className={`w-full h-48 object-cover rounded-md ${
                        imageLoaded ? 'block' : 'hidden'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <h3 className="text-lg font-semibold mt-4 text-center">{shipping.Title}</h3>
                    <p className="text-sm text-center mt-2">{shipping.Desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-16">
            <h3 className="text-3xl text-center font-bold">THE ARTISAN CONNECTION</h3>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <p className="text-lg lg:w-3/5 leading-relaxed text-justify">
                Every product we offer comes from a local artisan, each with a unique story and craft.
                By purchasing from Hclerald Limited, you are not only acquiring a beautiful item but
                also supporting the livelihoods of artisans and their families.
              </p>
              <div className="w-full lg:w-2/5">
                {!imageLoaded && (
                  <div className="w-full h-80 bg-gray-300 animate-pulse rounded-md"></div>
                )}
                <img
                  src={ArtisanImage}
                  alt="Artisan"
                  className={`w-full h-80 object-cover rounded-md ${
                    imageLoaded ? 'block' : 'hidden'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/artisan"><button className="flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-base rounded-lg transition hover:bg-white hover:text-black hover:border-black border-2"
              >
                Join us (Artisan)
                <FaArrowRight />
              </button></Link>
              <Link to="/quote-form"><button className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-black font-bold text-base rounded-lg transition hover:bg-black hover:border hover:border-black hover:text-white">
                Make a Quote
                <FaArrowRight />
              </button></Link>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Products