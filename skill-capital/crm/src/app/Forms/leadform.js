import React, { useState , useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';


export default function LeadForm({ closeForm,handleAddLead ,initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        cc: '91',
        phone: '',
        email: '',
        feeQuoted: '',
        batchTiming: '',
        description: '',
        leadStatus: '',
        leadSource: '',
        stack: '',
        course: '',
        classMode: '',
        nextFollowUp: ''
    });




   
    const [leads, setLeads] = useState([]);



    useEffect(() => {
        if (initialData) {
          setFormData(initialData);
        }
      }, [initialData]);
    

    // Fetch data from json-server when the component mounts
    useEffect(() => {
      fetchLeads();
    }, []);
  
    // Function to fetch leads from json-server
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:3000/Leads');
        const data = await response.json();
        setLeads(data); // Set the leads state with the fetched data
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  


    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form behavior
      handleAddLead(formData);
    closeForm();

      try {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB'); // Adjust the locale for the desired format
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timestamp = `${date} ${time}`; // Combine date and time
        
        // Add timestamp to formData
        const formDataWithTimestamp = { ...formData, createdOn: timestamp };

        const response = await fetch('http://localhost:3000/Leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( formDataWithTimestamp),
        });
  
        if (response.ok) {
          // Fetch the updated leads list after form submission
          fetchLeads();
          alert('Form data successfully submitted');
          setFormData({
            name: '',
            cc: '91',
            phone: '',
            email: '',
            feeQuoted: '',
            batchTiming: '',
            description: '',
            leadStatus: '',
            leadSource: '',
            stack: '',
            course: '',
            classMode: '',
            nextFollowUp: ''
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
        <form  onSubmit={handleSubmit}>
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
                        <CloseIcon  />
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

                {/* Phone */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Phone</label>
                    <input
                        type="number"
                        pattern='[0-9]{10}'
                        name="phone"
                        value={formData.phone}
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
                        name="feeQuoted"
                        value={formData.feeQuoted}
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
                        name="batchTiming"
                        value={formData.batchTiming}
                        onChange={handleChange}
                        placeholder="Batch Timing"
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>


                {/* Lead Status */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Lead Status</label>
                    <select
                        name="leadStatus"
                        value={formData.leadStatus}
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
                        name="leadSource"
                        value={formData.leadSource}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Lead Source</option>
                        <option value="Referral">Referral</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Website">Website</option>
                    </select>
                </div>

                {/* Stack */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Stack</label>
                    <select
                        name="stack"
                        value={formData.stack}
                        onChange={handleChange}
                        className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="" disabled>Select Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full Stack">Full Stack</option>
                    </select>
                </div>

                {/* Course */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Course</label>
                    <select
                        name="course"
                        value={formData.course}
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
                        name="classMode"
                        value={formData.classMode}
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
                <button  onClick={closeForm} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
                <button  type='submit' className="px-4 py-2 bg-blue-600 text-white rounded-md"> {initialData ? 'Update Lead' : 'Create Lead'}</button>
            </div>
        </div>
        </form>
    );
}
