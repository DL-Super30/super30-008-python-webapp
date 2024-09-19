'use client';
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import TableChartIcon from '@mui/icons-material/TableChart';
import LearnForm from '../Forms/learnForm';

// http://localhost:3000/Learner

const Learner = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [rows, setRows] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  // Leads.js
  const handleAddLead = (formData) => {
    const now = new Date();
    const timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const leadWithTimestamp = { ...formData, createdOn: timestamp };
    setRows((prevRows) => [leadWithTimestamp, ...prevRows]); // Insert at the top
  };



  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const filteredRows = rows.filter((row) =>
    row.name ? row.name.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );


  return (



    <div className="bg-light py-2 border-1">

      <div className="w-full h-full border-1 rounded  flex  items-center  justify-between gap-x-2  m-2 p-2">

        <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">

          <div className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]">
            <FontAwesomeIcon icon={faIdCard} />
          </div>


          <div className="flex items-center justify-end">
            <p>All Learners</p>
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
                Create Learner
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
              </MenuButton>
              {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                  <LearnForm closeForm={closeForm} handleAddLead={handleAddLead} />
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-1 border-slate-600 bg-gray-200 rounded-full pl-10 pr-4 py-2"
          />
          <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-600" />
        </div>

        <div className="flex gap-1 rounded-r-lg">

          <div className="flex items-center justify-between gap-3 border-2  border-slate-100 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <span>Upcomming</span>
            <div className=" flex w-[30px] h-[30px] items-center bg-red-400 justify-center rounded-full ">
              1
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-2  border-slate-100 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <span>Ongoing</span>
            <div className=" flex w-[30px] h-[30px] items-center bg-red-400 justify-center rounded-full ">
              1
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-2  border-slate-100 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <span>On Hold</span>
            <div className=" flex w-[30px] h-[30px] items-center bg-red-400 justify-center rounded-full ">
              1
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-2  border-slate-100 bg-light text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <span>Completed</span>
            <div className=" flex w-[30px] h-[30px] items-center bg-red-400 justify-center rounded-full ">
              1
            </div>
          </div>

        </div>

        <div className="flex ">

          <div className="flex w-[90px] items-center justify-around gap-1 border-2  border-slate-100 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <TableChartIcon className="w-4 h-4" />
            <span>table</span>
          </div>

          <div className="flex  w-[90px] items-center justify-between gap-1 border-2  border-slate-100 bg-light  text-sm p-1 rounded-full hover:bg-blue-500 hover:text-white">
            <span>kanban</span>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
          </div>
        </div>

      </div>

      <div className=" flex items-center justify-center w-full h-full m-auto p-5 border-2 border-gray-100 rounded-md">
        <div className="w-full overflow-x-auto">
          <table className="border-2  text-center table-auto text-sm capitalize text-semibold  w-full rounded-md " >
            <thead>
              <tr className='border-2'>
                <th className='border-2 px-3'>Created Time</th>
                <th className='border-2 px-3'>Registered Date</th>
                <th className='border-2 px-3'>Last Name</th>
                <th className='border-2 px-3'>Phone</th>
                <th className='border-2 px-3'>Email</th>
                <th className='border-2 px-3'>mode Of Class</th>
                <th className='border-2 px-3' >Tech Stack</th>
                <th className='border-2 px-3'>Total Fee</th>
                <th className='border-2 px-3'>Fee Paid</th>
                <th className='border-2 px-3'>Due Amount</th>
                <th className='border-2 px-3'>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan="11">No data available</td>
                </tr>
              ) : (
                filteredRows.map((row, index) => (
                  <tr key={index}>
                    <td className="border-2 px-3">{row.createdOn}</td> {/* New column data not exising in form */}
                    <td className='border-2 px-3'>{row.registeredDate}</td>
                    <td className='border-2 px-3'>{row.lastName}</td>
                    <td className='border-2 px-3'>{row.phone}</td>
                    <td className='border-2 px-3'>{row.email}</td>
                    <td className='border-2 px-3'>{row.modeOfClass}</td>
                    <td className='border-2 px-3'>{row.techStack}</td>
                    <th className='border-2 px-3'>{row.totalFee || 'N/A'}</th>
                    <th className='border-2 px-3'>{row.feePaid || 'N/A'}</th>
                    <th className='border-2 px-3'>{row.dueAmount || 'N/A'}</th>
                    <th className='border-2 px-3'>{row.dueDate || 'N/A'}</th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )

};
export default Learner;