import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function UpdateForm({ rowData, onClose, onUpdate }) {

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [formData, setFormData] = useState(rowData);


    useEffect(() => {
        setFormData(rowData);
    }, [rowData]);

    const closeForm = () => {
        setIsFormVisible(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            // Create updated form data
            const updatedFormData = {
                ...prevData,
                [name]: value
            };

            // Handle date field if it's changing
            if (name === "date") {
                updatedFormData.date = value;
            }

            // If total_fee or fee_paid is changing, calculate due_Amount
            if (name === "total_fee" || name === "fee_Paid") {
                const total_fee = parseInt(updatedFormData.total_fee) || 0; // Default to 0 if NaN
                const fee_paid = parseInt(updatedFormData.fee_Paid) || 0;   // Default to 0 if NaN
                updatedFormData.due_Amount = total_fee - fee_paid; // Calculate due amount
            }

            // Return the updated form data to be set in state
            return updatedFormData;
        });
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the updated data to the JSON server
            const learnersApiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${learnersApiUrl}/learners/${rowData.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData), // Make sure formData is correctly structured
            });

            if (!response.ok) {
                // Handle server errors
                const errorDetails = await response.text();  // Get the error details
                throw new Error(`Failed to update learner: ${response.statusText} - ${errorDetails}`);
            }

            AlertMessage("Learner Updated Successfully" , 'success');

            // Call the update function to refresh the table
            onUpdate();

            // Close the form after successful update
            onClose();

        } catch (error) {
            console.error('Error updating learner:', error);
            AlertMessage('There was an issue updating the learner.', 'error');
        }
        onUpdate(); // Call the update function to refresh the table
        onClose(); // Close the form
    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="bg-white w-[900px]  max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5 overscroll-contain overflow-y-auto">


                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-md">
                            <FontAwesomeIcon icon={faIdCard} className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]" />
                        </div>
                        <p className="text-lg font-bold">Update learner</p>
                        <span>
                            <input
                                type="text"
                                name="name"
                                value={formData.FirstName}
                                onChange={handleChange}
                                placeholder="Name"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </span>
                    </div>
                    <div>
                        <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>


                    {/* learner Status */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">learner Status</label>
                        <select
                            name="learner_Status"
                            value={formData.learner_Status}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select learner Status</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* contact_no */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="number"
                            pattern='[0-9]{10}'
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="contact_no"
                            minLength="10"
                            maxLength="10"
                            required
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* TechStack */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">TechStack</label>
                        <input
                            type='text'
                            name="TechStack"
                            value={formData.TechStack}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                    </div>

                    {/* Total fee*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Total Fee</label>
                        <input
                            type="text"
                            name="total_fee"
                            value={formData.total_fee}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Fee paid*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium"> Fee Paid</label>
                        <input
                            type="text"
                            name="fee_Paid"
                            value={formData.fee_Paid}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Due Amount*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Due Amount</label>
                        <input
                            type="text"
                            name="due_Amount"
                            value={formData.due_Amount}
                            onChange={handleChange}
                            readOnly
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Due Date*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>



                    {/*Batch Timing */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Batch Timing</label>
                        <input
                            type="time"
                            name="batch_Timing"
                            value={formData.batch_Timing}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Mode Of Class*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Mode Of Class</label>
                        <select

                            name="mode_of_class"
                            value={formData.mode_of_class}
                            onChange={handleChange}
                            placeholder="Mode Of Class"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled> select mode of class</option>
                            <option value="Online" >Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>


                </div>

                {/* Add other fields as necessary */}
                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md">Update learner </button>
                </div>
            </div>
        </form>
    );

};