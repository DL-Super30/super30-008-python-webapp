import React, { useState , useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function OppUpdateForm({ rowData, onClose, onUpdate }) {

    const [isFormVisible , setIsFormVisible]=useState(false);

    const [formData, setFormData] = useState(rowData);


    useEffect(() => {
        setFormData(rowData);
      }, [rowData]);

    const closeForm=()=>{
        setIsFormVisible(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

        const OpportunityApiUrl= process.env.NEXT_PUBLIC_API_URL;
        try {
            // Send the updated data to the JSON server
            const response = await axios.put(`${OpportunityApiUrl}/opportunities/${rowData.id}/`, formData ,
                {

                headers: {
                    'Content-Type': 'application/json'}
            });
    
            if (response.status!==200) {
                // Handle server errors
                const errorDetails = await response.text();  // Get the error details
                throw new Error(`Failed to update Opportunity: ${response.statusText}- ${errorDetails}`);
            }
    

            AlertMessage("Opportunity Updated Successfully.", 'success');
    
            // Call the update function to refresh the table
            onUpdate();
    
            // Close the form after successful update
            onClose();
            
        } catch (error) {
            console.error('Error updating Opportunity:', error);
            AlertMessage ('There was an issue updating the Opportunity.', 'error');
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
                        <p className="text-lg font-bold">Update Opportunity</p>
                        <span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        </span>
                    </div>
                    <div>
                        <button className="text-gray-600 hover:text-gray-900" onClick={closeForm}>
                            <CloseIcon  />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* First Name */}
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


                    {/* Opportunity Status */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Opportunity status</label>
                        <select
                            name="opportunity_status"
                            value={formData.opportunity_status}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Opportunity Status</option>
                            <option value="Visiting">Visiting</option>
                            <option value="Visited">Visited</option>
                            <option value="Demo Attended">Demo Attended</option>
                            <option value="Lost Opportunity">Lost Opportunity</option>
                        </select>
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


                </div>

                {/* Add other fields as necessary */}
                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Opportunity </button>
                </div>
            </div>
        </form>
    );

};