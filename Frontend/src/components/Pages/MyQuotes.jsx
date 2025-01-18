import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyQuotes() {
  const quotes = useSelector((state) => state.quote.quotes)
  const userID = useSelector((state) => state.user.currentUser.uid)
  const userQuotes = quotes.filter((quote) => quote.uid === userID)

  console.log(quotes)
  console.log(userQuotes)

  useEffect(() => {
    window.scroll(0,0)
  })

  return (
    <section className="flex flex-col gap-12 px-6 md:px-20 pt-12 min-w-[200%] md:min-w-[100%]">
      <h2 className="text-center font-bold text-5xl font-archivo mt-12 pt-10">My Quotes</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-[4154f1] text-white">
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                ID
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Customer Name
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Quote Type
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Quote Category
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Quantity
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Price
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Status
              </th>
              <th className="px-4 py-3 border border-gray-300 text-center font-bold">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="odd:bg-black even:bg-[4154f1]">
            {userQuotes
            .map((quote, index) => {
              return(
                <tr className="" key={index+1}>
                  <td className="px-4 py-3 border border-gray-300 text-center">{index+1}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.username}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.type}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.category}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.quantity}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.price ? quote.price : 'null'}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.status ? quote.status : "pending"}</td>
                  <td className="px-4 py-3 border border-gray-300 text-center">{quote.createdDate}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Link to="/quote-form">
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-black font-bold text-base rounded-lg transition hover:bg-black hover:border hover:border-black hover:text-white mx-auto">
              Make a Quote
              <FaArrowRight />
        </button>
      </Link>
    </section>
  );
}

export default MyQuotes;
