import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CourseForm({ closeForm, courseData }) {
    // State for storing the form data and the image preview
    const [formData, setFormData] = useState({
        Course_Name: '',
        Course_Fee: '',
        Description: '',
        Course_Image: '',
        Course_Brochure: '',
        date: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    // Initialize the form with the existing course data (if available)
    useEffect(() => {
        if (courseData) {
            setFormData({
                Course_Name: courseData.Course_Name || '',
                Course_Fee: courseData.Course_Fee || '',
                Description: courseData.Description || '',
                Course_Image: courseData.Course_Image || '',  // URL from backend
                Course_Brochure: courseData.Course_Brochure || '', // URL from backend
                date: courseData.date || ''
            });
            setImagePreview(courseData.Course_Image);  // Show the current course image
        }
    }, [courseData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file inputs separately
        if (files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0]  // Store the file object
            });

            if (name === 'Course_Image') {
                const imageUrl = URL.createObjectURL(files[0]);
                setImagePreview(imageUrl);  // Show preview of the uploaded image
            }
        } else {
            setFormData({
                ...formData,
                [name]: value  // Handle text input changes
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const CourseApiUrl = process.env.NEXT_PUBLIC_API_URL;
        const formDataToSend = new FormData();

        formDataToSend.append('Course_Name', formData.Course_Name);
        formDataToSend.append('Course_Fee', formData.Course_Fee);
        formDataToSend.append('Description', formData.Description);
        formDataToSend.append('date', formData.date);

        // Append new files if they are uploaded
        if (formData.Course_Image instanceof File) {
            formDataToSend.append('Course_Image', formData.Course_Image);
        }
        if (formData.Course_Brochure instanceof File) {
            formDataToSend.append('Course_Brochure', formData.Course_Brochure);
        }

        try {
            const response = await axios.post(`${CourseApiUrl}/courses/`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success("Course Created Successfully");
                setFormData({
                    Course_Name: '',
                    Course_Fee: '',
                    Description: '',
                    Course_Image: '',
                    Course_Brochure: '',
                    date: ''
                });
                setImagePreview(null);  // Reset the image preview
                closeForm();  // Close the form on success
            } else {
                toast.error("Failed to Create Course. Please Try Again!");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white w-full max-w-xl max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5 overscroll-contain overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-md">
                            <FontAwesomeIcon icon={faIdCard} className="flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]" />
                        </div>
                        <p className="text-lg font-bold">Create Course</p>
                    </div>
                    <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <p className="font-semibold text-sm capitalize pb-8">Course Image</p>
                    <div className="flex gap-3 items-center">
                        <div className="flex items-center w-[90px] h-[90px] border-2 rounded-full"
                            style={{ backgroundImage: `url(${imagePreview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            {!imagePreview && <PersonIcon className="w-full h-full" />}
                        </div>
                        <div>
                            <label htmlFor="file-upload">
                                <EditIcon />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                name="Course_Image"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Name</label>
                        <input
                            type="text"
                            name="Course_Name"
                            value={formData.Course_Name}
                            onChange={handleChange}
                            placeholder="Course Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Fee</label>
                        <input
                            type="text"
                            name="Course_Fee"
                            value={formData.Course_Fee}
                            onChange={handleChange}
                            placeholder="Course Fee"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Description</label>
                        <input
                            type="text"
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Brochure</label>
                        <input
                            type="file"
                            name="Course_Brochure"
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                </div>
            </div>
        </form>
    );
}
