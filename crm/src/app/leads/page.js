"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch, faPen, faTrash, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadForm from "../../components/leadform";
import UpdateLeadForm from "../../components/updateleads"; // Import UpdateLeadForm component

export default function Leads() {
  const [activeLeadStatus, setActiveLeadStatus] = useState("All Leads");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [view, setView] = useState("Table");
  const [leads, setLeads] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [leadToUpdate, setLeadToUpdate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);



  // Fetch leads from API
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch(`http://18.224.180.46:8000/api/leads/`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    }
    fetchLeads();

    
  }, );

  const addLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    if (activeLeadStatus !== "All Leads") {
      filtered = filtered.filter(
        (lead) => lead.Lead_Status === activeLeadStatus
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((lead) =>
        lead.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const getLeadsCountByStatus = (Lead_Status) => {
    return leads.filter(
      (lead) => Lead_Status === "All Leads" || lead.Lead_Status === Lead_Status
    ).length;
  };

  const handleViewClick = (viewType) => {
    setView(viewType);
  };

  const handleLeadStatusClick = (Lead_Status) => {
    setActiveLeadStatus(Lead_Status);
  };

  const toggleLeadForm = () => {
    setShowLeadForm((prev) => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleDeleteLead = async () => {
    try {
      const deleteRequests = selectedLeads.map(async (leadId) => {
        const response = await fetch(`http://18.224.180.46:8000/api/leads/${leadId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete lead");
      });

      await Promise.all(deleteRequests);

      setLeads(leads.filter((lead) => !selectedLeads.includes(lead.id)));
      setSelectedLeads([]); // Clear selection after deletion
      setShowDropdown(false);
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEditLead = () => {
    const lead = leads.find((lead) => lead.id === selectedLeads[0]); // Get the first selected lead for editing
    setLeadToUpdate(lead);
    setShowUpdateForm(true);
    setShowDropdown(false);
  };

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setSelectedLeads([]); // Clear selected leads after update
  };

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      const allLeadIds = getFilteredLeads().map((lead) => lead.id);
      setSelectedLeads(allLeadIds);
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId) => {
    setSelectedLeads((prevSelected) =>
      prevSelected.includes(leadId)
        ? prevSelected.filter((id) => id !== leadId)
        : [...prevSelected, leadId]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as needed
  };

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/employee_contact.2d215fd6.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                All Leads  <FontAwesomeIcon icon={faAngleDown} className="fa fa-sm" />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleLeadForm}
                className="bg-[#ab43c8] text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
              >
                {showLeadForm ? "Close Lead Form" : "Create Lead"} <FontAwesomeIcon
                    icon={showLeadForm ? faAngleUp : faAngleDown}
                    className="mt-2"
                  />
              </button>

              <div className="relative  text-left">
                <button
                  onClick={toggleDropdown}
                  className="bg-white text-black text-sm rounded-md border border-neutral-400 px-4 p-1 leading-6 gap-2"
                >
                  Actions<FontAwesomeIcon icon={faChevronDown} className="mt-2 ml-1" />
                  
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
                  placeholder="Search By Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                {[
                  "All Leads",
                  "Not Contacted",
                  "Attempted",
                  "Warm Lead",
                  "Cold Lead",
                ].map((Lead_Status) => (
                  <button
                    key={Lead_Status}
                    type="button"
                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 mr-1 rounded-lg ${
                      activeLeadStatus === Lead_Status
                        ? "bg-[#ab43c8] text-white border-[#0176D3]"
                        : "bg-white text-black border-[#747474]"
                    }`}
                    onClick={() => handleLeadStatusClick(Lead_Status)}
                  >
                    {Lead_Status}
                    <p className="bg-slate-400 py-1 px-2.5 rounded-full">
                      {getLeadsCountByStatus(Lead_Status)}
                    </p>
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg 
                    ${
                      view === "Table"
                        ? "bg-[#ab43c8] text-white"
                        : "bg-white text-black border-[#747474]"
                    }`}
                  onClick={() => handleViewClick("Table")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${
                    view === "Kanban"
                      ? "bg-[#ab43c8] text-white"
                      : "bg-white text-black border-[#747474]"
                  }`}
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
                    <th className="border px-4 py-2">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectAll}
                      />
                    </th>
                    <th className="border px-4 py-2">Created on</th>
                    <th className="border px-4 py-2">Lead Status</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Stack</th>
                    <th className="border px-4 py-2">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredLeads().length > 0 ? (
                    getFilteredLeads().map((lead) => (
                      <tr
                        key={lead.id}
                        className="bg-white border hover:bg-gray-50"
                      >
                        <td className="border px-4 py-2">
                          <input
                            type="checkbox"
                            onChange={() => handleSelectLead(lead.id)}
                            checked={selectedLeads.includes(lead.id)}
                          />
                        </td>
                        <td className="border px-4 py-2">{lead.Date}</td>
                        <td className="border px-4 py-2">{lead.Lead_Status}</td>
                        <td className="border px-4 py-2">{lead.Name}</td>
                        <td className="border px-4 py-2">{lead.Contact_No}</td>
                        <td className="border px-4 py-2">{lead.Tech_Stack}</td>
                        <td className="border px-4 py-2">{lead.Course}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-[100%] overflow-auto px-5 h-full">
              <div className="flex gap-3">
                {["Not Contacted", "Attempted", "Warm Lead", "Cold Lead"].map(
                  (Lead_Status) => (
                    <div key={Lead_Status} className="h-full grid gap-4">
                      <div
                        className={`${
                          Lead_Status === "Not Contacted"
                            ? "bg-green-200 border-t-green-400"
                            : Lead_Status === "Attempted"
                            ? "bg-blue-200 border-t-blue-400"
                            : Lead_Status === "Warm Lead"
                            ? "bg-orange-200 border-t-orange-400"
                            : "bg-red-200 border-t-red-400"
                        } border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5`}
                      >
                        <h3 className="text-md font-medium text-black">
                          {Lead_Status}
                        </h3>
                      </div>
                      <div className=" bg-gray-200 flex-1 px-0.5 max-w-96 flex flex-col items-center justify-start rounded min-h-[100vh] h-full">
                        {getFilteredLeads().filter(
                          (lead) => lead.Lead_Status === Lead_Status
                        ).length > 0 ? (
                          getFilteredLeads()
                            .filter((lead) => lead.Lead_Status === Lead_Status)
                            .map((lead) => (
                              <div
                                key={lead.id}
                                className="bg-white m-2 p-2 w-full rounded shadow-md"
                              >
                                <p>
                                  <strong>Name:</strong> {lead.Name}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {lead.Phone}
                                </p>
                                <p>
                                  <strong>Created On:</strong> {formatDate(lead.Datetime)}
                                </p>
                                <p>
                                  <strong>Status:</strong> {lead.Lead_Status}
                                </p>
                                <p>
                                  <strong>Stack:</strong> {lead.Stack}
                                </p>
                                <p>
                                  <strong>Course:</strong> {lead.Course}
                                </p>
                                {/* <div className="flex gap-2 mt-2">
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
                                </div> */}
                              </div>
                            ))
                        ) : (
                          <span className="text-sm font-medium">
                            No Leads Found
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showLeadForm && (
        <div className="mt-4">
          <LeadForm onClose={() => setShowLeadForm(false)} addLead={addLead} />
        </div>
      )}

      {showUpdateForm && leadToUpdate && (
        <div className="mt-4">
          <UpdateLeadForm
            lead={leadToUpdate}
            onClose={() => setShowUpdateForm(false)}
            onUpdate={updateLead}
          />
        </div>
      )}
    </div>
  );
}
