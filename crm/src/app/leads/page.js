"use client"
import { useState, useEffect } from 'react'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch, faChevronDown, faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import LeadForm from "@/components/leadform"
import UpdateLeadForm from "@/components/updateleads"

const leadStatusColors = {
  "Not Contacted": "bg-blue-100 text-blue-800",
  "Attempted": "bg-yellow-100 text-yellow-800",
  "Warm Lead": "bg-green-100 text-green-800",
  "Cold Lead": "bg-red-100 text-red-800",
}

export default function Leads() {
  const [activeLeadStatus, setActiveLeadStatus] = useState("All Leads")
  const [searchQuery, setSearchQuery] = useState("")
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [view, setView] = useState("Table")
  const [leads, setLeads] = useState([])
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [leadToUpdate, setLeadToUpdate] = useState(null)
  const [selectedLeads, setSelectedLeads] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    try {
      const response = await fetch("http://3.140.199.145:8000/api/leads/")
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error("Error fetching leads data:", error)
    }
  }

  const addLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead])
  }

  const getFilteredLeads = () => {
    let filtered = leads
    if (activeLeadStatus !== "All Leads") {
      filtered = filtered.filter((lead) => lead.Lead_Status === activeLeadStatus)
    }
    if (searchQuery) {
      filtered = filtered.filter((lead) =>
        lead.Name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return filtered
  }

  const getLeadsCountByStatus = (Lead_Status) => {
    return leads.filter(
      (lead) => Lead_Status === "All Leads" || lead.Lead_Status === Lead_Status
    ).length
  }

  const handleViewClick = (viewType) => {
    setView(viewType)
  }

  const handleLeadStatusClick = (Lead_Status) => {
    setActiveLeadStatus(Lead_Status)
  }

  const toggleLeadForm = () => {
    setShowLeadForm((prev) => !prev)
  }

  const handleDeleteLead = async () => {
    try {
      const deleteRequests = selectedLeads.map(async (leadId) => {
        const response = await fetch(`http://3.140.199.145:8000/api/leads//${leadId}`, {
          method: "DELETE",
        })
        if (!response.ok) throw new Error("Failed to delete lead")
      })

      await Promise.all(deleteRequests)

      setLeads(leads.filter((lead) => !selectedLeads.includes(lead.id)))
      setSelectedLeads([])
      setShowDropdown(false)
    } catch (error) {
      console.error("Error deleting lead:", error)
    }
  }

  const handleEditLead = () => {
    const lead = leads.find((lead) => lead.id === selectedLeads[0])
    setLeadToUpdate(lead)
    setShowUpdateForm(true)
    setShowDropdown(false)
  }

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    )
    setSelectedLeads([])
  }

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    if (newSelectAll) {
      const allLeadIds = getFilteredLeads().map((lead) => lead.id)
      setSelectedLeads(allLeadIds)
    } else {
      setSelectedLeads([])
    }
  }

  const handleSelectLead = (leadId) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(leadId)
        ? prevSelected.filter((id) => id !== leadId)
        : [...prevSelected, leadId]
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Image src="/images/employee_contact.2d215fd6.svg" alt="logo" width={44} height={44} className="rounded-full bg-purple-100 p-2" />
            <h2 className="text-3xl font-bold text-indigo-800 flex items-center gap-2">
              All Leads <FontAwesomeIcon icon={faAngleDown} className="text-indigo-500" />
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLeadForm}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              {showLeadForm ? (
                <>
                  Close Lead Form <FontAwesomeIcon icon={faAngleUp} />
                </>
              ) : (
                <>
                  Create Lead <FontAwesomeIcon icon={faPlus} />
                </>
              )}
            </button>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-white hover:bg-gray-100 text-indigo-800 font-semibold py-2 px-4 border border-indigo-300 rounded-lg shadow transition duration-300 ease-in-out flex items-center gap-2 hover:shadow-md"
              >
                Actions <FontAwesomeIcon icon={faChevronDown} />
              </button>
              {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg text-sm bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        className="px-3 py-2 w-full text-left"
                        onClick={handleEditLead}
                        disabled={selectedLeads.length !== 1}
                      >
                        Update
                      </button>
                      <hr />
                      <button
                        className="px-3 py-2 w-full text-left"
                        onClick={handleDeleteLead}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search By Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
            />
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {["All Leads", "Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((Lead_Status) => (
              <button
                key={Lead_Status}
                onClick={() => handleLeadStatusClick(Lead_Status)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out ${
                  activeLeadStatus === Lead_Status
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {Lead_Status}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  activeLeadStatus === Lead_Status ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"
                }`}>
                  {getLeadsCountByStatus(Lead_Status)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleViewClick("Table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-l-lg text-sm font-medium transition duration-300 ease-in-out ${
              view === "Table" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faTable} />
            Table
          </button>
          <button
            onClick={() => handleViewClick("Kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-r-lg text-sm font-medium transition duration-300 ease-in-out ${
              view === "Kanban" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faColumns} />
            Kanban
          </button>
        </div>

        {view === "Table" ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-4 px-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="form-checkbox h-5 w-5text-indigo-600"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Lead Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Phone</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Stack</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Course</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-100">
                {getFilteredLeads().map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleSelectLead(lead.id)}
                        className="form-checkbox h-5 w-5text-indigo-600"
                      />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">{formatDate(lead.Datetime)}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${leadStatusColors[lead.Lead_Status]}`}>
                        {lead.Lead_Status}
                      </span>
                    </td>
                    {/* <td className="py-4 px-4 whitespace-nowrap">{lead.Datetime}</td> */}
                    <td className="py-4 px-4 whitespace-nowrap">{lead.Name}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{lead.Phone}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{lead.Stack}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{lead.Course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((Lead_Status) => (
              <div key={Lead_Status} className="bg-white rounded-lg shadow-md overflow-hidden">
                <h3 className={`font-bold text-lg p-4 ${leadStatusColors[Lead_Status]}`}>{Lead_Status}</h3>
                <div className="p-4 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {getFilteredLeads()
                    .filter((lead) => lead.Lead_Status === Lead_Status)
                    .map((lead) => (
                      <div key={lead.id} className="bg-indigo-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                        <p className="font-bold">{lead.Name}</p>
                        <p className="text-sm text-indigo-600">{lead.Contact_No}</p>
                        <p className="text-sm text-indigo-600">Created: {formatDate(lead.Date)}</p>
                        <p className="text-sm text-indigo-600">Stack: {lead.Tech_Stack}</p>
                        <p className="text-sm text-indigo-600">Course: {lead.Course}</p>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditLead(lead)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500  hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <LeadForm onClose={() => setShowLeadForm(false)} addLead={addLead} />
          </div>
        </div>
      )}

      {showUpdateForm && leadToUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <UpdateLeadForm
              lead={leadToUpdate}
              onClose={() => setShowUpdateForm(false)}
              onUpdate={updateLead}
            />
          </div>
        </div>
      )}
    </div>
  )
}