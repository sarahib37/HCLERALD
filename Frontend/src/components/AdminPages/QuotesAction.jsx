import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from "react-slick"
import { updateQuotes } from '../../redux/user/quoteSlice'

function QuotesAction() {
    const quotes = useSelector((state) => state.quote.quotes)
    const { id } = useParams()
    const [formData, setFormData] = useState({})
    const { currentUser } = useSelector((state) => state.user)
    const today = new Date()
    const quote = quotes.find((quote) => quote.id === id)
    const dispatch = useDispatch()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.price && !formData.productionDays && !formData.status) {
            alert("Please fill in at least one field to update the quote.")
            return
        }
        try {
            const response = await fetch(`https://hclerald.vercel.app/api/quote/updateQuote/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to update the quote.")
            }

            const data = await response.json()
            dispatch(updateQuotes(data))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8">
            <header className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Today <span>{formattedDate}</span></h3>
                <div className=" items-center hidden md:flex bg-blue-900 text-white font-bold px-4 py-2 rounded-full cursor-pointer">
                    <FaUser className="mr-2" />
                    <span>{currentUser.username}</span>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-2">
                    <h3 className="text-2xl font-bold mb-4">Edit Quote</h3>
                    <table className="w-full border-collapse text-sm mb-4">
                        <tbody>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Name</th>
                                <td className="border px-4 py-2">{quote.username}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Product Type</th>
                                <td className="border px-4 py-2">{quote.type}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Product Category</th>
                                <td className="border px-4 py-2">{quote.category}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Quantity</th>
                                <td className="border px-4 py-2">{quote.quantity}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Price</th>
                                <td className="border px-4 py-2">{quote.price || 'Null'}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Created Date</th>
                                <td className="border px-4 py-2">{quote.createdDate}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Description</th>
                                <td className="border px-4 py-2">{quote.description}</td>
                            </tr>
                            <tr>
                                <th className="border px-4 py-2 text-right font-bold bg-blue-900 text-white">Images</th>
                                <td className="border px-4 py-2">
                                    <div className="max-w-md mx-auto">
                                        {quote.images && quote.images.length > 0 ? (
                                            <Slider {...sliderSettings}>
                                                {quote.images.map((image, index) => (
                                                    <div key={index}>
                                                        <img
                                                            src={image}
                                                            alt={`Quote Image ${index + 1}`}
                                                            className="w-full h-auto object-cover rounded shadow"
                                                        />
                                                    </div>
                                                ))}
                                            </Slider>
                                        ) : (
                                            'No Images Available'
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col gap-4 bg-black text-black p-4 rounded shadow-md"
                >
                    <h3 className="text-xl font-bold text-white">Quote Action</h3>

                    <label className="flex flex-col gap-2 text-white"> 
                        <p className="font-bold">Price</p>
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-white">
                        <p className="font-bold">Delivery Date</p>
                        <input
                            type="date"
                            name="productionDays"
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        />
                    </label>

                    <label className="flex flex-col gap-2 text-white">
                        <p className="font-bold">Status</p>
                        <select
                            name="status"
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                        >
                            <option value="new">New</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="w-full bg-blue-900 text-white p-2 rounded hover:bg-gray-500 transition"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </section>
    )
}

export default QuotesAction
