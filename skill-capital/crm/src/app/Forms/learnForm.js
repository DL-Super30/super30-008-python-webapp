import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';


export default function LearnForm({ closeForm, handleAddLead }) {
    const [filteredRows, setFilteredRows] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
       contact_no: '',
        email: '',
        idProof: '',
        dateOfBirth: '',
        description: '',
        registeredDate: '',
        batchId: '',
        alternatePhone: '',
        exchangeRate: '',
        source: '',
        attendedDemo: '',
        learnerOwner: '',
        learnerStage: '',
        leadCreatedTime: '',
        currency: '',
        counsellingDoneBy: '',
        registeredCourseCount: '',
        preferableTime : '',
        TechStack : '',
        batchTiming : '',
        courseComments : '',
        mode_of_class : '',
        slackAccess : '',
        Comment : '',
        lmsAccess : ''
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior

        setFilteredRows([...filteredRows, formData]);
        setFormData({
            createdOn: '',
            registeredDate: '',
            lastName: '',
           contact_no: '',
            email: '',
            mode_of_class: '',
            TechStack: '',
            totalFee: '',
            feePaid: '',
            dueAmount: '',
            dueDate: '',
          });
        handleAddLead(formData);
        closeForm(); // Close the form
        alert("Form data successfully submitted"); // Show confirmation
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
                        <label className="text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/*contact_no */}
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

                    {/* Id Proof */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Id Proof</label>
                        <input
                            type="text"
                            name="idProof"
                            value={formData.idProof}
                            onChange={handleChange}
                            placeholder="Id Proof"
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Date of Birth*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Registered Date*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Registered Date</label>
                        <input
                            type="date"
                            name="registeredDate"
                            value={formData.registeredDate}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Batch ID's*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Batch ID's</label>
                        <input
                            type="text"
                            name="batchId"
                            value={formData.batchId}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Alternatecontact_no*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Alternatecontact_no</label>
                        <input
                            type="text"
                            name="alternatePhone"
                            value={formData.alternatePhone}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Exchange Rate*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Exchange Rate</label>
                        <input
                            type="text"
                            name="exchangeRate"
                            value={formData.exchangeRate}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Source*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Source</label>
                        <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>


                    {/* Attended Demo */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Attended Demo</label>
                        <select
                            name="attendedDemo"
                            value={formData.attendedDemo}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled> Select Attended Demo</option>
                            <option value="Referral">Bangloore</option>
                            <option value="Advertisement">Hyderbad</option>
                            <option value="Website">pune</option>
                        </select>
                    </div>

                    {/* Learner Owner*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Owner</label>
                        <input
                            type="text"
                            name="learnerOwner"
                            value={formData.learnerOwner}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Learner Stage */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Learner Stage</label>
                        <select
                            name="learnerStage"
                            value={formData.learnerStage}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select Learner Stage</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Full Stack">Full Stack</option>
                        </select>
                    </div>

                    {/* Currency*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium"> Currency</label>
                        <input
                            type="text"
                            name=" currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Lead Created Time*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Lead Created Time</label>
                        <input
                            type="date"
                            name=" leadCreatedTime"
                            value={formData.leadCreatedTime}
                            onChange={handleChange}
                            className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Counselling Done By*/}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium">Counselling Done By</label>
                        <input
                            type="number"
                            name="counsellingDoneBy"
                            value={formData.counsellingDoneBy}
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

                    <p className='py-4 text-lg font-bold'>Course Details</p><br/>

                        {/* Registered Courses Count */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Registered Courses Count</label>
                            <input
                                type="number"
                                name="registeredCourseCount"
                                value={formData.registeredCourseCount}
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
                                name="preferableTime"
                                value={formData.preferableTime}
                                onChange={handleChange}
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Tech Stack</label>
                            <input
                                type="text"
                                name="TechStack"
                                value={formData.TechStack}
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
                                name="batchTiming"
                                value={formData.batchTiming}
                                onChange={handleChange}
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Course Comments */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Course Comments</label>
                            <input
                                type="text"
                                name="courseComments"
                                value={formData.courseComments}
                                onChange={handleChange}
                                placeholder="Course Comments"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        {/* Mode Of Class*/}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Mode Of Class</label>
                            <input
                                type="text"
                                name="mode_of_class"
                                value={formData.mode_of_class}
                                onChange={handleChange}
                                placeholder="Mode Of Class"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        {/* Slack Access */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Slack Access</label>
                            <input
                                type="text"
                                name="slackAccess"
                                value={formData.slackAccess}
                                onChange={handleChange}
                                placeholder="Slack Access"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
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
                            <input
                                type="text"
                                name="lmsAccess"
                                value={formData.lmsAccess}
                                onChange={handleChange}
                                placeholder="LMS Access"
                                className="border border-gray-300 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
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
