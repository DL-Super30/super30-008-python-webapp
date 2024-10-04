"use client";

import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CourseForm from "../Forms/courseForm";
import { toast } from 'react-toastify';
import axios from "axios";


export default function CourseManagement() {
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const fetchCourses = async () => {
        const CourseApiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
            const response = await axios.get(`${CourseApiUrl}/courses/`);

            const data = await response.data;
            console.log(data);
            setCourses(data);
            setFilteredRows(data);
            // handleCreateLearner(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // const handleCreateLearner = (newLearner) => {
    //     // Add the new Learner to the state and sort by date (most recent first)
    //     setCourses((prevLearners) => {
    //         const updatedLearners = [newLearner, ...prevLearners]; // Add the new Learner at the top
    //         return updatedLearners.sort((a, b) => new Date(b.date) - new Date(a.date));
    //     });
    //     setFilteredRows((prevLearners) => {
    //         const updatedLearners = [newLearner, ...prevLearners];
    //         return updatedLearners.sort((a, b) => new Date(b.date) - new Date(a.date));
    //     });
    // };

    useEffect(() => {
        const filteredData = courses.filter(row =>
            row?.Course_Name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRows(filteredData);
        // console.log(filteredData);
    }, [searchQuery, courses]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
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

    const handleDelete = (id) => {
        const CourseApiUrl = process.env.NEXT_PUBLIC_API_URL;
        axios.delete(`${CourseApiUrl}/courses/${id}/`)
            .then(response => {
                if (response.status>=200 && response.status<300) {
                    setCourses(prevRows => prevRows.filter(row => row.id !== id));
                    AlertMessage("Course Deleted Successfully",'success');
                } else {
                   AlertMessage('Error deleting the row','error');
                }
            })
            .catch(error => console.error('Error in delete request:', error));
    };

    const toggleSelectAll = (event) => {
        setSelectedRows(event.target.checked ? filteredRows.map(row => row.id) : []);
    };

    const toggleSelectRow = (rowId) => {
        setSelectedRows(prevSelected => prevSelected.includes(rowId)
            ? prevSelected.filter(id => id !== rowId)
            : [...prevSelected, rowId]);
    };

    const handleDeleteSelected = () => {
        selectedRows.forEach(rowId => handleDelete(rowId));
        setSelectedRows([]);
    };

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const currentRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="bg-light py-2 gap-y-5 border-1 rounded-3xl mt-1 bg-slate-200">
            <div className="w-full h-full border-1 rounded flex items-center justify-between gap-x-2 p-2">
                <div className="w-fit h-fit flex items-center justify-evenly px-3 gap-7">
                    <div className="flex items-center justify-end">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                <LeaderboardIcon />
                                All Courses
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                            </MenuButton>
                            <MenuItems className="absolute right-5 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                <div className="py-1">
                                    <MenuItem><p className="block px-4 py-2 text-sm text-gray-700">Today Courses</p></MenuItem>
                                    <MenuItem><p className="block px-4 py-2 text-sm text-gray-700">Yesterday Courses</p></MenuItem>
                                    <MenuItem><p className="block px-4 py-2 text-sm text-gray-700">Previous Courses</p></MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton onClick={() => setIsFormVisible(true)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white">
                            Create Course
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                        {isFormVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-5">
                                <CourseForm closeForm={() => setIsFormVisible(false)} />
                            </div>
                        )}
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 hover:text-white">
                            Actions
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems className="absolute right-5 z-10 mt-2 w-[120px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                            <div className="py-1">
                                <MenuItem onClick={handleDeleteSelected}>
                                    <button className="w-full block px-4 py-2 text-sm text-gray-700">Delete</button>
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
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full m-auto p-2 border-2 border-gray-100 rounded-2xl overflow-x-auto">
                <table className='min-w-full border-2 text-center table-auto text-xs capitalize font-light w-full rounded-3xl'>
                    <thead>
                        <tr className='border-2 bg-teal-500 p-5 font-thin rounded-3xl'>
                            <th className="border-1 p-2">
                                <input
                                    type="checkbox"
                                    onChange={toggleSelectAll}
                                    checked={filteredRows.length > 0 && selectedRows.length === filteredRows.length}
                                />
                            </th>
                            <th className='border-1 p-2'>Created On</th>
                            <th className='border-1 p-2'>Course</th>
                            <th className='border-1 p-2'>Course Fee</th>
                            <th className='border-1 p-2'>Description</th>
                            <th className='border-1 p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.length === 0 ? (
                            <tr>
                                <td colSpan="8">No data available</td>
                            </tr>
                        ) : (
                            currentRows.map((row) => (
                                <tr key={row.id} className="border-2 border-slate-100 bg-indigo-100 text-xs font-sans font-medium text-gray-600 tracking-wide hover:bg-lime-50">
                                    <td className='border-1 p-2'>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => toggleSelectRow(row.id)}
                                        />
                                    </td>
                                    <td className='border-1 p-2'>{row.date|| '-'}</td>
                                    <td className='border-1 p-2'>{row.Course_Name}</td>
                                    <td className='border-1 p-2'>{row.Course_Fee}</td>
                                    <td className='border-1 p-2'>{row.Description}</td>
                                    <td className='border-1 p-2'>
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

                <div className="flex justify-between w-full p-2">
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
                    <div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ArrowBackIosIcon />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowForwardIosSharpIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
