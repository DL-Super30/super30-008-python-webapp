"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadForm from "../../components/leadform";
import UpdateLeadForm from "../../components/updateLead"; // Import UpdateLeadForm component

export default function Leads() {
  const [activeLeadStatus, setActiveLeadStatus] = useState("All Leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [view, setView] = useState("Table");
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [leadToUpdate, setLeadToUpdate] = useState(null);

  // Fetch leads from API
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch('http://localhost:3000/leads');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    }
    fetchLeads();
  }, []);

  // Filter leads based on status and search query
  const getFilteredLeads = () => {
    let filtered = leads;

    // Apply status filter
    if (activeLeadStatus !== "All Leads") {
      filtered = filtered.filter(lead => lead.status === activeLeadStatus);
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Get the count of leads by status
  const getLeadsCountByStatus = (status) => {
    // This counts all leads, even if a status filter is applied
    return leads.filter(lead => status === "All Leads" || lead.status === status).length;
  };

  const handleViewClick = (viewType) => {
    setView(viewType);
  };

  const handleLeadStatusClick = (status) => {
    setActiveLeadStatus(status);
  };

  const toggleLeadForm = () => {
    setShowLeadForm(prev => !prev);
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const response = await fetch(`http://localhost:3000/leads/${leadId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete lead");
      setLeads(leads.filter((lead) => lead.id !== leadId)); // Update the leads after deletion
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  // Function to open the update form with the lead details
  const handleEditLead = (lead) => {
    setLeadToUpdate(lead);
    setShowUpdateForm(true);
  };

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/1.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                All Leads <FontAwesomeIcon icon={faAngleDown} />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleLeadForm}
                className="bg-[#0176D3] text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
              >
                {showLeadForm ? "Close Lead Form" : "Create Lead"}{" "}
                <FontAwesomeIcon icon={showLeadForm ? faAngleUp : faAngleDown} className="mt-2" />
              </button>
              <button className="bg-white text-black text-sm rounded-md border border-neutral-400 px-4 p-1 leading-6 gap-2">
                Actions <FontAwesomeIcon icon={faAngleDown} className="mt-2 ml-1" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center px-5 py-2">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative w-72">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  className="w-full h-8 rounded-md border border-[#969492] pl-10 p-1.5 text-gray-900"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                {["All Leads", "Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeLeadStatus === status
                      ? "bg-[#0176D3] text-white border-[#0176D3]"
                      : "bg-white text-black border-[#747474]"
                      }`}
                    onClick={() => handleLeadStatusClick(status)}
                  >
                    {status}
                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                      {getLeadsCountByStatus(status)}
                    </p>
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${view === "Table" ? "bg-[#0176D3] text-white" : "bg-white text-black border-[#747474]"}`}
                  onClick={() => handleViewClick("Table")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${view === "Kanban" ? "bg-[#0176D3] text-white" : "bg-white text-black border-[#747474]"}`}
                  onClick={() => handleViewClick("Kanban")}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  Kanban
                </button>
              </div>
            </div>
          </div>
          {view === "Table" ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border px-4 py-2">Created on</th>
                    <th className="border px-4 py-2">Lead Status</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Stack</th>
                    <th className="border px-4 py-2">Course</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredLeads().length > 0 ? (
                    getFilteredLeads().map((lead) => (
                      <tr key={lead.id} className="bg-white border">
                        <td className="border p-2">{lead.date}</td>
                        <td className="border px-4 py-2">{lead.status}</td>
                        <td className="border px-4 py-2">{lead.name}</td>
                        <td className="border px-4 py-2">{lead.phone}</td>
                        <td className="border px-4 py-2">{lead.stack}</td>
                        <td className="border px-4 py-2">{lead.course}</td>
                        <td className="border px-4 py-2 flex gap-2">
                          <button
                            className="text-blue-500 p-1"
                            onClick={() => handleEditLead(lead)}
                          >
                            <FontAwesomeIcon icon={faPen} /> Edit
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Leads data not found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-[100%] overflow-auto px-5 h-full">
              <div className="flex gap-3">
                {["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map((status) => (
                  <div key={status} className="h-full grid gap-4">
                    <div
                      className={`${status === "Not Contacted"
                          ? "bg-green-200 border-t-green-400"
                          : status === "Attempted"
                            ? "bg-blue-200 border-t-blue-400"
                            : status === "Warm Lead"
                              ? "bg-orange-200 border-t-orange-400"
                              : "bg-red-200 border-t-red-400"
                        } border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5`}
                    >
                      <h3 className="text-md font-medium text-black">{status}</h3>
                    </div>
                    <div className="bg-gray-200 h-[63vh] px-0.5 max-w-96 flex flex-col items-center justify-start rounded">
                      {getFilteredLeads()
                        .filter((lead) => lead.status === status)
                        .length > 0 ? (
                        getFilteredLeads()
                          .filter((lead) => lead.status === status)
                          .map((lead) => (
                            <div
                              key={lead.id}
                              className="bg-white m-2 p-2 w-full rounded shadow-md"
                            >
                              <p>
                                <strong>Name:</strong> {lead.name}
                              </p>
                              <p>
                                <strong>Phone:</strong> {lead.phone}
                              </p>
                              <p>
                                <strong>Created On:</strong> {lead.date}
                              </p>
                              <p>
                                <strong>Status:</strong> {lead.status}
                              </p>
                              <p>
                                <strong>Stack:</strong> {lead.stack}
                              </p>
                              <p>
                                <strong>Course:</strong> {lead.course}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <button
                                  className="text-blue-500 p-1"
                                  onClick={() => handleEditLead(lead)}
                                >
                                  <FontAwesomeIcon icon={faPen} /> Edit
                                </button>
                                <button
                                  className="text-red-500 p-1"
                                  onClick={() => handleDeleteLead(lead.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                              </div>
                            </div>
                          ))
                      ) : (
                        <span className="text-sm font-medium">No Data Found</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showLeadForm && (
        <div className="mt-4">
          <LeadForm onClose={toggleLeadForm} />
        </div>
      )}

      {showUpdateForm && leadToUpdate && (
        <div className="mt-4">
          <UpdateLeadForm lead={leadToUpdate} onClose={() => setShowUpdateForm(false)} />
        </div>
      )}
    </div>
  );
}
