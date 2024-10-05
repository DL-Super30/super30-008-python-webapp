'use client';

import { useState } from 'react';
import axios from 'axios';
import { faIdCard, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateOpportunity({setShowCreateOpportunity}) {
    const [formData, setFormData] = useState({
        Name: '',
        CC: 91,
        Contact_No: '',
        Email: '',
        Fee_Coated: '',
        Description: '',
        Date: '',
        Batch_Timing: '',
        Lead_Status: '',
        Lead_Source: '',
        Tech_Stack: '',
        Course: '',
        Class_Mode: '',
        Opportunity_Status: '',
        Opportunity_Stage: '',
        Demoattended_Stage: '',
        Visited_Stage: '',
        Lost_Opportunity_Reason: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('http://crm.rajeshcrm.xyz:8000/api/opportunities/', formData);
            console.log('Opportunity created:', response.data);
            alert('Opportunity created successfully!');
            setFormData({
                Name: '',
                CC: 91,
                Contact_No: '',
                Email: '',
                Fee_Coated: '',
                Description: '',
                Date: '',
                Batch_Timing: '',
                Lead_Status: '',
                Lead_Source: '',
                Tech_Stack: '',
                Course: '',
                Class_Mode: '',
                Opportunity_Status: '',
                Opportunity_Stage: '',
                Demoattended_Stage: '',
                Visited_Stage: '',
                Lost_Opportunity_Reason: ''
            });
        } catch (error) {
            console.error('Error creating opportunity:', error);
            if (error.response && error.response.data) {
                setError(JSON.stringify(error.response.data));
            } else {
                setError('Failed to create opportunity. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
        const handleCancel = () => {
        // Clear the form data if needed
        setFormData({
            Name: '',
            CC: 91,
            Contact_No: '',
            Email: '',
            Fee_Coated: '',
            Description: '',
            Date: '',
            Batch_Timing: '',
            Lead_Status: '',
            Lead_Source: '',
            Tech_Stack: '',
            Course: '',
            Class_Mode: '',
            Opportunity_Status: '',
            Opportunity_Stage: '',
            Demoattended_Stage: '',
            Visited_Stage: '',
            Lost_Opportunity_Reason: ''
        });
        setShowCreateOpportunity(false);
    };
    };

    return (
        <div className=' w-full h-[100vh]  absolute top-0 left-0  bg-black bg-opacity-50 flex items-center justify-center p-4 '>
        <div className="w-full max-w-4xl  bg-white shadow-lg rounded-lg overflow-hidden ">
            <div className='h-[600px] overflow-y-auto'>
            <div className="px-4 sm:px-6 py-4">
                <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4 mb-6">
                    <FontAwesomeIcon icon={faIdCard} className="text-blue-500 text-3xl" />
                    <h2 className="text-2xl font-bold text-gray-800">CREATE OPPORTUNITY</h2>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Status</label>
                        <select name="Opportunity_Status" value={formData.Opportunity_Status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Opportunity Status</option>
                            <option value="Visited">Visited</option>
                            <option value="Visiting">Visiting</option>
                            <option value="Demo Attended">Demo Attended</option>
                            <option value="Lost Opportunity">Lost Opportunity</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CC</label>
                        <input type="number" name="CC" value={formData.CC} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Stage</label>
                        <select name="Opportunity_Stage" value={formData.Opportunity_Stage} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Opportunity Stage</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" name="Contact_No" value={formData.Contact_No} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Demo Attended Stage</label>
                        <select name="Demoattended_Stage" value={formData.Demoattended_Stage} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Demo Attended Stage</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Visited Stage</label>
                        <select name="Visited_Stage" value={formData.Visited_Stage} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Visited Stage</option>
                            <option value="Need Time This Week">Need Time This Week</option>
                            <option value="Need Time Next Week">Need Time Next Week</option>
                            <option value="Need Time This Month">Need Time This Month</option>
                            <option value="Need Time Next Month">Need Time Next Month</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fee Quoted</label>
                        <input type="number" name="Fee_Coated" value={formData.Fee_Coated} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lost Opportunity Reason</label>
                        <select name="Lost_Opportunity_Reason" value={formData.Lost_Opportunity_Reason} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Lost Opportunity Reason</option>
                            <option value="Not Interested">Not Interested</option>
                            <option value="Invalid Number">Invalid Number</option>
                            <option value="Joined Another Institute">Joined Another Institute</option>
                            <option value="Asking Free Course">Asking Free Course</option>
                            <option value="Pay After Placement">Pay After Placement</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Batch Timing</label>
                        <select name="Batch_Timing" value={formData.Batch_Timing} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Batch Timing</option>
                            <option value="7AM-8AM">7AM - 8AM</option>
                            <option value="8AM-9AM">8AM - 9AM</option>
                            <option value="9AM-10AM">9AM - 10AM</option>
                            <option value="10AM-11AM">10AM - 11AM</option>
                            <option value="11AM-12PM">11AM - 12PM</option>
                            <option value="12PM-1PM">12PM - 1PM</option>
                            <option value="1PM-2PM">1PM - 2PM</option>
                            <option value="2PM-3PM">2PM - 3PM</option>
                            <option value="3PM-4PM">3PM - 4PM</option>
                            <option value="4PM-5PM">4PM - 5PM</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Next Follow Up</label>
                        <input type="date" name="Date" value={formData.Date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Status</label>
                        <select name="Lead_Status" value={formData.Lead_Status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Lead Status</option>
                            <option value="Not Contacted">Not Contacted</option>
                            <option value="Attempted">Attempted</option>
                            <option value="Cold Lead">Cold Lead</option>
                            <option value="Warm Lead">Warm Lead</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
                        <select name="Lead_Source" value={formData.Lead_Source} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Lead Source</option>
                            <option value="Google Ad Words">Google AdWords</option>
                            <option value="Walk In">Walk In</option>
                            <option value="Student Referral">Student Referral</option>
                            <option value="Demo">Demo</option>
                            <option value="Web site">Web site</option>
                            <option value="Web site Chat">Web site Chat</option>
                            <option value="Inbound Call">Inbound Call</option>
                            <option value="Facebook Ads">Facebook Ads</option>
                            <option value="Google My Business">Google My Business</option>
                            <option value="WhatsApp Skill Capital">WhatsApp Skill Capital</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                        <select name="Tech_Stack" value={formData.Tech_Stack} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Tech Stack</option>
                            <option value="HR">HR</option>
                            <option value="Life Skills">Life Skills</option>
                            <option value="Study Abroad">Study Abroad</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <select name="Course" value={formData.Course} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Course</option>
                            <option value="HR Business Partner">HR Business Partner</option>
                            <option value="HR Analytics">HR Analytics</option>
                            <option value="Spoken English">Spoken English</option>
                            <option value="Public Speaking">Public Speaking</option>
                            <option value="Communication Skills">Communication Skills</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Personality Development">Personality Development</option>
                            <option value="IELTS">IELTS</option>
                            <option value="TOEFL">TOEFL</option>
                            <option value="PTE">PTE</option>
                            <option value="GRE">GRE</option>
                            <option value="GMAT">GMAT</option>
                            <option value="Recruitment Specialist">Recruitment Specialist</option>
                            <option value="Payroll Specialist">Payroll Specialist</option>
                            <option value="Learning and Development">Learning and Development</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Class Mode</label>
                        <select name="Class_Mode" value={formData.Class_Mode} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            <option value="">Select Class Mode</option>
                            <option value="India Online">India Online</option>
                            <option value="International Online">International Online</option>
                            <option value="HYD Classroom">HYD Classroom</option>
                            <option value="BLR Classroom">BLR Classroom</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="Description" value={formData.Description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                    </div>
                </form>
                <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
                    <button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        {isLoading ? 'Creating...' : 'CREATE'}
                    </button>
                    <button onClick={() => setShowCreateOpportunity(false)} className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    CANCEL
                </button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
            </div>
        </div>
        </div>
    );
}