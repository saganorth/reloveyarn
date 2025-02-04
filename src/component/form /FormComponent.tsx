import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import FiltForm from './FiltForm';
import MossaForm from './MossaForm';
import BalaklavaForm from './BalaklavaForm';
import BagForm from './BagForm';

type Measurements = {
  width: string;
  length: string;
};

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type FormDataType = {
  product: string;
  type: string;
  color: string[];
  yarnType: string;
  measurements: Measurements;
  comment: string;
  contactInfo: ContactInfo;
};

const FormComponent: React.FC = () => {
  // 1. Definiera ditt formData i parent
  const [formData, setFormData] = useState<FormDataType>({
    product: '',
    type: '',
    color: [],
    yarnType: '',
    measurements: {
      width: '',
      length: '',
    },
    comment: '',
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  // 2. Håll koll på vilken produkttyp som är vald
  const [productType, setProductType] = useState<string>('');

  // 3. En handleChange-funktion som uppdaterar nested objekt
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Exempel: om man anger name="measurements.width" i child
    // vill vi plocka isär "measurements" och sedan "width".
    // Men du kan också välja en enklare variant (se FiltForm-exempel nedan).
    if (name.startsWith('measurements.')) {
      const key = name.split('.')[1]; // "width" eller "length"
      setFormData((prev) => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [key]: value,
        },
      }));
    } 
    // Om det inte är measurements (ex: firstName, comment etc.)
    else if (name in formData.contactInfo) {
      // Om det är något i contactInfo
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [name]: value,
        },
      }));
    } else {
      // Allt annat direkt på root-nivå av formData
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 4. Hantera val av produkt (sätter state + uppdaterar formData)
  const handleProductChange = (type: string) => {
    setProductType(type);
    setFormData((prev) => ({
      ...prev,
      product: type,
    }));
  };

  // 5. Submit-funktion som skickar till din lokala Express-API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/minroute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      // Gör något här, t.ex. visa en bekräftelse
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-3xl 
        mx-auto 
        p-8 
        md:p-10 
        bg-gradient-to-br
        from-pink-100 
        via-purple-50 
        to-pink-100
        rounded-3xl 
        border-4 
        border-dashed 
        border-pink-300 
        shadow-2xl
      "
      style={{ fontFamily: '"Comic Sans MS", cursive' }}
    >
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-pink-600 mb-6 uppercase tracking-wider">
        OMG, Pick Your Product!
      </h2>
      <p className="text-center text-gray-700 italic mb-8">
        The perfect yarn item for your totally fab style!
      </p>

      {/* Produkt-knappar */}
      <div className="flex justify-center gap-6 mb-8">
        {['filt', 'väska', 'balaklava', 'mössa'].map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => handleProductChange(type)}
            className={`
              relative
              w-[160px]
              h-[160px]
              transition-transform
              transform
              hover:scale-105
              focus:outline-none
              focus:ring-4
              focus:ring-pink-300
              rounded-full
              border-4
              ${
                productType === type ? 'border-pink-500' : 'border-pink-300'
              }
              bg-white
              shadow-md
              overflow-hidden
            `}
          >
            <div className="absolute inset-0">
              <Image
                src={`/${type}.png`}
                alt={type}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Beroende på vald produkt renderas olika child-formulär */}
      {productType && (
        <div className="mb-6">
          {productType === 'filt' && (
            <FiltForm
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {productType === 'mössa' && (
            <MossaForm
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {productType === 'balaklava' && (
            <BalaklavaForm
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {productType === 'väska' && (
            <BagForm
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </div>
      )}

      {/* Kontaktinfo */}
      <div className="mb-4 bg-white p-4 rounded-2xl border-2 border-pink-200 shadow-md">
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-pink-700 uppercase tracking-wider">
          Let's Keep In Touch, Bestie!
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {/* Exempel på textfält – notera att name stämmer överens med 
              ditt contactInfo-objekt i state */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.contactInfo.firstName}
              onChange={handleChange}
              className="mt-1 block w-full bg-pink-50 border-2 border-pink-300 rounded-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.contactInfo.lastName}
              onChange={handleChange}
              className="mt-1 block w-full bg-pink-50 border-2 border-pink-300 rounded-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              className="mt-1 block w-full bg-pink-50 border-2 border-pink-300 rounded-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.contactInfo.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full bg-pink-50 border-2 border-pink-300 rounded-full py-2 px-3"
            />
          </div>
        </div>

        {/* Submit-knapp */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
