import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function LeadForm({ closeForm,  initialData }) {
    const [formData, setFormData] = useState( initialData || {
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
        date: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
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
        // handleCreateLead(formData);
        
        // Prepare the data with a datestamp in yyyy-mm-dd format with time
        // Extract only the date part (YYYY-MM-DD) from the datetime-local input
    const dateOnly = formData.date;  // Get the 'YYYY-MM-DD' part
    
    // Prepare the data to be sent, ensuring the date is in the correct format
    const formDataWithDateOnly = { ...formData, date: dateOnly };

        try {
            const leadsApiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${leadsApiUrl}/leads/`, {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithDateOnly),
            });

            if (response.ok) {
                AlertMessage("Lead Created Sucessfully", "success");
                // Clear the form data
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
                    date: ''
                });
                closeForm();
               
            } else {
                AlertMessage("Failed to Create Lead Please Try again!", "error");
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            AlertMessage('An error occurred while submitting the data.','error');
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
                        <p className="text-lg font-bold">{initialData ? 'Update Lead' : 'Create Lead'}</p>
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
                            type="text"
                            name="cc"
                            value={formData.cc}
                            onChange={handleChange}
                            placeholder="91"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            disabled
                        />
                    </div>

                    {/* contact_no */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Contact no</label>
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
                        <label className="text-sm font-medium">Fee coated</label>
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
                        <label className="text-sm font-medium">Batch timing</label>
                        <select
                            type="text"
                            name="batch_timing"
                            value={formData.batch_timing}
                            onChange={handleChange}
                            placeholder="Batch Timing"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" >Choose batch timing</option>
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
                        <label className="text-sm font-medium">Lead status</label>
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
                        <label className="text-sm font-medium">Lead source</label>
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
                        <label className="text-sm font-medium">Class mode</label>
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
                    <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md"> {initialData ? 'Update Lead' : 'Create Lead'}</button>
                </div>
            </div>
        </form>
    );
}
