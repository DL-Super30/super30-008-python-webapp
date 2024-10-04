import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = ({ onClose, addLead }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Contact_No: '',
    CC: '91',
    Email: '',
    Lead_Status: 'Not Contacted',
    Course: '',
    Lead_Source: '',
    Tech_Stack: '',
    Fee_Quoted: 0,
    Class_Mode: '',
    Batch_Timing: '',
    Description: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = 'Name is required.';
    if (!formData.Contact_No) newErrors.Contact_No = 'Phone number is required.';
    if (!formData.Email) newErrors.Email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.Email)) newErrors.Email = 'Email is invalid.';
    if (!formData.Course) newErrors.Course = 'Course is required.';
    if (!formData.Tech_Stack) newErrors.Tech_Stack = 'Tech Stack is required.';
    if (!formData.Class_Mode) newErrors.Class_Mode = 'Class Mode is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'Fee_Quoted' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSend = {
      ...formData,
      Contact_No: parseInt(formData.Contact_No, 10),
      CC: parseInt(formData.CC, 10),
    };

    setLoading(true);

    try {
      const response = await axios.post('http://18.224.180.46:8000/api/leads/', dataToSend);
      if (response.status === 201) {
        addLead(response.data);
        setSuccessMessage('Lead created successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      } else {
        alert('Unexpected server response. Please try again.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred.';
      alert(`Error submitting the form: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
        <div className="flex gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t">
          <img alt="header image" width="44" height="44" className="w-10 h-9" src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg" />
          <h2 className="text-2xl font-semibold">Create Lead</h2>
          <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="Name" className="font-medium text-base">Name</label>
              <input
                id="Name"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Contact_No" className="font-medium text-base">Phone</label>
              <input
                id="Contact_No"
                type="text"
                name="Contact_No"
                value={formData.Contact_No}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Phone"
                maxLength={10}
              />
              {errors.Contact_No && <p className="text-red-500 text-sm">{errors.Contact_No}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Email" className="font-medium text-base">Email</label>
              <input
                id="Email"
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Fee_Quoted" className="font-medium text-base">Fee Quoted</label>
              <input
                id="Fee_Quoted"
                type="text"
                name="Fee_Quoted"
                value={formData.Fee_Quoted}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Fee Quoted"
              />
              {errors.Fee_Quoted && <p className="text-red-500 text-sm">{errors.Fee_Quoted}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Batch_Timing" className="font-medium text-base">Batch Timings</label>
              <select
                id="Batch_Timing"
                name="Batch_Timing"
                value={formData.Batch_Timing}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Please select</option>
                <option value="7AM-8AM">7AM-8AM</option>
                <option value="8AM-9AM">8AM-9AM</option>
                <option value="9AM-10AM">9AM-10AM</option>
                <option value="10AM-11AM">10AM-11AM</option>
                <option value="11AM-12PM">11AM-12PM</option>
                <option value="12PM-1PM">12PM-1PM</option>
                <option value="1PM-2PM">1PM-2PM</option>
                <option value="2PM-3PM">2PM-3PM</option>
                <option value="3PM-4PM">3PM-4PM</option>
                <option value="4PM-5PM">4PM-5PM</option>
                <option value="5PM-6PM">5PM-6PM</option>
                <option value="6PM-7PM">6PM-7PM</option>
                <option value="7PM-8PM">7PM-8PM</option>
                <option value="8PM-9PM">8PM-9PM</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Lead_Status" className="font-medium text-base">Lead Status</label>
              <select
                id="Lead_Status"
                name="Lead_Status"
                value={formData.Lead_Status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Not Contacted">Not Contacted</option>
                <option value="Attempted">Attempted</option>
                <option value="Warm Lead">Warm Lead</option>
                <option value="Cold Lead">Cold Lead</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Lead_Source" className="font-medium text-base">Lead Source</label>
              <select
                id="Lead_Source"
                name="Lead_Source"
                value={formData.Lead_Source}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Lead Source</option>
                <option value="None">None</option>
                <option value="Walk In">Walk In</option>
                <option value="Student Referral">Student Referral</option>
                <option value="Demo">Demo</option>
                <option value="Website">Website</option>
                <option value="Website Chat">Website Chat</option>
                <option value="Inbound Call">Inbound Call</option>
                <option value="Google AdWords">Google AdWords</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Google My Business">Google My Business</option>
                <option value="Whatsapp Skill Capital">Whatsapp-Skill Capital</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Tech_Stack" className="font-medium text-base">Tech Stack</label>
              <select
                id="Tech_Stack"
                name="Tech_Stack"
                value={formData.Tech_Stack}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Stack</option>
                <option value="Life Skills">Life Skills</option>
                <option value="Study Abroad">Study Abroad</option>
                <option value="HR">HR</option>
              </select>
              {errors.Tech_Stack && <p className="text-red-500 text-sm">{errors.Tech_Stack}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Course" className="font-medium text-base">Course</label>
              <select
                id="Course"
                name="Course"
                value={formData.Course}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select course</option>
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
                <option value="TOEFL">TOEFL</option>
                <option value="PTE">PTE</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="Recruitment Specialist">Recruitment Specialist</option>
                <option value="Payroll Specialist">Payroll Specialist</option>
                <option value="Learning and Development">Learning and Development</option>
                <option value="Finance">Finance</option>
                <option value="Competitive Exams">Competitive Exams</option>
                <option value="HR Manager">HR Manager</option>
              </select>
              {errors.Course && <p className="text-red-500 text-sm">{errors.Course}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="Class_Mode" className="font-medium text-base">Class Mode</label>
              <select
                id="Class_Mode"
                name="Class_Mode"
                value={formData.Class_Mode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Class Mode</option>
                <option value="International Online">International Online</option>
                <option value="India Online">India Online</option>
                <option value="BLR ClassRoom">BLR ClassRoom</option>
                <option value="HYD ClassRoom">HYD ClassRoom</option>
              </select>
              {errors.Class_Mode && <p className="text-red-500 text-sm">{errors.Class_Mode}</p>}
            </div>

            <div className="col-span-2">
              <label htmlFor="Description" className="font-medium text-base">Description</label>
              <textarea
                id="Description"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;