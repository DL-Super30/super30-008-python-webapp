import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function OpportunityForm({ closeForm }) {

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
        opportunity_status: '',
        opportunity_stage: '',
        demoattended_stage: '',
        visited_stage: '',
        lostopportunity_reason: '',
        date: '',

    });


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        e.preventDefault(); // Prevent default form behavior
        setFormData({ name: "", contact_no: "", email: "", TechStack: "", Course: "" }); // Reset the form data

        // closeForm(); // Close the form
        // alert("Form data successfully submitted"); // Show confirmation

        try {
            const now = new Date();
            const date = now.toLocaleDateString('en-GB'); // Adjust the locale for the desired format
            // const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const datestamp = `${date}`; // Combine date and time

            // Add datestamp to formData
            const formDataWithdatestamp = { ...formData, date: datestamp };

            const opportunityApiUrl = process.env.NEXT_PUBLIC_API_URL;

            const response = await axios.post(`${opportunityApiUrl}/opportunities/`, formDataWithdatestamp ,
                {
                headers: { 'Content-Type': 'application/json'}
                    
              
            },);

            if (response.status >= 200 && response.status < 300) {
                // Fetch the updated leads list after form submission
                // fetchChance();
               
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
                    opportunity_status: '',
                    opportunity_stage: '',
                    demoattended_stage: '',
                    visited_stage: '',
                    lostopportunity_reason: '',
                    date: '',
                });
                AlertMessage('Opportunity created Successfully', 'success');
                closeForm(); // Close the form
            } else {
                AlertMessage('Failed to submit data. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            AlertMessage('An error occurred while submitting the data.' , 'error');
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
                        <label className="text-sm font-medium">Cc</label>
                        <input
                            disabled
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
                        <select

                            name="batch_timing"
                            value={formData.batch_timing}
                            onChange={handleChange}
                            placeholder="Batch Timing"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Batch Timing</option>
                            <option value="7AM-8AM">7AM-8AM</option>
                            <option value="8AM-9AM" >8AM-9AM</option>
                            <option value="9AM-10AM" >9AM-10AM</option>
                            <option value="10AM-11AM" >10AM-11AM</option>
                            <option value="11AM-12PM" >11AM-12PM</option>
                            <option value="12PM-1PM" >12PM-1PM</option>
                            <option value="1PM-2PM" >1PM-2PM</option>
                            <option value="2PM-3PM" >2PM-3PM</option>
                            <option value="3PM-4PM" >3PM-4PM</option>
                            <option value="4PM-5PM" >4PM-5PM</option>
                            <option value="5PM-6PM" >5PM-6PM</option>
                            <option value="6PM-7PM" >6PM-7PM</option>
                            <option value="7PM-8PM" >7PM-8PM</option>
                            <option value="8PM-9PM" >8PM-9PM</option>

                        </select>
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
                            <option value="Attempted">Attempted</option>
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
                            <option value="None">None</option>
                            <option value="Walk In">Walk In</option>
                            <option value="Web Site">Web Site</option>
                            <option value="Demo">Demo</option>
                            <option value="Student Referral">Student Referral</option>
                            <option value="Inbound Call">Inbound Call</option>
                            <option value="Google Ad Words">Google Ad Words</option>
                            <option value="Web Site Chat">Web Site Chat</option>
                            <option value="Facebook Ads">Facebook Ads</option> 
                            <option value="Google My Business">Google My Business</option> 
                            <option value="WhatsApp Skill Capital">WhatsApp Skill Capital</option>
                         
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
                            <option value="Life Skills">Life Skills</option>
                            <option value="Study Abroad">Study Abroad</option>
                            <option value="HR">HR</option>
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
                            <option value="HR Business Partner">HR Business Partner</option>
                            <option value="HR Generalist Core HR">HR Generalist Core HR</option>
                            <option value="HR Analytics">HR Analytics</option>
                            <option value="Spoken English">Spoken English</option>
                            <option value="Public Speaking">Public Speaking</option>
                            <option value="Communication Skills">Communication Skills</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Personality Development">Personality Development</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="IELTS">IELTS</option>
                            <option value="GRE">GRE</option>
                            <option value="PTE">PTE</option>
                            <option value="GMAT">GMAT</option>
                            <option value="TOEFL">TOEFL</option>
                            <option value="Recruitment Specialist">Recruitment Specialist</option>
                            <option value="Payroll Specialist">Payroll Specialist</option>
                            <option value="Learning and Development">Learning and Development</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Finance">Finance</option>
                            <option value="Competitive Exams">Competitive Exams</option>
                            <option value="Others">Others</option>
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
                            <option value="International Online">International Online</option>
                            <option value="India Online">India Online</option>
                            <option value="BLR Classroom">BLR Classroom</option>
                            <option value="HYD Classroom">HYD Classroom</option>
                        </select>
                    </div>

                    {/* Next Follow Up */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    {/* opportunity Status */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">opportunity Status</label>
                        <select
                            name="opportunity_status"
                            value={formData.opportunity_status}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select opportunity Status</option>
                            <option value="Visiting">Visiting</option>
                            <option value="Visited">Visited</option>
                            <option value="Demo Attended">Demo Attended</option>
                            <option value="Lost Opportunity">Lost Opportunity</option>
                        </select>
                    </div>
                    {/* opportunity Stage */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">opportunity Stage</label>
                        <select
                            name="opportunity_stage"
                            value={formData.opportunity_stage}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select opportunity Stage</option>
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
                            <option value="Busy Asked A Call Back">Busy Asked A Call Back</option>
                            <option value="Closed Own Register">Closed Own Register</option>
                            <option value="Closed Lost">Closed Lost</option>
                            <option value="Special Requirements">Special Requirements</option>
    
                        </select>
                    </div>
                    {/* Demo Attempted Stage */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Demo Attempted Stage</label>
                        <select
                            name="demoattended_stage"
                            value={formData.demoattended_stage}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Demo Attempted Stage</option>
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
                            <option value="Busy Asked A Call Back">Busy Asked A Call Back</option>
                            <option value="Closed Own Register">Closed Own Register</option>
                            <option value="Closed Lost Cold Lead">Closed Lost Cold Lead</option>
                            <option value="Special Requirements">Special Requirements</option>
    
                        </select>
                    </div>
                    {/* Visited Stage */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Visited Stage</label>
                        <select
                            name="visited_stage"
                            value={formData.visited_stage}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Visited Stage</option>
                            <option value="None">None</option>
                            <option value="Ready To Join">Ready To Join</option>
                            <option value="Call Not Answered">Call Not Answered</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                            <option value="Interested Demo">Interested Demo</option>
                            <option value="Fees Negotiation">Fees Negotiation</option>
                            <option value="Batch Allocation">Batch Allocation</option>
                            <option value="Closed Own Register">Closed Own Register</option>
                            <option value="Closed Lost Cold Lead">Closed Lost Cold Lead</option>
                            <option value="Special Requirements">Special Requirements</option>
                        </select>
                    </div>
                    {/* Lost opportunity Reason */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Lost opportunity Reason</label>
                        <select
                            name="lostopportunity_reason"
                            value={formData.lostopportunity_reason}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Lost opportunity Reason</option>
                            <option value="None">None</option>
                            <option value="Invalid Number">Invalid Number</option>
                            <option value="Not Interested">Not Interested</option>
                            <option value="Joined Other Institute">Joined Other Institute</option>
                            <option value="Asking Free Course">Asking Free Course</option>
                            <option value="Pay After Placement">Pay After Placement</option>
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