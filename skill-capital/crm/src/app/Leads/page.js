
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
// import Navbar from '../../context/navbarslide';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableChartIcon from '@mui/icons-material/TableChart';
import LeadForm from "../Forms/leadform";
import LeadKanban from "../kanban/leadkanban";







const Leads = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [rows, setRows] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [filteredRows, setFilteredRows] = useState([]);

  const [filterByLeadStatus, setFilterByLeadStatus] = useState("");


  const [counts, setCounts] = useState({
    NotContacted: 0,
    Contacted: 0,
    WarmLead: 0,
    ColdLead: 0,
  });

  const [isBlue1, setIsBlue1] = useState(false); // State for first button
  const [isBlue2, setIsBlue2] = useState(false); // State for second button
  const [isBlue3, setIsBlue3] = useState(false); // State for second button
  const [isBlue4, setIsBlue4] = useState(false); // State for second button

  // Leads.js
  const handleAddLead = (formData) => {
    const now = new Date();
    // Generate timestamp with locale format
    const date = now.toLocaleDateString('en-GB'); // Adjust the locale to 'en-GB' for DD/MM/YYYY format or change as required
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // HH:MM:SS format
    const timestamp = `${date} ${time}`; // Combine date and time

    // Add timestamp to the lead data
    const leadWithTimestamp = { ...formData, createdOn: timestamp };
    setRows((prevRows) => [leadWithTimestamp, ...prevRows]);
  };



  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };




  const handleColorChange1 = () => {
    setIsBlue1((prev) => !prev); // Toggle color for first button
    setIsBlue2(false);
    setIsBlue3(false);
    setIsBlue4(false);
    setFilterByLeadStatus("Not Contacted");
  };

  const handleColorChange2 = () => {
    setIsBlue2((prev) => !prev); // Toggle color for second button
    setIsBlue1(false);
    setIsBlue3(false);
    setIsBlue4(false);
    setFilterByLeadStatus("Contacted");
  };

  const handleColorChange3 = () => {
    setIsBlue3((prev) => !prev); // Toggle color for second button
    setIsBlue1(false);
    setIsBlue2(false);
    setIsBlue4(false);
    setFilterByLeadStatus("Warm Lead");
  };

  const handleColorChange4 = () => {
    setIsBlue4((prev) => !prev); // Toggle color for second button
    setIsBlue1(false);
    setIsBlue3(false);
    setIsBlue2(false);
    setFilterByLeadStatus("Cold Lead");
  };


  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('http://localhost:3000/Leads')
      .then(response => response.json())
      .then(data => {
        setRows(data);
        setFilteredRows(data);

      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    let filteredData = rows.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterByLeadStatus === "" || row.leadStatus === filterByLeadStatus)
    );
    setFilteredRows(filteredData);

    const updatedCounts = {
      NotContacted: filteredData.filter(row => row.leadStatus === "Not Contacted").length,
      Contacted: filteredData.filter(row => row.leadStatus === "Contacted").length,
      WarmLead: filteredData.filter(row => row.leadStatus === "Warm Lead").length,
      ColdLead: filteredData.filter(row => row.leadStatus === "Cold Lead").length,
    };

    setCounts(updatedCounts);

  }, [searchQuery, filterByLeadStatus, rows]);


  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter rows based on the search query
    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(query)
    );

    setFilteredRows(filtered);
  };



  const handleDelete = (id) => {
    fetch(`http://localhost:3000/Leads/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted row from the table state
          setRows(prevRows => prevRows.filter(row => row.id !== id));
        } else {
          console.error('Error deleting the row');
        }
      })
      .catch(error => console.error('Error in delete request:', error));
  };


  const [isTableVisible, setIsTableVisisble] = useState(true);
  const [isKanbanVisible, setIsKanbanVisible] = useState(false);

  const openTable = () => {
    setIsTableVisisble(true);
    setIsKanbanVisible(false);
  }

  const openKanban = () => {
    setIsTableVisisble(false);
    setIsKanbanVisible(true);
  }

  return (


    <div className="bg-light py-2 gap-y-5 border-1">

      <div className="w-full h-full border-1 rounded  flex  items-center  justify-between gap-x-2   p-2">

        <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">

          <div className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]">
            <FontAwesomeIcon icon={faIdCard} />
          </div>


          <div className="flex items-center justify-end">
            <p>All Leads</p>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>

        </div>


        <div className="flex gap-4 items-center">

          <CalendarMonthIcon style={{ fontSize: 26, color: 'black' }} />

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={openForm}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:bg-blue-500 hover:text-white">
                Create leads
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
              {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                  <LeadForm closeForm={closeForm} handleAddLead={handleAddLead} />
                </div>
              )}
            </div>
          </Menu>


          <Menu as="div" className="relative inline-block text-left">

            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white">
                Actions
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
            </div>
          </Menu>
        </div>

      </div>


      <div className=" flex w-full h-fit border-1  items-center justify-around">

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

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={handleColorChange1}
                className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-1 text-sm  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${isBlue1 ? 'bg-blue-500 text-white ' : 'bg-white text-gray-900'}`}>
                Not Contacted
                <div className=" flex w-[28px] h-[28px] items-center bg-red-400 justify-center rounded-full text-sm ">
                  {counts.NotContacted}
                </div>
              </MenuButton>
            </div>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={handleColorChange2}
                className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-1 text-sm  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${isBlue2 ? 'bg-blue-500 text-white' : 'bg-light'}`}>
                Contacted
                <div className=" flex w-[28px] h-[28px] items-center bg-red-400 justify-center rounded-full text-sm ">
                  {counts.Contacted}
                </div>

              </MenuButton>
            </div>
          </Menu>


          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={handleColorChange3}
                className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-1 text-sm  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${isBlue3 ? 'bg-blue-500 text-white ' : 'bg-light'}`}>
                Warm Lead
                <div className=" flex w-[28px] h-[28px] items-center bg-red-400 justify-center rounded-full text-sm ">
                  {counts.WarmLead}
                </div>

              </MenuButton>
            </div>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                onClick={handleColorChange4}
                className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-1 text-sm  font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-300 ${isBlue4 ? 'bg-blue-500 text-white' : 'bg-light'}`}>
                Cold Lead
                <div className=" flex w-[28px] h-[28px] items-center bg-red-400 justify-center rounded-full text-sm ">
                  {counts.ColdLead}
                </div>
              </MenuButton>
            </div>
          </Menu>

        </div>


        <div className="flex py-2 gap-1 ">

          <div
            onClick={openTable}
            className="flex w-[90px] items-center justify-around gap-1 border-2 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <TableChartIcon className="w-4 h-4" />
            <button>table</button>

          </div>

          <div
          onClick={openKanban }
           className="flex  w-[90px] items-center justify-between gap-1 border-2 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <button>kanban</button>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>
        </div>

      </div>




      <div>
        {isTableVisible &&

          <div className=" flex items-center justify-center w-full h-full m-auto p-1 border-2 border-gray-100 rounded-md">
            <table className='border-2  text-center table-auto   text-sm capitalize text-semibold w-full rounded-md' >
              <thead>
                <tr className='border-2 bg-rose-200 p-5'>
                  <th className='border-2 px-3'>created On</th>
                  <th className='border-2 px-3' >Name</th>
                  <th className='border-2 px-3'>Lead Status</th>
                  <th className='border-2 px-3'>Phone</th>
                  <th className='border-2 px-3'>Email</th>
                  <th className='border-2 px-3'>Stack</th>
                  <th className='border-2 px-3'>Course</th>
                  <th className='border-2 px-3'>Update</th>
                  <th className='border-2 px-3'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan="11">No data available</td>
                  </tr>
                ) : (
                  filteredRows.map((row, index) => (
                    <tr key={index} className="bg-green-100">
                      <td className="border-2 p-2 ">{row.createdOn}</td> {/* New column data not exising in form */}
                      <td className='border-2 p-2'>{row.name}</td>
                      <td className='border-2 p-2'>{row.leadStatus}</td>
                      <td className='border-2 p-2'>{row.phone}</td>
                      <td className='border-2 p-2'>{row.email}</td>
                      <td className='border-2 p-2'>{row.stack}</td>
                      <td className='border-2 p-2'>{row.course}</td>
                      <td className='border-2 px-3'>
                        <div className="flex  items-center">
                          <button
                            onClick={''}
                            className="w-[70px] justify-center items-center text-green-700 flex border-1 bg-gray-200 rounded-md">
                            <EditIcon className=" w-[20px] h-[20px]" />
                            <p>Update</p>
                          </button>
                        </div>
                      </td>

                      <td className='border-2 px-3'>
                        <div className="flex  items-center">
                          <button
                            onClick={() => handleDelete(row.id)}
                            className=" w-[70px] justify-center items-center text-red-600 flex border-1 bg-gray-200 rounded-md">
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
        }
        {
          isKanbanVisible &&
          <div className="w-full">
          <LeadKanban />
          </div>
        }
      </div>
    </div>



  )

};
export default Leads;