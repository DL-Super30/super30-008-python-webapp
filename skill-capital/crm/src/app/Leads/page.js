"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableChartIcon from '@mui/icons-material/TableChart';
import LeadForm from "../Forms/leadform";
import UpdateForm from "../Forms/LeadsUpdateForm";


export default function LeadManagement() {
  // const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByLeadStatus, setFilterByLeadStatus] = useState("");

  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isKanbanVisible, setIsKanbanVisible] = useState(false);
  const [isFormVisible, setISFormVIsible] = useState(false);
  const [Leads, setLeads] = useState([]);





  const openForm = () => {
    setISFormVIsible(true);
  }

  const closeForm = () => {
    setISFormVIsible(false);
  }

  const [counts, setCounts] = useState({
    NotContacted: 0,
    Contacted: 0,
    WarmLead: 0,
    ColdLead: 0,
  });

  const fetchLeads = async () => {
    const leadsApiUrl = process.env.NEXT_PUBLIC_LEADS_API_URL;
    try {
      const response = await fetch(`${leadsApiUrl}`, {
        method: 'GET'
      });
      const data = await response.json()
      setLeads(data);
      handleCreateLead(data);
      console.log(data);
      setFilteredRows(data);
    } catch (error) {
      console.error('Error fetching leads:', error)
    }
  }


  const handleCreateLead = (newLead) => {
    // Add the new lead to the state and sort by date (most recent first)
    setLeads((prevLeads) => {
      const updatedLeads = [newLead, ...prevLeads]; // Add the new lead at the top
      return updatedLeads.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setFilteredRows((prevLeads) => {
      const updatedLeads = [newLead, ...prevLeads];
      return updatedLeads.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    let filteredData = Leads.filter((row) =>
      row?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterByLeadStatus === "" || row?.lead_status === filterByLeadStatus)
    );
    setFilteredRows(filteredData);

    const updatedCounts = {
      NotContacted: filteredData.filter(row => row.lead_status === "Not Contacted").length,
      Contacted: filteredData.filter(row => row.lead_status === "Contacted").length,
      WarmLead: filteredData.filter(row => row.lead_status === "Warm Lead").length,
      ColdLead: filteredData.filter(row => row.lead_status === "Cold Lead").length,
    };

    setCounts(updatedCounts);
  }, [searchQuery, filterByLeadStatus, Leads]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    const leadsApiUrl = process.env.NEXT_PUBLIC_LEADS_API_URL;
    fetch(`${leadsApiUrl}${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setLeads(prevRows => prevRows.filter(row => row.id !== id));
        } else {
          console.error('Error deleting the row');
        }
      })
      .catch(error => console.error('Error in delete request:', error));
  };



  const openTable = () => {
    setIsTableVisible(true);
    setIsKanbanVisible(false);
  }

  const openKanban = () => {
    setIsTableVisible(false);
    setIsKanbanVisible(true);
  }

  const renderKanbanColumn = (status) => {
    const filteredLeads = filteredRows.filter(lead => lead.lead_status === status);

    const getColorByStatus = () => {
      switch (status) {
        case "Not Contacted":
          return "bg-green-100 border-t-[5px] border-t-green-800";
        case "Contacted":
          return " bg-yellow-100 border-t-[5px] border-t-yellow-800";
        case "Warm Lead":
          return "bg-orange-100 border-t-[5px] border-t-orange-800";
        case "Cold Lead":
          return "bg-pink-100 border-t-[5px] border-t-pink-800"
      }

    }
    return (
      <div className="grid gap-3 text-center min-w-[200px] max-w-[300px]">

        <div className={`border-1  flex flex-col not-italic gap-2 rounded-lg text-sm p-2 ${getColorByStatus(status)}`}>
          <p>{status}</p>
          <p>
            {filteredLeads.length} Leads
          </p>
        </div>
        <div className="w-full h-[calc(100vh-300px)] overflow-y-auto border-1 bg-gray-100 rounded-lg p-2">
          {filteredLeads.length === 0 ? (
            <p>No leads</p>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white p-2 mb-2 rounded-md text-sm shadow">
                <p className="font-bold">{lead.name}</p>
                <p>{lead.email}</p>
                <p>{lead.contact_no}</p>
                <div className="flex justify-between mt-2">
                  <button className="text-green-700 flex items-center text-xs">
                    <EditIcon className="w-4 h-4 mr-1" />
                    Update
                  </button>
                  <button onClick={() => handleDelete(lead.id)} className="text-red-600 flex items-center text-xs">
                    <DeleteIcon className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };



  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all rows
      setSelectedRows(filteredRows.map(row => row.id));
    } else {
      // Deselect all rows
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (rowId) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(rowId)) {
        // Deselect the row
        return prevSelected.filter(id => id !== rowId);
      } else {
        // Select the row
        return [...prevSelected, rowId];
      }
    });
  };

  const handleDeleteSelected = () => {
    // Call the handleDelete function for each selected row
    selectedRows.forEach(rowId => handleDelete(rowId));
    // Clear the selected rows after deletion
    setSelectedRows([]);
  };


  //panigation 

  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const rowsPerPage = 7; // Number of rows per page
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage); // Total number of pages

  // Get current rows based on pagination
  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Function to navigate to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to navigate to previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  // update table:

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);

  const handleUpdate = (row) => {
    setCurrentRowData(row); // Set the current row data to be updated
    setIsUpdateFormVisible(true); // Show the update form
  };


  // for Dashboard:

 


  return (
    <div className="bg-light py-2 gap-y-5 border-1">

      <div className="w-full h-full border-1 rounded flex items-center justify-between gap-x-2 p-2">
        <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">
          <div className="flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]">
            <FontAwesomeIcon icon={faIdCard} />
          </div>
          <div className="flex items-center justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  All Leads
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-5 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Today Leads</p>
                  </MenuItem>
                  <MenuItem>
                    <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Yesterday Leads</p>
                  </MenuItem>
                  <MenuItem>
                    <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Previous Leads</p>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <CalendarMonthIcon style={{ fontSize: 26, color: 'black' }} />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={openForm}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white">
                Create leads
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
            </div>
            {
              isFormVisible &&
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                <LeadForm closeForm={() => setISFormVIsible(false)} handleCreateLead={handleCreateLead} />
              </div>
            }
          </Menu>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white">
                Actions
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-5 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem onClick={handleDeleteSelected}>
                  <button className="w-full  block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Delete</button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="flex w-full h-fit border-1 items-center justify-around">
        <div className="relative flex rounded-full">
          <input
            type="search"
            placeholder="search"
            onChange={handleSearchChange}
            className="border-1 border-slate-600 bg-gray-200 rounded-full pl-10 pr-4 py-1"
          />
          <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-600" />
        </div>

        <div className="flex gap-1 rounded-r-lg items-center">
          {['Not Contacted', 'Contacted', 'Warm Lead', 'Cold Lead'].map((status) => (
            <Menu key={status} as="div" className="relative inline-block text-left">
              <div>
                <MenuButton
                  onClick={() => setFilterByLeadStatus(status)}
                  className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${filterByLeadStatus === status ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                  {status}
                  <div className="flex w-[28px] h-[28px] items-center bg-red-400 justify-center rounded-full text-sm">
                    {counts[status.replace(' ', '')]}
                  </div>
                </MenuButton>
              </div>
            </Menu>
          ))}
        </div>

        <div className="flex py-2 gap-1">
          <div
            onClick={openTable}
            className={`flex w-[90px] items-center justify-around gap-1 border-2 text-sm p-1 rounded-full ${isTableVisible ? 'bg-blue-500 text-white' : 'bg-light hover:bg-blue-500 hover:text-white'}`}
          >
            <TableChartIcon className="w-4 h-4" />
            <button>table</button>
          </div>
          <div
            onClick={openKanban}
            className={`flex w-[90px] items-center justify-between gap-1 border-2 text-sm p-1 rounded-full ${isKanbanVisible ? 'bg-blue-500 text-white' : 'bg-light hover:bg-blue-500 hover:text-white'}`}
          >
            <button>kanban</button>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        {isTableVisible && (
          <div className="flex items-center justify-center w-full h-full m-auto p-1 border-2 border-gray-100 rounded-md overflow-x-auto">
            <table className=' min-w-full border-2 text-center table-auto text-sm capitalize text-medium w-full rounded-md  '>
              <thead>
                <tr className='border-2 bg-rose-200 p-5 font-semibold '>
                  <th className="border-2 px-3" >

                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={filteredRows.length > 0 && selectedRows.length === filteredRows.length}
                    />

                  </th >
                  <th className='border-2 p-2'>created On</th>
                  <th className='border-2 p-2'>Name</th>
                  <th className='border-2 p-2'>Lead Status</th>
                  <th className='border-2 p-2'>Contact</th>
                  <th className='border-2 p-2'>Email</th>
                  <th className='border-2 p-2'>TechStack</th>
                  <th className='border-2 p-2'>Course</th>
                  <th className='border-2 p-2'>Update</th>
                  <th className='border-2 p-2'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="9">No data available</td>
                  </tr>
                ) : (
                  currentRows.map((row) => (
                    <tr key={row.id} className="bg-green-100">
                      <td className="border-1 p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}

                        />
                      </td>
                      <td className="border-1 px-3">{row.date}</td>
                      <td className='border-1 px-2'>{row.name}</td>
                      <td className='border-1 px-2'>{row.lead_status}</td>
                      <td className='border-1 px-2'>{row.contact_no}</td>
                      <td className='border-1 px-2'>{row.email}</td>
                      <td className='border-1 px-2'>{row.TechStack}</td>
                      <td className='border-1 px-2'>{row.Course}</td>
                      <td className=' border-1 px-3'>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleUpdate(row)}
                            className="w-[70px] justify-center items-center text-green-700 flex border-1 bg-gray-200 rounded-md">
                            <EditIcon className="w-[20px] h-[20px]" />
                            <p>Update</p>
                          </button>
                          {isUpdateFormVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                              <UpdateForm
                                rowData={currentRowData}
                                onClose={() => setIsUpdateFormVisible(false)}
                                onUpdate={fetchLeads} // or whatever method you use to refresh the data
                              />
                            </div>
                          )}

                        </div>
                      </td>
                      <td className='border-1 px-3'>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="w-[70px] justify-center items-center text-red-600 flex border-1 bg-gray-200 rounded-md"
                          >
                            <DeleteIcon className="w-[20px] h-[20px]" />
                            <p>Delete</p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {isKanbanVisible && (
          <div className="w-full">
            <div className="w-[100%] flex gap-x-2 items-start justify-evenly py-6 overflow-x-auto">
              {renderKanbanColumn("Not Contacted")}
              {renderKanbanColumn("Contacted")}
              {renderKanbanColumn("Warm Lead")}
              {renderKanbanColumn("Cold Lead")}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Previous Button */}
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
            }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
            }`}
        >
          Next
        </button>
      </div>

    </div>
  );
}