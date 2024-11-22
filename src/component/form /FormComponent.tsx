import React, { useState, useEffect, ChangeEvent } from 'react';
import { ContactFormData } from '../../models/ContactFormData';
import { getFormData } from '../useFormData';
import FiltForm from './FiltForm';
import MossaForm from './MossaForm';
import BalaklavaForm from './BalaklavaForm';
import BagForm from './BagForm';
import Image from 'next/image';


interface FormComponentProps {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            alert('Submission successful!');
        }
    };

    const selectProduct = (type: string) => {
        setProductType(type);
        handleProductChange({ target: { value: type, name: 'product' } } as ChangeEvent<HTMLSelectElement>);
    };

    return (
        <><form onSubmit={handleSubmit} className="bg-pink-200 shadow-lg rounded-lg p-8">
        <div className="bg-pink-100 shadow-lg rounded-lg p-8">
          <h3 className="text-lg font-bold mb-4 text-pink-700">Select Product:</h3>
          <div className="flex space-x-4 justify-center">
  {['filt', 'väska', 'balaklava', 'mössa'].map((type) => (
    <button
      key={type}
      onClick={() => selectProduct(type)}
      className={`relative w-[100px] h-[90px] ${productType === type ? 'bg-pink-500' : 'bg-pink-300'} shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
      style={{
        display: 'inline-block',
        width: '100px',
        height: '90px',
        borderRadius: '50%',
        background: productType === type ? '#f50057' : '#ffc0cb',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
    <div style={{
      clipPath: "url('#heart-shape')",
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Image
        src={`/${type}.jpeg`}
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
          productType === 'filt' ? <FiltForm formData={formData} handleChange={handleChange} /> :
          productType === 'mössa' ? <MossaForm formData={formData} handleChange={handleChange} /> :
          productType === 'balaklava' ? <BalaklavaForm formData={formData} handleChange={handleChange} /> :
          productType === 'väska' ? <BagForm formData={formData} handleChange={handleChange} /> : null
        )}
    
      <div className="mb-4">
          <h3 className="text-lg leading-6 font-bold mb-2 text-pink-700">Contact Information</h3>
          <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            {["firstName", "lastName", "email", "phoneNumber"].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-bold text-gray-700 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData.contactInfo[field]}
                  onChange={handleChange}
                  className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-lg border-gray-300 rounded-md"
                  required />
              </div>
            ))}
          </div>
        </div><button type="submit" className="bg-pink-500 text-white font-bold py-2 px-4 rounded">
          Submit
        </button><svg width="0" height="0">
          <defs>
            <clipPath id="heart-shape" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.45 L0.1,0.85 Q0.5,0.1 0.9,0.85 L0.5,0.45" />
            </clipPath>
          </defs>
        </svg>
      </div>
      </form>
    </>
  );
};

export default FormComponent;
