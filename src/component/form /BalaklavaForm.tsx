import React from 'react';
import { ContactFormData } from '../../models/ContactFormData';

interface BalaklavaFormProps {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string[] } }) => void;
}

const BalaklavaForm: React.FC<BalaklavaFormProps> = ({ formData, handleChange }) => {
  

      return (
        <div>
            <div className="mb-4">
                <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                <div className="flex flex-wrap">
                    {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white', 'brown'].map((color) => (
                        <label key={color} className="flex items-center mr-6 mb-4">
                            <input
                                type="checkbox"
                                name="color"
                                value={color}
                                checked={formData.color.includes(color)}
                                onChange={(e) => {
                                    const newValue = e.target.checked
                                        ? [...formData.color, color]
                                        : formData.color.filter((c) => c !== color);
                                    handleChange({ target: { name: 'color', value: newValue } });
                                }}
                                className="hidden"
                            />
                            <span
                                className={`w-12 h-12 rounded-full border-2 border-gray-300 ${formData.color.includes(color) ? 'border-blue-500' : ''}`}
                                style={{ backgroundColor: color }}
                            ></span>
                        </label>
                    ))}
                </div>
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
                      <option value="A">just eyes </option>
                      <option value="B">big hole</option>
                      <option value="C">fancy type</option>
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
   
              <div className="mb-4">
                <label htmlFor="width" className="block text-gray-700 text-sm font-bold mb-2">Width</label>
                <div className="flex items-center">
                    <input
                        type="text"
                        name="width"
                        id="width"
                        value={formData.measurements.width}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <span className="ml-2">cm</span>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="length" className="block text-gray-700 text-sm font-bold mb-2">Length</label>
                <div className="flex items-center">
                    <input
                        type="text"
                        name="length"
                        id="length"
                        value={formData.measurements.length}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <span className="ml-2">cm</span>
                </div>
            </div>

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
 

export default BalaklavaForm;