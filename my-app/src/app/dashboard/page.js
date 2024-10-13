'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPhoneVolume, faSnowflake, faFire, faTimesCircle, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 300000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://20.205.130.55:8000/api/leads/")
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setRecords(data)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setError('Failed to load leads. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getLeadCounts = () => {
    const counts = {
      total: records.length,
      attempted: 0,
      coldLead: 0,
      warmLead: 0,
      notContacted: 0
    }

    records.forEach(record => {
      switch (record.Lead_Status) {
        case 'Attempted':
          counts.attempted++
          break
        case 'Cold Lead':
          counts.coldLead++
          break
        case 'Warm Lead':
          counts.warmLead++
          break
        case 'Not Contacted':
          counts.notContacted++
          break
      }
    })

    return counts
  }

  const getLeadStatusData = () => {
    const counts = getLeadCounts()
    return [
      { name: 'Attempted', value: counts.attempted, color: '#0088FE' },
      { name: 'Cold Lead', value: counts.coldLead, color: '#00C49F' },
      { name: 'Warm Lead', value: counts.warmLead, color: '#FFBB28' },
      { name: 'Not Contacted', value: counts.notContacted, color: '#FF8042' }
    ]
  }

  const getLeadsByDateData = () => {
    const dateCounts = records.reduce((acc, record) => {
      const date = new Date(record.Date).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    return Object.entries(dateCounts).map(([date, count]) => ({ date, count }))
  }

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let startAngle = 0

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform="translate(50,50)">
          {data.map((item, index) => {
            const angle = (item.value / total) * 360
            const largeArcFlag = angle > 180 ? 1 : 0
            const endAngle = startAngle + angle

            const start = polarToCartesian(startAngle)
            const end = polarToCartesian(endAngle)

            const pathData = [
              `M ${start.x} ${start.y}`,
              `A 40 40 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
              'L 0 0',
              'Z'
            ].join(' ')

            startAngle = endAngle
            return <path key={index} d={pathData} fill={item.color} />
          })}
        </g>
      </svg>
    )
  }

  const polarToCartesian = (angle) => {
    const radians = (angle - 90) * Math.PI / 180
    return {
      x: 40 * Math.cos(radians),
      y: 40 * Math.sin(radians)
    }
  }

  const LineGraph = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count))
    const points = data.map((d, i) => `${i * (100 / (data.length - 1))},${100 - (d.count / maxCount) * 100}`).join(' ')

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#0088FE"
          strokeWidth="2"
          points={points}
        />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={i * (100 / (data.length - 1))}
            cy={100 - (d.count / maxCount) * 100}
            r="2"
            fill="#0088FE"
          />
        ))}
      </svg>
    )
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen text-2xl text-gray-600">Loading dashboard...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-2xl text-red-600">{error}</div>

  const leadCounts = getLeadCounts()
  const leadStatusData = getLeadStatusData()
  const leadsByDateData = getLeadsByDateData()

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-gray-800">Lead Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Total Leads</h2>
              <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-2">{leadCounts.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Attempted</h2>
              <FontAwesomeIcon icon={faPhoneVolume} className="text-green-500 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-2">{leadCounts.attempted}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Cold Leads</h2>
              <FontAwesomeIcon icon={faSnowflake} className="text-blue-300 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-2">{leadCounts.coldLead}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Warm Leads</h2>
              <FontAwesomeIcon icon={faFire} className="text-orange-500 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-2">{leadCounts.warmLead}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">Not Contacted</h2>
              <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-xl" />
            </div>
            <p className="text-2xl font-bold mt-2">{leadCounts.notContacted}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FontAwesomeIcon icon={faChartPie} className="mr-2 text-blue-500" />
              Lead Status Distribution
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 mb-4">
                <PieChart data={leadStatusData} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {leadStatusData.map((status, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 mr-2" style={{ backgroundColor: status.color }}></div>
                    <span className="text-sm">{status.name}: {status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-500" />
              Leads by Date
            </h2>
            <div className="h-64 mb-4">
              <LineGraph data={leadsByDateData} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {leadsByDateData.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.date}:</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}