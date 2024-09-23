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
import LearnForm from "../Forms/learnForm";
// import UpdateForm from "../Forms/LearnerUpdateForm";

export default function LearnerManagement() {
  // const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByLearnertatus, setFilterByLearnertatus] = useState("");

  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isKanbanVisible, setIsKanbanVisible] = useState(false);
  const [isFormVisible, setISFormVIsible] = useState(false);
  const [Learner, setLearner] = useState([]);





  const openForm = () => {
    setISFormVIsible(true);
  }

  const closeForm = () => {
    setISFormVIsible(false);
  }

  const [counts, setCounts] = useState({
    Upcoming: 0,
    Ongoing: 0,
    OnHold: 0,
   Completed: 0,
  });

  const fetchLearner = async () => {
    try {
      const response = await fetch('http://localhost:3002/Learner', {
        method: 'GET'
      });
      const data = await response.json()
      setLearner(data);
      console.log(data);
      setFilteredRows(data);
    } catch (error) {
      console.error('Error fetching Learner:', error)
    }
  }


  const handleCreateLearner = (newLearner) => {
    // Add the new Learner to the state and sort by date (most recent first)
    setLearner((prevLearner) => {
      const updatedLearner = [newLearner, ...prevLearner]; // Add the new Learner at the top
      return updatedLearner.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setFilteredRows((prevLearner) => {
      const updatedLearner = [newLearner, ...prevLearner];
      return updatedLearner.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  useEffect(() => {
    fetchLearner()
  }, [])

  useEffect(() => {
    let filteredData = Learner.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterByLearnertatus === "" || row.Learner_status === filterByLearnertatus)
    );
    setFilteredRows(filteredData);

    const updatedCounts = {
      Upcoming: filteredData.filter(row => row.Learner_status === "Upcoming").length,
      Ongoing: filteredData.filter(row => row.Learner_status === "Ongoing").length,
      OnHold: filteredData.filter(row => row.Learner_status === "On Hold").length,
     Completed: filteredData.filter(row => row.Learner_status === "Completed").length,
    };

    setCounts(updatedCounts);
  }, [searchQuery, filterByLearnertatus, Learner]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3002/Learner${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setLearner(prevRows => prevRows.filter(row => row.id !== id));
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
    const filteredLearner = filteredRows.filter(Learner => Learner.Learner_status === status);

    const getColorByStatus=()=>{
      switch(status){
        case "Upcoming":
          return "bg-green-100 border-t-[5px] border-t-green-800";
        case "Ongoing":
          return " bg-yellow-100 border-t-[5px] border-t-yellow-800";
        case "On Hold":
          return "bg-orange-100 border-t-[5px] border-t-orange-800";
        case "Completed":
          return "bg-pink-100 border-t-[5px] border-t-pink-800";
      }

    }
    return (
      <div className="grid gap-3 text-center min-w-[200px] max-w-[300px]">
        <div className={`border-1  flex flex-col not-italic gap-2 rounded-lg text-sm p-2 ${getColorByStatus(status)}`}>
          <p>{status}</p>
          <p>
            {filteredLearner.length} Learner
          </p>
        </div>
        <div className="w-full h-[calc(100vh-300px)] overflow-y-auto border-1 bg-gray-100 rounded-lg p-2">
          {filteredLearner.length === 0 ? (
            <p>No Learner</p>
          ) : (
            filteredLearner.map((Learner) => (
              <div key={Learner.id} className="bg-white p-2 mb-2 rounded-md shadow text-sm">
                <p className="font-bold">{Learner.name}</p>
                <p>{Learner.email}</p>
                <p>{Learner.contact_no}</p>
                <div className="flex justify-between mt-2">
                  <button className="text-green-700 flex items-center text-xs">
                    <EditIcon className="w-4 h-4 mr-1" />
                    Update
                  </button>
                  <button onClick={() => handleDelete(Learner.id)} className="text-red-600 flex items-center text-xs">
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
                    All Learner
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-5 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Today Learner</p>
                    </MenuItem>
                    <MenuItem>
                      <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Yesterday Learner</p>
                    </MenuItem>
                    <MenuItem>
                      <p className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">Previous Learner</p>
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
                  Create Learner
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
              </div>
              {
                isFormVisible &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                  <LearnForm closeForm={() => setISFormVIsible(false)} handleCreateLearner={handleCreateLearner} />
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
            {['Upcoming', 'Ongoing', 'On Hold', 'Completed'].map((status) => (
              <Menu key={status} as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton
                    onClick={() => setFilterByLearnertatus(status)}
                    className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${filterByLearnertatus === status ? 'bg-blue-500 text-white' : 'bg-white'}`}
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
              <table className=' min-w-[1300px] border-2 text-center table-auto text-sm capitalize text-medium w-full rounded-md ml-[730px] '>
                <thead>
                  <tr className='border-2 bg-rose-200 p-5 font-semibold '>
                    <th className="border-2 px-3" >

                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={filteredRows.length > 0 && selectedRows.length === filteredRows.length}
                      />

                    </th >
                    <th className='border-2 px-[50px]'>created On</th>
                    <th className='border-2 px-[50px]'>Name</th>
                    <th className='border-2 px-[50px]'>Registered Date</th>
                    <th className='border-2 px-[50px]'>Contact</th>
                    <th className='border-2 px-[50px]'>Email</th>
                    <th className='border-2 px-[50px]'>TechStack</th>
                    <th className='border-2 px-[50px]'>Mode Of class</th>
                    <th className='border-2 px-[50px]'>Total Fees</th>
                    <th className='border-2 px-[50px]'>Fee paid</th>
                    <th className='border-2 px-[50px]'>Due Amount</th>
                    <th className='border-2 px-[50px]'>Due Date</th>
                    <th className='border-2 px-[50px]'>Update</th>
                    <th className='border-2 px-[50px]'>Delete</th>
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
                        <td className="border-2 p-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleSelectRow(row.id)}

                          />
                        </td>
                        <td className="border-2 p-2">{row.date}</td>
                        <td className='border-2 p-2'>{row.name}</td>
                        <td className='border-2 p-2'>{row. registeredDate}</td>
                        <td className='border-2 p-2'>{row.contact_no}</td>
                        <td className='border-2 p-2'>{row.email}</td>
                        <td className='border-2 p-2'>{row.TechStack}</td>
                        <td className='border-2 p-2'>{row.totalFee}</td>
                        <td className='border-2 p-2'>{row.feePaid}</td>
                        <td className='border-2 p-2'>{row.dueAmounts}</td>
                        <td className='border-2 p-2'>{row. dueDate}</td>
                        <td className=' border-2 px-3'>
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
                                onUpdate={fetchLearner} // or whatever method you use to refresh the data
                              />
                            </div>
                            )}

                          </div>
                        </td>
                        <td className='border-2 px-3'>
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
                {renderKanbanColumn("Upcoming")}
                {renderKanbanColumn("Ongoing")}
                {renderKanbanColumn("On Hold")}
                {renderKanbanColumn("Completed")}
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