
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

import SearchIcon from '@mui/icons-material/Search';
import CourseForm from '../Forms/courseForm';





export default function Course() {

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

    const filteredRows = rows.filter((row) =>{
       row.name ? row.name.toLowerCase().includes(searchQuery.toLowerCase()):false;
});


    return (


        <div className="bg-light py-2 border-1">

            <div className="w-full h-full border-1 rounded  flex  items-center  justify-between gap-x-2  m-2 p-2">

                <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">

                    <div className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]">
                        <FontAwesomeIcon icon={faIdCard} />
                    </div>


                    <div className="flex items-center justify-end">
                        <p>Courses</p>
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </div>

                </div>


                <div className="flex gap-4 items-center">


                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton
                                onClick={openForm}
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:bg-blue-500 hover:text-white">
                                Create Course
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                            </MenuButton>
                            {isFormVisible && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 m-h-[50px] p-5">
                                    <CourseForm closeForm={closeForm} handleAddLead={handleAddLead} />
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


            <div className=" flex w-full h-fit border-1  items-center justify-start">

                <div className="relative flex rounded-full">
                    <input
                        type="search"
                        placeholder="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-1 border-slate-600 bg-gray-200 rounded-full pl-10 pr-4 py-2"
                    />
                    <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-slate-600" />
                </div>


            </div>



            <div className=" flex items-center justify-center w-full h-full m-auto p-5 border-2 border-gray-100 rounded-md">
                <table className='border-2  text-center table-auto   text-sm capitalize text-semibold w-full rounded-md' >
                    <thead>
                        <tr className='border-2'>
                            <th className='border-2 px-3' colSpan={5}>created On</th>
                            <th className='border-2 px-3' colSpan={5} >Course</th>
                            <th className='border-2 px-3' colSpan={5}>Description</th>
                            <th className='border-2 px-3' colSpan={5}>Course Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.length === 0 ? (
                            <tr>
                                <td colSpan="18">No data available</td>
                            </tr>
                        ) : (
                            filteredRows.map((row, index) => (
                                <tr key={index}>
                                    <td className="border-2 px-3">{row.createdOn}</td> {/* New column data not exising in form */}
                                    <td className='border-2 px-3'>{row.courseName}</td>
                                    <td className='border-2 px-3'>{row.courseDescription}</td>
                                    <td className='border-2 px-3'>{row.courseFee}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>



    )

};
