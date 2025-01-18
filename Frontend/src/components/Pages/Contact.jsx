import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import React, { useEffect } from 'react'
import ContactBG from '../../assets/ContactBG.webp'

function Contact() {
  useEffect(() => {
    window.scroll(0,0)
  })

  return (
    <section className='min-w-[160%] md:min-w-[100%]'>
      <div
        className="bg-cover bg-center text-center text-white pt-32 pb-16"
        style={{ backgroundImage: `url(${ContactBG})` }}
      >
        <p className="text-5xl font-bold tracking-wide">CONTACT US</p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 p-6 md:p-16">
        <div className="bg-blue-900 w-full px-6 py-12 rounded-lg">
          <div className="flex flex-col-reverse items-start text-white mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Get in Touch</h3>
            <p className="text-lg md:text-xl">Contact us</p>
          </div>

          <form className="w-full flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <p className="text-base md:text-lg">First Name</p>
              <input
                type="text"
                className="w-full bg-black border border-blue-500 rounded-md outline-none text-white p-2 text-sm md:text-base"
                placeholder="Enter your first name"
              />
            </label>

            <label className="flex flex-col gap-1">
              <p className="text-base md:text-lg">Last Name</p>
              <input
                type="text"
                className="w-full bg-black border border-blue-500 rounded-md outline-none text-white p-2 text-sm md:text-base"
                placeholder="Enter your last name"
              />
            </label>

            <label className="flex flex-col gap-1">
              <p className="text-base md:text-lg">Email</p>
              <input
                type="email"
                className="w-full bg-black border border-blue-500 rounded-md outline-none text-white p-2 text-sm md:text-base"
                placeholder="Enter your email address"
              />
            </label>

            <label className="flex flex-col gap-1">
              <p className="text-base md:text-lg">Message</p>
              <textarea
                className="w-full bg-black border border-blue-500 rounded-md outline-none text-white p-2 text-sm md:text-base resize-none h-32"
                placeholder="Enter your message"
              />
            </label>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-semibold text-lg md:text-xl py-3 px-6 rounded-full hover:bg-blue-600 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <p className="text-xl md:text-2xl text-center">
            We would love to hear from you! Whether you’re a customer interested in our products, an artisan looking to partner with us, or simply want to learn more about what we do, please reach out.
          </p>

          <div className="flex flex-col md:flex-row w-[90%] mx-auto flex-wrap gap-8 justify-between items-center">
            <div className="flex flex-col items-center text-white w-full md:w-[30%]">
              <FaPhoneAlt className="text-4xl" />
              <h3 className="my-4 text-xl">Call us:</h3>
              <p className="text-center">+234 708 900 0010</p>
            </div>

            <div className="flex flex-col items-center text-white w-full md:w-[30%]">
              <FaEnvelope className="text-4xl" />
              <h3 className="my-4 text-xl">Mail us:</h3>
              <p className="text-center">info@hclerald.com.ng</p>
            </div>

            <div className="flex flex-col items-center text-white w-full md:w-[30%]">
              <FaWhatsapp className="text-4xl" />
              <h3 className="my-4 text-xl">Message us:</h3>
              <p className="text-center">+234 708 900 0010</p>
            </div>

            <div className="flex flex-col items-center text-white w-full md:w-[30%]">
              <FaMapMarkerAlt className="text-4xl" />
              <h3 className="my-4 text-xl">Visit us:</h3>
              <p className="text-center">Ground Floor, 2 Woodberry Grove, London, England N12 0DR</p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-center mt-8">
            Follow us on social media and join the conversation about local craftsmanship and the beauty of handmade products.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
