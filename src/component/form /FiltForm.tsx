import React, { useState } from 'react';
import { ContactFormData } from '../../models/ContactFormData';

interface FiltFormProps {
    formData: ContactFormData;  // Pass initial form data instead of empty state
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FiltForm: React.FC<FiltFormProps> = ({ formData, handleChange }) => {
    // Manage the form data state in the parent component or context if needed across multiple forms
    const [localFormData, setLocalFormData] = useState<ContactFormData>(formData);

    // Example handleChange function specific to this form if needed
    const localHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'color') {
            setLocalFormData(prevFormData => ({
                ...prevFormData,
                color: value.split(',').map(color => color.trim())
            }));
        } else {
            setLocalFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
        handleChange(e);
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                <input
                    type="text"
                    name="color"
                    id="color"
                    value={localFormData.color.join(', ')}
                    onChange={localHandleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <select
                    name="type"
                    id="type"
                    value={localFormData.type}
                    onChange={localHandleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select type</option>
                    <option value="A">big</option>
                    <option value="B">small</option>
                    <option value="C">baby</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="yarnType" className="block text-gray-700 text-sm font-bold mb-2">Yarn Type</label>
                <select
                    name="yarnType"
                    id="yarnType"
                    value={localFormData.yarnType}
                    onChange={localHandleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select yarn type</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wool">Wool</option>
                    <option value="Acrylic">Acrylic</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="measurements" className="block text-gray-700 text-sm font-bold mb-2">Measurements</label>
                <input
                    type="text"
                    name="measurements"
                    id="measurements"
                    value={localFormData.measurements}
                    onChange={localHandleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                <textarea
                    name="comment"
                    id="comment"
                    value={localFormData.comment}
                    onChange={localHandleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={3}
                    required
                ></textarea>
            </div>
        </div>
    );
};

export default FiltForm;
