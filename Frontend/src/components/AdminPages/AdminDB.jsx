import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { FaUser } from "react-icons/fa"

ChartJS.register(ArcElement, Tooltip, Legend)

const AdminDB = () => {
  const today = new Date()
  const quotes = useSelector((state) => state.quote.quotes)
  const users = useSelector((state) => state.user.users)
  const { currentUser } = useSelector((state) => state.user)

  const [statusCounts, setStatusCounts] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalVisitors: 0,
    totalDelivered: 0,
  })

  const [pieChartData, setPieChartData] = useState(null)

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    if (!quotes.length) return

    const totalRevenue = quotes.reduce((sum, quote) => {
      const price = Number(quote.price)
      return price ? sum + price : sum
    }, 0)

    const totalOrders = quotes.length

    const totalVisitors = users.filter((user) => !user.admin).length

    const totalDelivered = quotes.filter((quote) => quote.status === "delivered").length

    setStatusCounts({
      totalRevenue,
      totalOrders,
      totalVisitors,
      totalDelivered,
    })

    const categoryCounts = {}
    quotes.forEach((quote) => {
      const category = quote.category || "Uncategorized"
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    })

    const labels = Object.keys(categoryCounts)
    const data = Object.values(categoryCounts)
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ]

    setPieChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    })
  }, [quotes, users])

  return (
    <section className="md:min-w-[90vw] p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="font-bold text-lg">
            Today <span className="block sm:inline">{formattedDate}</span>
          </h3>
          <div className="items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-base hidden md:flex">
            <FaUser className="mr-2" />
            <span>{currentUser.username}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          Welcome, {currentUser.username}!!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Revenue", value: `₦${statusCounts.totalRevenue}` },
            { title: "Total Orders", value: statusCounts.totalOrders },
            { title: "Total Visitors", value: statusCounts.totalVisitors },
            { title: "Total Delivered", value: statusCounts.totalDelivered },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white p-4 rounded-lg flex flex-col items-center"
            >
              <h3 className="font-bold">{metric.title}</h3>
              <p className="text-xl">{metric.value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-8 text-lg font-bold">
          Visual Representation of Orders by Category
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {pieChartData ? (
            <>
              <div className="w-72 h-72 lg:w-96 lg:h-96">
                <Pie
                  data={pieChartData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="flex flex-col gap-4">
                {pieChartData.labels.map((label, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          pieChartData.datasets[0].backgroundColor[index],
                      }}
                    ></span>
                    <span className="font-bold text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Loading category distribution...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminDB