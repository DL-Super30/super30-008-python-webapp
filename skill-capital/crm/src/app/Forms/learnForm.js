import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Select } from '@headlessui/react';
import { toast } from 'react-toastify';
import axios from 'axios';



export default function LearnForm({ closeForm, initialData }) {

    const [formData, setFormData] = useState(initialData || {
        First_Name: '',
        Last_Name: '',
        Phone: '',
        Email: '',
        Id_Proof: '',
        Date_of_Birth: '',
        Description: '',
        Registered_Date: '',
        BatchId: '',
        Alternate_Phone: '',
        total_fee: '',
       Source: '',
        Attended_Demo: '',
        Learner_Owner: '',
        Learner_Stage: '',
        Lead_Created_Time: '',
        fee_Paid: '',
       Counseling_Done_BY: '',
        Registered_Course: '',
        Preferable_Time: '',
        Tech_Stack: '',
        Batch_Timing: '',
        Course_Comments: '',
        Mode_Of_Class: '',
        Slack_Access: '',
        Comment: '',
        LMS_Access: '',
        due_Amount: '',
        due_date: '',
        learner_Status: '',
        Currency: '',
        Exchange_Rate:'',
        Location:'',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

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





    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        try {
            const LearnApiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.post(`${LearnApiUrl}/learners/`, formData , {
          
                headers: {
                    'Content-Type': 'application/json'},
            });


            // if (response.status!==200) {
            //     // Handle server errors
            //     throw new Error(`Failed to create learner: ${response.statusText}`);
            // }


            if (response.status >= 200 && response.status < 300) {

                AlertMessage('Learner Created Successfully', 'success');

                setFormData({
                    First_Name: '',
                    Last_Name: '',
                    Registered_Date: '',
                    Phone: '',
                    Email: '',
                    Mode_Of_Class: '',
                    Tech_Stack: '',
                    total_Fee: '',
                    fee_Paid: '',
                    due_Amount: '',
                    due_date: '',
                    learner_Status: '',
                    Currency:'',
                    Exchange_Rate:'',
                    Location:'',

                });

                closeForm(); // Close the form
            }
            else {
                AlertMessage('failed to create a Learner' , 'error');
            }
        } catch (error) {
            console.error("Learn Lead Unscessfully ", error);
            AlertMessage('Error to create a Learner' , 'error');
        }

    };



    return (
        <form onSubmit={handleSubmit}>

            <div className="bg-white w-[900px]  max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5 overscroll-contain overflow-y-auto">
                {/* Form Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-md">
                            <FontAwesomeIcon icon={faIdCard} className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]" />
                        </div>
                        <p className="text-lg font-bold">Create Learner</p>

                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="First_Name"
                                value={formData.First_Name}
                                onChange={handleChange}
                                placeholder=" Full Name"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium"> First Name</label>
                        <input
                            type="text"
                            name="First_Name"
                            value={formData.First_Name}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium"> Last Name</label>
                        <input
                            type="text"
                            name="Last_Name"
                            value={formData.Last_Name}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>



                    {/*Phone */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="number"
                            pattern='[0-9]{10}'
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            placeholder="Phone"
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
                            type="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Id Proof */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">IdProof</label>
                        <input
                            type="text"
                            name="Id_Proof"
                            value={formData.Id_Proof}
                            onChange={handleChange}
                            placeholder="Id Proof"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Date of Birth*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">DateofBirth</label>
                        <input
                            type="date"
                            name="Date_OF_Birth"
                            value={formData.Date_OF_Birth}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Registered Date*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">RegisteredDate</label>
                        <input
                            type="date"
                            name="Registered_Date"
                            value={formData.Registered_Date}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Batch ID's*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">BatchId</label>
                        <input
                            type="text"
                            name="Batch_Id"
                            value={formData.Batch_Id}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Alternate_Phone*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Alternatephone</label>
                        <input
                            type="text"
                            name="Alternate_Phone"
                            value={formData.Alternate_Phone}
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

                     {/* Currency*/}
                     <div className="flex flex-col">
                        <label className="text-sm font-medium">Currency</label>
                        <input
                            type="number"
                            name="Currency"
                            value={formData.Currency}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                     {/* ExchangeRate*/}
                     <div className="flex flex-col">
                        <label className="text-sm font-medium">ExchangeRate</label>
                        <input
                            type="number"
                            name="Exchange_Rate"
                            value={formData.Exchange_Rate}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>


                    {/*Source*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Source</label>
                        <input
                            type="text"
                            name="Source"
                            value={formData.Source}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>


                    {/* Attended Demo */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Attended Demo</label>
                        <select
                            name="Attended_Demo"
                            value={formData.Attended_Demo}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled> Select Attended Demo</option>
                            <option value="None">None</option>
                            <option value="Ready To Join">Ready To Join</option>
                            <option value="Call Not Answered">Call Not Answered</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                            <option value="Advanced Discussion">Advanced Discussion</option>
                            <option value="Visiting">Visiting</option>
                            <option value="Fees Negotiation">Fees Negotiation</option>
                            <option value="Batch Allocation">Batch Allocation</option>
                            <option value="Closed Own Register">Closed Own Register</option>
                            <option value="Closed Lost Cold Lead">Closed Lost Cold Lead</option>
                            <option value="Special Requirements">Special Requirements</option>
    
                        </select>
                    </div>

                     {/* Location */}
                     <div className="flex flex-col">
                        <label className="text-sm font-medium">Location</label>
                        <select
                            name="Location"
                            value={formData.Location}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Location</option>
                            <option value="None">None</option>
                            <option value="Ready To Join">Ready To Join</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                            <option value="Advanced Discussion">Advanced Discussion</option>
                            <option value="Visiting">Visiting</option>
                            <option value="Fees Negotiation">Fees Negotiation</option>
                            <option value="Batch Allocation">Batch Allocation</option>
                            <option value="Busy Asked A Call Back">Busy Asked A Call Back</option>
                            <option value="Closed Own Register">Closed Own Register</option>
                            <option value="Payment Link Sent">Payment Link Sent</option>
                            <option value="Special Requirements">Special Requirements</option>
                            <option value="Closed Lost">Closed Lost</option>
                            <option value="Interested Demo">Interested Demo</option>
    
                        </select>
                    </div>

                    {/* Learner Owner*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Owner</label>
                        <input
                            type="number"
                            name="Learner_Owner"
                            value={formData.Learner_Owner}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Learner Stage */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Stage</label>
                        <select
                            name="Learner_Stage"
                            value={formData.Learner_Stage}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Learner Stage</option>
                            <option value="Call Not Answered">Call Not Answered</option>
                            <option value="None">None</option>
                            <option value="Ready To Join">Ready To Join</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
           
                            <option value="Fees Negotiation">Fees Negotiation</option>
                            <option value="Batch Allocation">Batch Allocation</option>
                  
                            <option value="Closed Own Register">Closed Own Register</option>
                           
                            <option value="Special Requirements">Special Requirements</option>
                            
                            <option value="Interested Demo">Interested Demo</option>
                        </select>
                    </div>

                    {/* Learner Status */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Status</label>
                        <select
                            name="learner_Status"
                            value={formData.learner_Status}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Learner Status</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                        </select>
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

                    {/* Learner Created Time*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Created Time</label>
                        <input
                            type="date"
                            name="Lead_Created_Time"
                            value={formData.Lead_Created_Time}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Counselling Done By*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Counselling Done By</label>
                        <select
                            type="number"
                            name="Counseling_Done_BY"
                            value={formData.Counseling_Done_BY}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Counselling Done By</option>
                            <option value="True">True</option>
                            <option value="False">false</option>
                    </select>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
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

                    <p className='py-4 text-lg font-bold'>Course Details</p><br />

                    {/* Registered Courses Count */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Registered Courses Count</label>
                        <input
                            type="number"
                            name="Registered_Course"
                            value={formData.Registered_Course}
                            onChange={handleChange}
                            placeholder="Registered Courses Count"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/*Preferable Time */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Preferable Time</label>
                        <input
                            type="date"
                            name="Preferable_Time"
                            value={formData.Preferable_Time}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Tech Stack</label>
                        <input
                            type='text'
                            name="Tech_Stack"
                            value={formData.Tech_Stack}
                            onChange={handleChange}
                            placeholder="Tech Stack"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/*Batch Timing */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Batch Timing</label>
                        <input
                            type="date"
                            name="Batch_Timing"
                            value={formData.Batch_Timing}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Course Comments */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Course Comments</label>
                        <input
                            type="text"
                            name="Course_Comments"
                            value={formData.Course_Comments}
                            onChange={handleChange}
                            placeholder="Course Comments"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {/* Mode Of Class*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Mode Of Class</label>
                        <select

                            name="Mode_Of_Class"
                            value={formData.Mode_Of_Class}
                            onChange={handleChange}
                            placeholder="Mode Of Class"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled> select mode of class</option>
                            <option value="Online" >Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    {/* Slack Access */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Slack Access</label>
                        <Select
                            name="Slack_Access"
                            value={formData.Slack_Access}
                            onChange={handleChange}
                            placeholder="Slack Access"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Slack Access</option>
                            <option value="Yes" >Yes</option>
                            <option value="No" >No</option>
                        </Select>
                    </div>

                    {/* Comment */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Comment</label>
                        <input
                            type="text"
                            name="Comment"
                            value={formData.Comment}
                            onChange={handleChange}
                            placeholder="Comment"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {/* LMS Access */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">LMS Access</label>
                        <Select
                            name="LMS_Access"
                            value={formData.LMS_Access}
                            onChange={handleChange}
                            placeholder="LMS Access"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Lms Access</option>
                            <option value="Yes" >Yes</option>
                            <option value="No" >No</option>
                        </Select>
                    </div>




                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                </div>
            </div>
        </form>
    );
}
