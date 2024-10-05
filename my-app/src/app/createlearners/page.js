"use client"

import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIdCard, faPaperPlane, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function CreateLearner({ onClose }) {
    const [formData, setFormData] = useState({
        First_Name: '',
        Last_Name: '',
        Id_Proof: '',
        Contact_No: '',
        Dob: '',
        Email: '',
        Registered_date: '',
        Location: '',
        Batch_ids: '',
        Alternate_phone: '',
        Exchange_rate: '',
        Attended_demo: '',
        Learner_owner: '',
        Learner_stage: '',
        Currency: '',
        Lead_created_time: '',
        Counselling_done_by: '',
        Registered_course: '',
        Preferable_Time: '',
        Tech_Stack: '',
        Batch_Timing: '',
        Course_Comments: '',
        class_mode: '',
        Slack_Access: '',
        Comment: '',
        Lms_Access: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://crm.rajeshcrm.xyz:8000/api/learners/', formData)
            console.log('Learner created successfully:', response.data)
            alert('Learner created successfully!')
            onClose()
        } catch (error) {
            console.error('Error creating learner:', error)
            setError('Failed to create learner. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const formFields = [
        { label: "First Name", name: "First_Name", type: "text", value: formData.First_Name, onChange: handleChange },
        { label: "Last Name", name: "Last_Name", type: "text", value: formData.Last_Name, onChange: handleChange },
        { label: "Id Proof", name: "Id_Proof", type: "text", value: formData.Id_Proof, onChange: handleChange },
        { label: "Phone", name: "Phone", type: "number", value: formData.Phone, onChange: handleChange },
        { label: "Date_OF_Birth", name: "Date_OF_Birth", type: "date", value: formData.Date_OF_Birth, onChange: handleChange },
        { label: "Email", name: "Email", type: "email", value: formData.Email, onChange: handleChange },
        { label: "Registered Date", name: "Registered_Date", type: "date", value: formData.Registered_Date, onChange: handleChange },
        { label: "Location", name: "Location", type: "select", options: ["None", "Advanced Discussion", "Ready To Join", "Visiting", "Fees Negotiation", "Batch Allocation", "Interested in demo", "Need Time This Week", "Need Time Next Week", "Need Time This Month", "Need Time Next Month", "Special Requirements"], value: formData.Location, onChange: handleChange },
        { label: "Batch Id's", name: "Batch_Id", type: "number", value: formData.Batch_Id, onChange: handleChange },
        { label: "Alternate Phone No", name: "Alternate_Phone", type: "number", value: formData.Alternate_Phone, onChange: handleChange },
        { label: "Description", name: "Description", type: "paragraph", value: formData.Description, onChange: handleChange },
        { label: "Exchange Rate", name: "Exchange_Rate", type: "text", value: formData.Exchange_Rate, onChange: handleChange },
        { label: "Source", name: "Source", type: "text", value: formData.Source, onChange: handleChange },
        { label: "Attended Demo", name: "Attended_Demo", type: "select", options: ["None", "Advanced Discussion", "Ready To Join", "Visiting", "Fees Negotiation", "Batch Allocation", "Interested in demo", "Need Time This Week", "Need Time Next Week", "Need Time This Month", "Need Time Next Month"," Closed Lost Cold Lead",  "Special Requirements"], value: formData.Attended_Demo, onChange: handleChange },
        { label: "Learner Owner", name: "Learner_Owner", type: "number", value: formData.Learner_Owner, onChange: handleChange },
        { label: "Learner Stage", name: "Learner_Stage", type: "select", options: ["Call Not Answered", "Ready To Join", "Fee Negotation", "Batch Allocation", "Need Time This Week", "Need Time Next Week" ,"Need Time This Month","Need Time Next Month" ,"Special Requirements","Closed Own Regisiter"], value: formData.Learner_Stage, onChange: handleChange },
        { label: "Currency", name: "Currency", type: "text", value: formData.Currency, onChange: handleChange },
        { label: "Lead Created Time", name: "Lead_Created_Time", type: "date", value: formData.Lead_Created_Time, onChange: handleChange },
        { label: "Counselling Done By", name: "Counselling_Done_By", type: "select", value: formData.Counselling_Done_By, onChange: handleChange, options: ["True", "False"]},
        { label: "Registered Course", name: "Registered_Course", type: "number", value: formData.Registered_Course, onChange: handleChange },
        { label: "Preferable Time", name: "Preferable_Time", type: "date", value: formData.Preferable_Time, onChange: handleChange },
        { label: "Tech Stack", name: "Tech_Stack", type: "text", value: formData.Tech_Stack, onChange: handleChange },
        { label: "Batch Timing", name: "Batch_Timing", type: "date", value: formData.Batch_Timing, onChange: handleChange },
        { label: "Course Comments", name: "Course_Comments", type: "text", value: formData.Course_Comments, onChange: handleChange },
        { label: "Mode of Class", name: "Mode_Of_Class", type: "text", value: formData.Mode_Of_Class, onChange: handleChange },
        { label: "Slack Access", name: "Slack_Access", type: "text", value: formData.Slack_Access, onChange: handleChange },
        { label: "Comment", name: "Comment", type: "text", value: formData.Comment, onChange: handleChange },
        { label: "LMS Access", name: "LMS_Access", type: "text", value: formData.LMS_Access, onChange: handleChange, options: ["Up Coming", "On Going", "New", "Completed", "Ready To Complete"] },
    ]
    
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                >
                    <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
                </button>
                <div className='max-h-[80vh] overflow-y-auto'>
                    <div className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4 mb-6">
                            <FontAwesomeIcon icon={faIdCard} className="text-blue-500 text-3xl" />
                            <h2 className="text-2xl font-bold text-gray-800">CREATE LEARNER</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {formFields.map((field) => (
                                <div key={field.name} className="sm:col-span-2 md:col-span-1">
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select {field.label}</option>
                                            {field.options && field.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                        <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                {isLoading ? 'Creating...' : 'CREATE'}
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                                CANCEL
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}