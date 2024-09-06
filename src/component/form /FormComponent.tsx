import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../../models/ContactFormData';
import { getFormData } from '../useFormData';
import FiltForm from './FiltForm';
import MossaForm from './MossaForm';

interface FormComponentProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleProductChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        return <FiltForm formData={formData} handleChange={handleFormChange} />;
      case 'mössa':
        return <MossaForm formData={formData} handleChange={handleFormChange} />;
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor='product' className="block text-gray-700 text-sm font-bold mb-2">Product</label>
        <select
          name='product'
          id='product'
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            handleProductChange(e);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.contactInfo?.firstName || ''}
              onChange={handleContactChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.contactInfo?.lastName || ''}
              onChange={handleContactChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.contactInfo?.email || ''}
              onChange={handleContactChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.contactInfo?.phoneNumber || ''}
              onChange={handleContactChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

export default FormComponent;
