import React, { useState, useEffect, ChangeEvent } from 'react';
import { ContactFormData } from '../../models/ContactFormData';
import { getFormData } from '../useFormData';
import FiltForm from './FiltForm';
import MossaForm from './MossaForm';
import BalaklavaForm from './BalaklavaForm';
import BagForm from './BagForm';
import Image from 'next/image';

type FormComponentProps = {
  formData: {
    product: string;
    type: string;
    color: string[];
    yarnType: string;
    measurements: {
      width: string;
      length: string;
    };
    comment: string;
    contactInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleProductChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const FormComponent: React.FC<FormComponentProps> = ({ formData, handleChange, handleProductChange }) => {
  const [productType, setProductType] = useState<string>('');

  const selectProduct = (type: string) => {
    setProductType(type);
    handleProductChange({ target: { value: type, name: 'product' } } as ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="bg-pink-100 shadow-lg rounded-lg p-8">
      <h3 className="text-lg font-bold mb-4 text-pink-700">Select Product:</h3>
      <div className="flex space-x-4 justify-center">
        {['filt', 'väska', 'balaklava', 'mössa'].map(type => (
            <button
            type="button"
            key={type}
            onClick={() => selectProduct(type)}
            className={`relative w-[220px] h-[210px] ${
              productType === type ? 'bg-pink-500' : 'bg-pink-300'
            } shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
            style={{
              display: 'inline-block',
              width: '200px',
              height: '170px',
              borderRadius: '50%',
              background: productType === type ? '#f50057' : '#ffc0cb',
              overflow: 'hidden',
              position: 'relative',
            }}
            >
            <div>
              <Image
              src={`/${type}.png`}
              alt={type}
              layout="fill"
              objectFit="cover"
              style={{ width: '100%', height: '100%' }}
              />
            </div>
            </button>
        ))}
      </div>
      <svg width="0" height="0">
        <defs>
          <clipPath id="heart-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.9 L0.1,0.5 A0.3,0.3 0 0,1 0.5,0.1 A0.3,0.3 0 0,1 0.9,0.5 L0.5,0.9 Z" />
          </clipPath>
        </defs>
      </svg>

      {productType && (
        <>
          {productType === 'filt' && (
            <FiltForm
              formData={{
                ...formData,
                width: formData.measurements.width,
                length: formData.measurements.length,
              }}
              handleChange={handleChange}
            />
          )}
          {productType === 'mössa' && (
            <MossaForm
              formData={{
                ...formData,
                width: formData.measurements.width,
                length: formData.measurements.length,
              }}
              handleChange={handleChange}
            />
          )}
          {productType === 'balaklava' && (
            <BalaklavaForm
              formData={{
                ...formData,
                width: formData.measurements.width,
                length: formData.measurements.length,
              }}
              handleChange={handleChange}
            />
          )}
          {productType === 'väska' && <BagForm formData={formData} handleChange={handleChange} />}
        </>
      )}

      <div className="mb-4">
        <h3 className="text-lg leading-6 font-bold mb-2 text-pink-700">Contact Information</h3>
        <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {['firstName', 'lastName', 'email', 'phoneNumber'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-bold text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={formData.contactInfo[field]}
                onChange={handleChange}
                className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
