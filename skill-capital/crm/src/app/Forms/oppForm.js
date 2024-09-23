import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';


export default function OppurtunityForm({ closeForm }) {

    // const [chance, setChance] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        cc: '91',
        contact_no: '',
        email: '',
        fee_coated: '',
        batch_timing: '',
        description: '',
       lead_status: '',
        lead_source: '',
        TechStack: '',
        Course: '',
        class_mode: '',
        nextFollowUp: '',
        oppourtunity_status: '',
        oppurtunityStage: '',
        demoAttemptedStage: '',
        visitedStage: '',
        lostOppurtunityReason: ''

    });


    // Fetching data from server json
    // const fetchChance = async () => {
    //     try {

    //         const response = await fetch('http://localhost:3002/opportunities');
    //         const data = await response.json();
    //         setChance(data);
    //     }

    //     catch (error) {
    //         console.error('Fetching oppourtunites error:', error);

    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent default form behavior
        setFormData({ name: "", contact_no: "", email: "", TechStack: "", Course: "" }); // Reset the form data
       
        closeForm(); // Close the form
        alert("Form data successfully submitted"); // Show confirmation

        try {
            const now = new Date();
            const date = now.toLocaleDateString('en-GB'); // Adjust the locale for the desired format
            // const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const datestamp = `${date}`; // Combine date and time

            // Add datestamp to formData
            const formDataWithdatestamp = { ...formData, date: datestamp };

            const response = await fetch('http://18.217.249.38:8000/api/opportunities/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithdatestamp),
            });

            if (response.ok) {
                // Fetch the updated leads list after form submission
                // fetchChance();
                alert('Form data successfully submitted');
                setFormData({
                    name: '',
                    cc: '91',
                    contact_no: '',
                    email: '',
                    fee_coated: '',
                    batch_timing: '',
                    description: '',
                   lead_status: '',
                    lead_source: '',
                    TechStack: '',
                    Course: '',
                    class_mode: '',
                    nextFollowUp: '',
                    oppourtunity_status: '',
                    oppurtunityStage: '',
                    demoAttemptedStage: '',
                    visitedStage: '',
                    lostOppurtunityReason: ''
                });
                closeForm(); // Close the form
            } else {
                alert('Failed to submit data. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            alert('An error occurred while submitting the data.');
        }

};

return (
    <form onSubmit={handleSubmit}>
        <div className="bg-white w-full max-w-2xl  max-h-[90vh] p-8 rounded-lg shadow-lg mx-auto mt-5 overscroll-contain overflow-y-auto">
            {/* Form Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-2 rounded-md">
                        <FontAwesomeIcon icon={faIdCard} className=" flex bg-blue-600 text-white justify-center items-center w-[30px] h-[20px]" />
                    </div>
                    <p className="text-lg font-bold">Create Oppourtunity</p>
                </div>
                <div>
                    <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                        <CloseIcon />
                    </button>
                </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* CC */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">CC</label>
                    <input
                        type="text"
                        name="cc"
                        value={formData.cc}
                        onChange={handleChange}
                        placeholder="91"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* contact_no */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">contact_no</label>
                    <input
                        type="number"
                        pattern='[0-9]{10}'
                        name="contact_no"
                        value={formData.contact_no}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Fee Quoted */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fee Quoted</label>
                    <input
                        type="text"
                        name="fee_coated"
                        value={formData.fee_coated}
                        onChange={handleChange}
                        placeholder="Fee Quoted"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Batch Timing */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Batch Timing</label>
                    <input
                        type="text"
                        name="batch_timing"
                        value={formData.batch_timing}
                        onChange={handleChange}
                        placeholder="Batch Timing"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>


                {/* Lead Status */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Lead Status</label>
                    <select
                        name="lead_status"
                        value={formData.lead_status}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Lead Status</option>
                        <option value="Not Contacted">Not Contacted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Warm Lead">Warm Lead</option>
                        <option value="Cold Lead">Cold Lead</option>
                    </select>
                </div>

                {/* Lead Source */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Lead Source</label>
                    <select
                        name="lead_source"
                        value={formData.lead_source}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Lead Source</option>
                        <option value="Referral">Referral</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Website">Website</option>
                    </select>
                </div>

                {/* TechStack */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">TechStack</label>
                    <select
                        name="TechStack"
                        value={formData.TechStack}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select TechStack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full TechStack">Full TechStack</option>
                    </select>
                </div>

                {/* Course */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Course</label>
                    <select
                        name="Course"
                        value={formData.Course}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Course</option>
                        <option value="React">React</option>
                        <option value="Node">Node</option>
                        <option value="Python">Python</option>
                    </select>
                </div>

                {/* Class Mode */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Class Mode</label>
                    <select
                        name="class_mode"
                        value={formData.class_mode}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Class Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Next Follow Up */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Next Follow Up</label>
                    <input
                        type="date"
                        name="nextFollowUp"
                        value={formData.nextFollowUp}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                {/* Oppurtunity Status */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Oppurtunity Status</label>
                    <select
                        name="oppourtunity_status"
                        value={formData.oppourtunity_status}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Oppurtunity Status</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Not Visited">Not Visited</option>
                        <option value="demoAttemptedStage">demoAttemptedStage</option>
                        <option value="Lost Oppourtunity">Lost Oppourtunity</option>
                    </select>
                </div>
                {/* Oppurtunity Stage */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Oppurtunity Stage</label>
                    <select
                        name="oppurtunityStage"
                        value={formData.oppurtunityStage}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Oppurtunity Stage</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Visited">Visited</option>
                        <option value="demoAttemptedStage">demoAttemptedStage</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                {/* Demo Attempted Stage */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Demo Attempted Stage</label>
                    <select
                        name="demoAttemptedStage"
                        value={formData.demoAttemptedStage}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Demo Attempted Stage</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Visited">Visited</option>
                        <option value="demoAttemptedStage">demoAttemptedStage</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                {/* Visited Stage */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Visited Stage</label>
                    <select
                        name="visitedStage"
                        value={formData.visitedStage}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Visited Stage</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Visited">Visited</option>
                        <option value="demoAttemptedStage">demoAttemptedStage</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                {/* Lost Oppurtunity Reason */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Lost Oppurtunity Reason</label>
                    <select
                        name="lostOppurtunityReason"
                        value={formData.lostOppurtunityReason}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Lost Oppurtunity Reason</option>
                        <option value="Visiting">Visiting</option>
                        <option value="Visited">Visited</option>
                        <option value="demoAttemptedStage">demoAttemptedStage</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
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

};