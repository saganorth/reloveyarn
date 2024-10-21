import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../../models/ContactFormData';
import { getFormData } from '../useFormData';
import FiltForm from './FiltForm';
import MossaForm from './MossaForm';

import { ChangeEvent } from 'react';

interface FormComponentProps {
    formData: {
        product: string;
        type: string;
        color: string;
        yarnType: string;
        measurements: string;
        comment: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleProductChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ handleChange, handleProductChange }) => {
  const [productType, setProductType] = useState<string>('');
  const [formData, setFormData] = useState<ContactFormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const initialFormData = await getFormData();
      setFormData(initialFormData);
    };

    fetchData();
  }, []);

  if (!formData) {
    return <p>Loading...</p>; // Handle loading state
  }

  const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev?.contactInfo,
        [name]: value
      },
      product: prev?.product || '' // Add this line to ensure product is always of type string
    }));
  };

  const renderProductSpecificForm = (): JSX.Element | null => {
    switch (productType) {
      case 'filt':
        return <FiltForm formData={formData} handleChange={handleChange} />;
      case 'mössa':
        return <MossaForm formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      alert('Submission successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pink-100 shadow-lg rounded-lg p-8">
      <div className="mb-4">
        <label htmlFor='product' className="block text-lg font-bold mb-2 text-pink-700">Product</label>
        <select
          name='product'
          id='product'
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            handleProductChange(e);
          }}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select a product</option>
          <option value="filt">Filt</option>
          <option value="mössa">Mössa</option>
        </select>
      </div>

      {productType && renderProductSpecificForm()}

      {/* Contact Information Section */}
      <div className="mb-4">
        <h3 className="text-lg leading-6 font-bold mb-2 text-pink-700">Contact Information</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-bold text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
          type="text"
          name={field}
          id={field}
          value={formData.contactInfo?.[field] || ''}
          onChange={handleContactChange}
          className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
          required
              />
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
        <span className="mr-2">Submit</span>
      </button>
    </form>
  );
};

export default FormComponent;
