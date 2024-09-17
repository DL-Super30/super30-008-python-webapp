"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { faAngleDown, faAngleUp, faTable, faColumns, faSearch, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import OpportunityForm from "../../components/opportunityform";
// import UpdateOpportunityForm from "../../components/updateOpportunity"; // Import UpdateOpportunityForm component

export default function Opportunities() {
  const [activeOpportunityStatus, setActiveOpportunityStatus] = useState("All Opportunities");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [view, setView] = useState("Table");
  const [opportunities, setOpportunities] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [opportunityToUpdate, setOpportunityToUpdate] = useState(null);

  // Fetch opportunities from API
  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch('http://localhost:3000/opportunities');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error('Error fetching opportunities data:', error);
      }
    }
    fetchOpportunities();
  }, []);

  // Filter opportunities based on status and search query
  const getFilteredOpportunities = () => {
    let filtered = opportunities;

    // Apply status filter
    if (activeOpportunityStatus !== "All Opportunities") {
      filtered = filtered.filter(opportunity => opportunity.status === activeOpportunityStatus);
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(opportunity =>
        opportunity.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Get the count of opportunities by status
  const getOpportunitiesCountByStatus = (status) => {
    // This counts all opportunities, even if a status filter is applied
    return opportunities.filter(opportunity => status === "All Opportunities" || opportunity.status === status).length;
  };

  const handleViewClick = (viewType) => {
    setView(viewType);
  };

  const handleOpportunityStatusClick = (status) => {
    setActiveOpportunityStatus(status);
  };

  const toggleOpportunityForm = () => {
    setShowOpportunityForm(prev => !prev);
  };

  const handleDeleteOpportunity = async (opportunityId) => {
    try {
      const response = await fetch(`http://localhost:3000/opportunities/${opportunityId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete opportunity");
      setOpportunities(opportunities.filter((opportunity) => opportunity.id !== opportunityId)); // Update the opportunities after deletion
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    }
  };

  // Function to open the update form with the opportunity details
  const handleEditOpportunity = (opportunity) => {
    setOpportunityToUpdate(opportunity);
    setShowUpdateForm(true);
  };

  // Function to get opportunities by status (for Kanban view)
  const getOpportunitiesByStatus = (status) => {
    return opportunities.filter(opportunity => opportunity.status === status);
  };

  // Function to format dates (for Kanban view)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as needed
  };

  // Function to get color by status (for Kanban view)
  const getColorByStatus = (status) => {
    switch (status) {
      case 'Not Contacted':
        return 'bg-red-200';
      case 'Attempted':
        return 'bg-yellow-200';
      case 'Warm Opportunity':
        return 'bg-green-200';
      case 'Cold Opportunity':
        return 'bg-blue-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-white rounded-lg">
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center px-5 py-2 gap-3">
            <div className="flex items-center gap-3">
              <Image src="/images/1.svg" alt="logo" width={44} height={44} />
              <h2 className="text-2xl font-medium text-black flex items-center gap-2">
                All Opportunities <FontAwesomeIcon icon={faAngleDown} />
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleOpportunityForm}
                className="bg-[#0176D3] text-white text-sm rounded-lg border-black px-4 p-1 leading-6 gap-2"
              >
                {showOpportunityForm ? "Close Opportunity Form" : "Create Opportunity"}{" "}
                <FontAwesomeIcon icon={showOpportunityForm ? faAngleUp : faAngleDown} className="mt-2" />
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
                {["All Opportunities", "Not Contacted", "Attempted", "Warm Opportunity", "Cold Opportunity"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`inline-flex gap-2 items-center px-4 py-1 text-sm font-normal border focus:border-transparent transition duration-700 ${activeOpportunityStatus === status
                      ? "bg-[#0176D3] text-white border-[#0176D3]"
                      : "bg-white text-black border-[#747474]"
                      }`}
                    onClick={() => handleOpportunityStatusClick(status)}
                  >
                    {status}
                    <p className="bg-rose-600 py-1 px-2.5 rounded-full">
                      {getOpportunitiesCountByStatus(status)}
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
                    <th className="border px-4 py-2">Opportunity Status</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Stack</th>
                    <th className="border px-4 py-2">Course</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredOpportunities().length > 0 ? (
                    getFilteredOpportunities().map((opportunity) => (
                      <tr key={opportunity.id} className="bg-white border">
                        <td className="border p-2">{opportunity.date}</td>
                        <td className="border px-4 py-2">{opportunity.status}</td>
                        <td className="border px-4 py-2">{opportunity.name}</td>
                        <td className="border px-4 py-2">{opportunity.phone}</td>
                        <td className="border px-4 py-2">{opportunity.stack}</td>
                        <td className="border px-4 py-2">{opportunity.course}</td>
                        <td className="border px-4 py-2 flex gap-2">
                          <button
                            className="text-blue-500 p-1"
                            onClick={() => handleEditOpportunity(opportunity)}
                          >
                            <FontAwesomeIcon icon={faPen} /> Edit
                          </button>
                          <button
                            className="text-red-500 p-1"
                            onClick={() => handleDeleteOpportunity(opportunity.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center p-4">No opportunities found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="kanban-view">
              <div className="w-[100%] overflow-auto px-5 h-full">
                <div className="flex gap-3">
                  {['Not Contacted', 'Attempted', 'Warm Opportunity', 'Cold Opportunity'].map((status) => (
                    <div key={status} className="h-full grid gap-4">
                      <div
                        className={`${getColorByStatus(status)} border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5`}
                      >
                        <h3 className="text-md font-medium text-black">{status}</h3>
                      </div>
                      <div className="bg-gray-200 h-[63vh] px-0.5 max-w-96 flex flex-col items-center justify-start rounded">
                        {getOpportunitiesByStatus(status).length > 0 ? (
                          getOpportunitiesByStatus(status).map((opportunity, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 m-2 rounded-md shadow-md border border-gray-300"
                            >
                              <h4 className="text-lg font-semibold">{opportunity.name}</h4>
                              <p>Phone: {opportunity.phone}</p>
                              <p>Stack: {opportunity.stack}</p>
                              <p>Course: {opportunity.course}</p>
                              <p>Created on: {formatDate(opportunity.created_on)}</p>
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => handleEditOpportunity(opportunity)}
                                  className="bg-blue-500 text-white px-4 py-1 rounded"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteOpportunity(opportunity.id)}
                                  className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center mt-4">No opportunities</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditionally render the OpportunityForm
              {showOpportunityForm && <OpportunityForm />} */}

              {/* Conditionally render the UpdateOpportunityForm */}
              {/* {showUpdateForm && opportunityToUpdate && (
                <UpdateOpportunityForm opportunity={opportunityToUpdate} onClose={() => setShowUpdateForm(false)} />
              )} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
