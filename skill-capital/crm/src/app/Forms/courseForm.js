import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';


export default function CourseForm({ closeForm, handleAddLead }) {

    const [image, setImage] = useState(null);

    const [formData, setFormData] = useState({
        courseName: '',

        courseFee: '',

        courseDescription: ''

    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior
        setFormData({

            courseName: '',

            courseFee: '',

            courseDescription: ''
        }); // Reset the form data
        handleAddLead(formData);
        closeForm(); // Close the form
        alert("Form data successfully submitted"); // Show confirmation
    };



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white w-full max-w-xl  max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5 overscroll-contain overflow-y-auto">
                {/* Form Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-md">
                            <FontAwesomeIcon icon={faIdCard} className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]" />
                        </div>
                        <p className="text-lg font-bold">Create Course</p>
                    </div>
                    <div>
                        <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <p className='font-semibold text-sm capitalize pb-8'>course image</p><br />

                    <div className='flex gap-3 items-center'>
                        <div
                            className='flex items-center w-[90px] h-[90px] border-2 rounded-full'
                            style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            {!image && <PersonIcon className='w-full h-full' />} {/* Display default icon if no image */}
                        </div>
                        <div>
                            <label htmlFor='file-upload'>
                                <EditIcon />
                            </label>
                            <input
                                id='file-upload'
                                type='file'
                                className='hidden'
                                onChange={handleFileChange}
                            />
                        </div>
                    </div><br />

                    <p className='font-semibold text-sm capitalize'>course information</p><br />

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium"> Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Course Fee*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Fee</label>
                        <input
                            type="text"
                            name="courseFee"
                            value={formData.courseFee}
                            onChange={handleChange}
                            placeholder="Course Fee"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Description</label>
                        <input
                            type="text"
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {/*Course Brochure */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Brochure</label>
                        <input
                            type="text"
                            name="courseBrochure"
                            value={formData.courseBrochure}
                            onChange={handleChange}
                            placeholder="Course Brochure"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>




                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                </div>
            </div>
        </form>
    );
}
