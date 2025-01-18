import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'
import { updateQuotes } from '../../redux/user/quoteSlice'
import { useNavigate } from 'react-router-dom'

function QuotesAdmin() {
  const today = new Date()

  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const data = await axios.get('https://hclerald.vercel.app/api/quote/quotes')
      setQuotes(data.data)
      dispatch(updateQuotes(data.data))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const handleEdit = (id) => {
    navigate(`/admin/actions/${id}`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        await axios.delete(`https://hclerald.vercel.app/api/quote/quotes/${id}`)
        setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id))
        alert('Quote deleted successfully!')
      } catch (error) {
        console.error('Error deleting quote:', error)
        alert('Failed to delete the quote. Please try again.')
      }
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <section className="flex flex-col items-center gap-6 px-4 md:px-8 py-4">
      <div className="w-full max-w-6xl mt-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-xl">
            Today <span>{formattedDate}</span>
          </h3>
          <div className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer text-lg">
            <FaUser className="mr-2" />
            <span>{currentUser.username}</span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-3xl font-bold">Welcome!!</h3>
          <p className="text-lg mt-2">View and manage all quotes made by your users:</p>

          {!loading ? (
            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-blue-900">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">S/N</th>
                    <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                    <th className="border border-gray-300 px-4 py-2">Quote Type</th>
                    <th className="border border-gray-300 px-4 py-2">Quote Category</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Delivery Date</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(quotes) &&
                    quotes.map((quote, index) => (
                      <tr key={quote.id} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{quote.username}</td>
                        <td className="border border-gray-300 px-4 py-2">{quote.type}</td>
                        <td className="border border-gray-300 px-4 py-2">{quote.category}</td>
                        <td className="border border-gray-300 px-4 py-2">{quote.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {quote.price ? quote.price : 'Null'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {quote.productionDays ? quote.productionDays : 'Null'}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{quote.status}</td>
                        <td className="border border-gray-300 px-4 py-2">{quote.createdDate}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <select
                            className="bg-black text-white px-2 py-1 cursor-pointer"
                            onChange={(e) => {
                              if (e.target.value === 'Edit') handleEdit(quote.id);
                              if (e.target.value === 'Delete') handleDelete(quote.id);
                            }}
                            defaultValue="default"
                          >
                            <option value="default" disabled>
                              Select an action
                            </option>
                            <option value="Edit">Edit</option>
                            <option value="Delete">Delete</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading quotes...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default QuotesAdmin
