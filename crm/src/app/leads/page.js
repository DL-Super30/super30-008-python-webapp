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
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch leads from API
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch('http://127.0.0.1:3001/leads');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching leads data:', error);
      }
    }
    fetchLeads();
  }, []);

  // Handle checkbox change for selecting leads
  const handleCheckboxChange = (leadId) => {
    setSelectedLeads((prevSelectedLeads) => {
      if (prevSelectedLeads.includes(leadId)) {
        return prevSelectedLeads.filter(id => id !== leadId);
      } else {
        return [...prevSelectedLeads, leadId];
      }
    });
  };

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
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleDeleteLead = async () => {
    try {
      for (const leadId of selectedLeads) {
        const response = await fetch(`http://127.0.0.1:3001/leads/${leadId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete lead");
      }
      setLeads(leads.filter(lead => !selectedLeads.includes(lead.id))); // Update leads after deletion
      setSelectedLeads([]); // Clear the selection
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  // Function to open the update form with the selected lead
  const handleEditLead = () => {
    const lead = leads.find((lead) => lead.id === selectedLeads[0]); // Allow editing only the first selected lead
    if (lead) {
      setLeadToUpdate(lead);
      setShowUpdateForm(true);
    }
  };

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/employee_contact.2d215fd6.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                All Leads <FontAwesomeIcon icon={faAngleDown} />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleLeadForm}
                className="bg-[#ab43c8] text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
              >
                {showLeadForm ? "Close Lead Form" : "Create Lead"}{" "}
                <FontAwesomeIcon icon={showLeadForm ? faAngleUp : faAngleDown} className="mt-2" />
              </button>
              <div className="relative">
                <button onClick={toggleDropdown} className="bg-white   text-black text-sm rounded-md border border-neutral-400 px-4 p-1 leading-6 gap-2">
                  Actions <FontAwesomeIcon icon={faChevronDown} className="mt-2 ml-1" />
                </button>
                {showDropdown &&(
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={handleEditLead}
                    disabled={selectedLeads.length !== 1} // Allow editing only one selected lead
                  >
                    <FontAwesomeIcon icon={faPen} /> Update Lead
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={handleDeleteLead}
                    disabled={selectedLeads.length === 0}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete Lead(s)
                  </button>
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
                      ? "bg-[#ab43c8] text-white border-[#ab43c8]"
                      : "bg-white text-black border-[#747474]"
                      }`}
                    onClick={() => handleLeadStatusClick(status)}
                  >
                    {status}
                    <p className="bg-slate-500 py-1 px-2.5 rounded-full">
                      {getLeadsCountByStatus(status)}
                    </p>
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-s-lg ${view === "Table" ? "bg-[#ab43c8] text-white" : "bg-white text-black border-[#747474]"}`}
                  onClick={() => handleViewClick("Table")}
                >
                  <FontAwesomeIcon icon={faTable} />
                  Table
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-normal border rounded-e-lg ${view === "Kanban" ? "bg-[#ab43c8] text-white" : "bg-white text-black border-[#747474]"}`}
                  onClick={() => handleViewClick("Kanban")}
                >
                  <FontAwesomeIcon icon={faColumns} />
                  Kanban
                </button>
              </div>
            </div>
          </div>
        </div>

        {showLeadForm && <LeadForm lead={Leads} onClose={() => setShowLeadForm(false)} />}

        {showUpdateForm && <UpdateLeadForm lead={leadToUpdate} onClose={() => setShowUpdateForm(false)} />}

        <div className="overflow-x-auto mx-5">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedLeads(
                        e.target.checked ? leads.map((lead) => lead.id) : []
                      )
                    }
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                  />
                </th>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Email</th>
                <th scope="col" className="px-6 py-4">Phone Number</th>
                <th scope="col" className="px-6 py-4">course</th>
                <th scope="col" className="px-6 py-4">fee</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredLeads().map((lead) => (
                <tr key={lead.id} className="border-b">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={(lead) => handleCheckboxChange(lead.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{lead.id}</td>
                  <td className="px-6 py-4">{lead.name}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.phone}</td>
                  <td className="px-6 py-4">{lead.course}</td>
                  <td className="px-6 py-4">{lead.fee}</td>
 

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
