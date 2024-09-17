import { useState } from "react";
import axios from "axios";

export default function LeadForm({ onClose }) {
  const [formData, setFormData] = useState({
    id: "", // will be generated on submit
    date: "", // will be set on submit
    name: "",
    phone: "",
    email: "",
    status: "Not Contacted", // was leadStatus
    course: "",
    source: "",
    stack: "",
    fee: "", // was feeQuoted
    classMode: "",
    batchTimings: "", // new
    nextFollowUp: "", // new
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
    // Add more validations as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate unique ID and current date
    const id = Date.now().toString();
    const currentDate = new Date().toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY

    const updatedFormData = { ...formData, id, date: currentDate.replace(/\//g, '-') };

    console.log("Submitting form data:", updatedFormData);


    try {
      const response = await axios.post("http://localhost:3000/leads", updatedFormData);
      console.log("Server response:", response);
      if (response.status === 201) {
        setSuccessMessage("Lead created successfully!"); // Set success message
        setTimeout(() => {
          setSuccessMessage(""); // Clear message after 3 seconds
          onClose(); // Close form after success message
        }, 3000);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
      alert(`There was an error submitting the form: ${errorMessage}`);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[100vh] flex flex-col">
        <div className="flex gap-4 items-center justify-between p-4 md:p-5 border-b rounded-t">
          <image alt="header image" width="44" height="44" class="w-10 h-9" src="https://crm.skillcapital.ai/_next/static/media/employee_contact.2d215fd6.svg" />
          <h2 className="text-2xl font-semibold">Create Lead</h2>
          <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
            </svg><span class="sr-only">Close modal</span>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          {/* Display success message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Form Inputs */}
            <div className="flex flex-col">
              <label className="font-medium text-base">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Phone"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Fee Quoted</label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Fee Quoted"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Batch Timings</label>
              <select
                name="batchTimings"
                value={formData.batchTimings}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="selected">Select</option>
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
              <label className="font-medium text-base">Lead Status</label>
              <select
                name="status"
                value={formData.status}
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
              <label className="font-medium text-base">Lead Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="selected">Select Lead Source</option>
                <option value="None">None</option>
                <option value="Attempted">Walk In</option>
                <option value="Student Refferral">Student Refferral</option>
                <option value="Demo">Demo</option>
                <option value="Website">Website</option>
                <option value="Website Chat">Website Chat</option>
                <option value="Inbound Call">Inbound Call</option>
                <option value="Google AdWords">Google AdWords</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Google My Business">Google My Business</option>
                <option value="Whatsapp-Skill Captial">Whatsapp-Skill Captial</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Stack</label>
              <select
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="selected">Select Stack</option>
                <option value="Life Skills">Life Skills</option>
                <option value="Study Abroad">Study Abroad</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="selected">Select course</option>
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
                <option value="TOEFLl">TOEFL</option>
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
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Class Mode</label>
              <select
                name="classMode"
                value={formData.classMode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="selected">Select Class Mode</option>
                <option value="International Online">International Online</option>
                <option value="India Online">India Online</option>
                <option value="BLR ClassRoom">BLR ClassRoom</option>
                <option value="HYD ClassRoom">HYD ClassRoom</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-base">Next Follow-Up</label>
              <input
                type="date"
                name="nextFollowUp"
                value={formData.nextFollowUp}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="font-medium text-base">Description</label>
              <textarea
                name="description"
                value={formData.description}
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
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
