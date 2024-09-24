import React, { useState , useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

export default function UpdateForm({ rowData, onClose, onUpdate }) {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the updated data to the JSON server
            const leadsApiUrl = process.env.NEXT_PUBLIC_LEADS_API_URL;
            const response = await fetch(`${leadsApiUrl}${rowData.id}/`, {
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
                throw new Error(`Failed to update lead: ${response.statusText} - ${errorDetails}`);
            }
    
            const result = await response.json();
            console.log('Update successful:', result);
    
            // Call the update function to refresh the table
            onUpdate();
    
            // Close the form after successful update
            onClose();
            
        } catch (error) {
            console.error('Error updating lead:', error);
            alert('There was an issue updating the lead.');
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
                        <p className="text-lg font-bold">Update Lead</p>
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
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
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


                </div>

                {/* Add other fields as necessary */}
                <div className="flex justify-between space-x-4 mt-6">
                    <button onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                    <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Lead </button>
                </div>
            </div>
        </form>
    );

};