"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableChartIcon from '@mui/icons-material/TableChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import LeadForm from "../Forms/leadform";
import UpdateForm from "../Forms/LeadsUpdateForm";
import { toast } from 'react-toastify';
import axios from 'axios';




export default function LeadManagement() {
  // const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByLeadStatus, setFilterByLeadStatus] = useState("");

  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isKanbanVisible, setIsKanbanVisible] = useState(false);
  const [isFormVisible, setISFormVIsible] = useState(false);
  const [Leads, setLeads] = useState([]);
  const [Opportunity, setOpportunity] = useState([]);




  const openForm = () => {
    setISFormVIsible(true);
  }

  // const closeForm = () => {
  //   setISFormVIsible(false);
  // }

  const [counts, setCounts] = useState({
    NotContacted: 0,
    Attempted: 0,
    WarmLead: 0,
    ColdLead: 0,
  });

  const fetchLeads = async () => {
    const leadsApiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await axios.get(`${leadsApiUrl}/leads/`);

      const data= response.data;
      console.log(data);

      setLeads(data);

      handleCreateLead(data);
     
      setFilteredRows(data);
    } catch (error) {
      console.error('Error fetching leads:', error)
      AlertMessage('Failed to fetch leads. Please try again later.', 'error');
    }
  }


  const handleCreateLead = (newLead) => {
    // Add the new lead to the state and sort by date (most recent first)
    setLeads((prevLeads) => {
      const updatedLeads = [newLead, ...prevLeads]; // Add the new lead at the top
      return updatedLeads.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    });
    setFilteredRows((prevLeads) => {
      const updatedLeads = [newLead, ...prevLeads];
      return updatedLeads.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    });
  };

  useEffect(() => {
    fetchLeads();
  },[]);

  // updates the setfilteredRows when lead changes:
  useEffect(()=>{
    setFilteredRows(Leads);
  },[Leads]);

  useEffect(() => {
    let filteredData = Leads.filter((row) =>
      row?.Name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterByLeadStatus === "" || row?.Lead_Status === filterByLeadStatus)
    );
    setFilteredRows(filteredData);

    const updatedCounts = {
      NotContacted: filteredData.filter(row => row.Lead_Status === "Not Contacted").length,
      Attempted: filteredData.filter(row => row.Lead_Status === "Attempted").length,
      WarmLead: filteredData.filter(row => row.Lead_Status === "Warm Lead").length,
      ColdLead: filteredData.filter(row => row.Lead_Status === "Cold Lead").length,
    };

    setCounts(updatedCounts);
  }, [searchQuery, filterByLeadStatus, Leads]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };


  const AlertMessage = (message, type) => {
    if (type === 'success') {
        toast.success(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else if (type === 'error') {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

  const handleDelete = (Id) => {
    const leadsApiUrl = process.env.NEXT_PUBLIC_API_URL;
    axios.delete(`${leadsApiUrl}/leads/${Id}/`)
      .then(response => {
        if (response.status>=200 && response.status<300) {
          setLeads(prevRows => prevRows.filter(row => row.Id !== Id));
          AlertMessage('Row Deleted Successfully', 'success');
        } else {
          AlertMessage('Row Deleted UnSuccessfully', 'error');
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
    const filteredLeads = filteredRows.filter(lead => lead.Lead_Status === status);

    const getColorByStatus = () => {
      switch (status) {
        case "Not Contacted":
          return "bg-green-100 border-t-[5px] border-t-green-800";
        case "Attempted":
          return " bg-yellow-100 border-t-[5px] border-t-yellow-800";
        case "Warm Lead":
          return "bg-orange-100 border-t-[5px] border-t-orange-800";
        case "Cold Lead":
          return "bg-pink-100 border-t-[5px] border-t-pink-800"
      }

    }
    return (
      <div className="grid gap-3 text-center min-w-[280px] max-w-[300px]">

        <div className={`border-1  flex flex-col not-italic gap-2 rounded-lg text-sm p-2 ${getColorByStatus(status)}`}>
          <p>{status}</p>
          <p className="font-bold">
            {filteredLeads.length} Leads
          </p>
        </div>
        <div className={`w-full h-[calc(100vh-300px)] overflow-y-auto border-1 bg-gray-100 rounded-lg p-2 ${getColorByStatus(status)}`}>
          {filteredLeads.length === 0 ? (
            <p className="py-[80px]">No leads</p>
          ) : (
            filteredLeads.map((lead) => (
              <div key={lead.Id} className=" flex  flex-col  w-full bg-white p-2 mb-2 rounded-md text-sm shadow">
                <div className="flex items-baseline justify-between">
                <p className="font-medium">{lead.Name}</p>
                <p>{lead.Contact_No}</p>
                </div>
                <div className="flex items-baseline justify-between">
                <p>{lead.Email}</p>
                  <button onClick={() => handleDelete(lead.Id)} className="text-red-600 flex items-center text-xs">
                    <DeleteIcon className="w-4 h-4 mr-1" />
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
      setSelectedRows(filteredRows.map(row => row.Id));
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
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
 // Total number of pages

  // Get current rows based on pagination
  const currentRows = (filteredRows).slice(
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


  // for Convertion:
  const handleConvert = () => {
    try {
      const selectedLeads = currentRows.filter(row => selectedRows.includes(row.Id));
  
      if (selectedLeads.length === 0) {
        AlertMessage('No rows selected. Please select at least one row.', 'error');
        return;
      }
  
      const mappedOpportunities = selectedLeads.map(lead => {
        if (!lead.Name || !lead.CC || !lead.Contact_No || !lead.Email || !lead.Fee_Coated || !lead.Description || !lead.Date) {
          throw new Error('All required fields must be filled');
        }
  
        const opportunity = {
          Id: lead.Id,
          Name: lead.Name,
          CC: lead.CC,
          Contact_No: lead.Contact_No,
          Email: lead.Email,
          Fee_Coated: lead.Fee_Coated,
          Description: lead.Description,
          Date: lead.Date,
          Batch_Timing: lead.Batch_Timing,
          Lead_Status: lead.Lead_Status,
          Lead_Source: lead.Lead_Source,
          Tech_Stack: lead.Tech_Stack,
          Course: lead.Course,
          Class_Mode: lead.Class_Mode,
        };
  
        // Conditionally add optional fields if they have values
        if (lead.Opportunity_Status) opportunity.Opportunity_Status = lead.Opportunity_Status;
        if (lead.Opportunity_Stage) opportunity.Opportunity_Stage = lead.Opportunity_Stage;
        if (lead.Demoattended_Stage) opportunity.Demoattended_Stage = lead.Demoattended_Stage;
        if (lead.Visited_Stage) opportunity.Visited_Stage = lead.Visited_Stage;
        if (lead.Lost_Opportunity_Reason) opportunity.Lost_Opportunity_Reason = lead.Lost_Opportunity_Reason;
  
        return opportunity;
      });
  
      const OpportunityApiUrl = process.env.NEXT_PUBLIC_API_URL;
  
      // Post each opportunity individually to the server
      mappedOpportunities.forEach(opportunity => {
        axios.post(`${OpportunityApiUrl}/opportunities/`, opportunity)
          .then(response => {
            setOpportunity(prevOpportunities => [...prevOpportunities, opportunity]);
            selectedLeads.forEach(lead => {
              axios.delete(`${OpportunityApiUrl}/leads/${lead.Id}/`)
                .then(deleteResponse => {
                  setLeads(prevLeads => prevLeads.filter(l => l.Id !== lead.Id)); // Remove deleted leads from state
                  // AlertMessage("Lead deleted successfully", 'success');
                })
                .catch(deleteError => {
                  AlertMessage("Error deleting lead", 'error');
                });
            });
            setSelectedRows([]);
            AlertMessage("Lead converted & Delete successfully", 'success');
          })
          .catch(error => {
            AlertMessage("Error converting lead", 'error');
          });
      });
    } catch (error) {
      AlertMessage(error.message || "Error while converting", 'error');
    }
  };
  
  
  






  return (
    <div className="bg-light py-2 gap-y-5 border-1 rounded-3xl mt-1 bg-slate-200">

      <div className="w-full h-full border-1 rounded flex items-center justify-between gap-x-2 p-2">

        <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">

          <div className="flex items-center justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <LeaderboardIcon />
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
          {/* <CalendarMonthIcon style={{ fontSize: 26, color: 'black' }} /> */}
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
              <div className="py-1">
                <MenuItem >
                  <button
                  onClick={ handleConvert}
                   className="w-full  block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Convert</button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div className="flex w-full h-fit border-1 items-center justify-between p-2 rounded-md">

        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-1 w-full rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex gap-1 rounded-r-lg items-center">
          {['Not Contacted', 'Attempted', 'Warm Lead', 'Cold Lead'].map((status) => (
            <Menu key={status} as="div" className="relative inline-block text-left">
              <div>
                <MenuButton
                  onClick={() => setFilterByLeadStatus(status)}
                  className={`inline-flex w-full justify-center items-center gap-1.5 rounded-md px-3  text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${filterByLeadStatus === status ? 'bg-blue-800 text-slate-200 border-2 border-white' : 'bg-white'}`}
                >
                  {status}
                  <div className="flex w-[24px] h-[24px] items-center bg-red-600 justify-center rounded-full text-sm my-1">
                    {counts[status.replace(' ', '')]}
                  </div>
                </MenuButton>
              </div>
            </Menu>
          ))}
        </div>

        <div className="flex py-2 items-center justify-center">
          <div
            onClick={openTable}
            className={`flex w-[90px] items-center justify-around gap-1 border-2 text-sm p-1 rounded-md ${isTableVisible ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-500 hover:text-white'}`}
          >
            <TableChartIcon className="w-4 h-4" />
            <button className=" border-1  rounded-md">table</button>
          </div>

          <div
            onClick={openKanban}
            className={`flex w-[90px] items-center justify-between gap-1 border-2 text-sm p-1 rounded-md ${isKanbanVisible ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-500 hover:text-white'}`}
          >
            <button className=" border-1  rounded-md">kanban</button>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>
        </div>

      </div>

      <div>
        {isTableVisible && (
          <div className="flex flex-col items-center justify-center w-full h-full m-auto p-2 border-2 border-gray-100 rounded-2xl overflow-x-auto">
            <table className=' min-w-full border-2 text-center table-auto text-xs capitalize font-light w-full rounded-3xl  '>
              <thead>
                <tr className='border-2  bg-teal-500 p-5 font-thin  rounded-3xl'>
                  <th className="border-1 p-2" >

                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={filteredRows.length > 0 && selectedRows.length === filteredRows.length}

                    />

                  </th >
                  <th className='border-1 p-1'>created On</th>
                  <th className='border-1 p-1'>Name</th>
                  <th className='border-1 p-1'>Lead Status</th>
                  <th className='border-1 p-1'>Contact</th>
                  <th className='border-1 p-1'>Email</th>
                  <th className='border-1 p-1'>Tech Stack</th>
                  <th className='border-1 p-1'>Course</th>
                  <th className='border-1 p-1'>Update</th>
                  <th className='border-1 p-1'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="11">No data available</td>
                  </tr>
                ) : (
                  currentRows.map((row) => (
                    <tr key={row.Id } className=" border-2 border-slate-100 rounded-md bg-indigo-100 text-xs text-gray-600 font-sans font-medium tracking-wide hover:bg-lime-50 ">

                      <td className="border-1 p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.Id)}
                          onChange={() => toggleSelectRow(row.Id)}

                        />
                      </td>
                      <td className="border-1 p-1">{row.Date}</td>
                      <td className='border-1 p-1'>{row.Name}</td>
                      <td className='border-1 p-1'>{row.Lead_Status}</td>
                      <td className='border-1 p-1'>{row.Contact_No}</td>
                      <td className='border-1 p-1'>{row.Email}</td>
                      <td className='border-1 p-1'>{row.Tech_Stack}</td>
                      <td className='border-1 p-1'>{row.Course}</td>
                      <td className=' border-1 p-1'>
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
                      <td className='border-1 p-1'>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleDelete(row.Id)}
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

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 space-x-2">
              {/* Previous Button */}
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className={`px-1 border rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                  }`}
              >
                <ArrowBackIosIcon className="text-sm" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={` w-fit h-fit px-1 border rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-1   border rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
                  }`}
              >
                <ArrowForwardIosSharpIcon className="text-sm" />
              </button>
            </div>
          </div>
        )}
        {isKanbanVisible && (
          <div className="w-full">
            <div className="w-[100%] flex gap-x-2 items-start justify-evenly py-6 overflow-x-auto">
              {renderKanbanColumn("Not Contacted")}
              {renderKanbanColumn("Attempted")}
              {renderKanbanColumn("Warm Lead")}
              {renderKanbanColumn("Cold Lead")}
            </div>
          </div>
        )}
      </div>



    </div>
  );
}