import React from 'react';
import { ContactFormData } from '../../models/ContactFormData';

interface FiltFormProps {
    formData: ContactFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FiltForm: React.FC<FiltFormProps> = ({ formData, handleChange }) => {
    return (
        <div> {/* This is the parent div for the form elements */}
            {/* Color Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                <input
                    type='text'
                    name='color'
                    id='color'
                    value={formData.color?.join(', ') ?? ''} // Ensures formData.color is an array before using it
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Type of Filt */}
            <div className="mb-4">
                <label htmlFor='type' className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <select
                    name='type'
                    id='type'
                    value={formData.type}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select type</option>
                    <option value="A">big</option>
                    <option value="B">small</option>
                    <option value="C">baby</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            {/* Type of Yarn */}
            <div className="mb-4">
                <label htmlFor='yarnType' className="block text-gray-700 text-sm font-bold mb-2">Yarn Type</label>
                <select
                    name='yarnType'
                    id='yarnType'
                    value={formData.yarnType}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select yarn type</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wool">Wool</option>
                    <option value="Acrylic">Acrylic</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            {/* Measurements Input */}
            <div className="mb-4">
                <label htmlFor='measurements' className="block text-gray-700 text-sm font-bold mb-2">Measurements</label>
                <input
                    type='text'
                    name='measurements'
                    id='measurements'
                    value={formData.measurements || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* Contact Information */}
            

            {/* Comment Section */}
            <div className="mb-4">
                <label htmlFor='comment' className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                <textarea
                    name='comment'
                    id='comment'
                    value={formData.comment || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                    required
                ></textarea>
            </div>
        </div> 
    );
};

export default FiltForm;
