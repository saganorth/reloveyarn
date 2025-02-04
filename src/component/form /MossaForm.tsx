import React from 'react';
import { ContactFormData } from '../../models/ContactFormData';

interface MossaFormProps {
  formData: ContactFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const MossaForm: React.FC<MossaFormProps> = ({ formData, handleChange }) => {
  
  const handleColorCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) => {
    const newValue = e.target.checked
      ? [...formData.color, color]
      : formData.color.filter((c) => c !== color);

    handleChange({
      target: {
        name: 'color',
        value: newValue.join(','),
      } as unknown as EventTarget & HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>);
  };


  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <div
    className="p-4 md:p-6"
    style={{ fontFamily: '"Comic Sans MS", cursive' }} 
  >
    {/* Title */}
    <h2 className="text-center text-3xl md:text-4xl font-extrabold text-pink-600 mb-6 uppercase tracking-widest">
      Let's make your lit beanie!
    </h2>
    <p className="text-center text-gray-700 italic mb-8">
      Find your totally perfect style!
    </p>
  {/* 1. Color Selection */}
  <div className="mb-8">
      <label
          htmlFor="color"
          className="block text-pink-800 text-lg font-extrabold uppercase mb-2 tracking-wider"
      >
          1. Pick Your Fave Colors!
      </label>
      <div className="flex flex-wrap justify-center md:justify-start">
          {[
              'red',
              'orange',
              'yellow',
              'green',
              'blue',
              'indigo',
              'violet',
              'black',
              'white',
              'brown',
          ].map((color) => {
              const isSelected = formData.color.includes(color);
              return (
                  <label
                      key={color}
                      className="relative flex flex-col items-center mr-6 mb-4 cursor-pointer"
                  >
                      {/* Hidden checkbox */}
                      <input
                          type="checkbox"
                          name="color"
                          value={color}
                          checked={isSelected}
                          onChange={(e) => handleColorCheckbox(e, color)}
                          className="hidden"
                      />
                      {/* Star shape */}
                      <span
                          className={`
                              w-12 h-12
                              border-4
                              border-gray-300
                              relative
                              transition-transform
                              duration-200
                          `}
                          style={{
                              backgroundColor: color,
                              clipPath:
                                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                          }}
                      >
      
                      </span>
                      <span
                          className={`
                              mt-1 text-sm capitalize text-gray-600
                              ${isSelected ? 'underline' : ''}
                          `}
                      >
                          {color}
                      </span>
                  </label>
              );
          })}
      </div>
    </div>
    <div className="mb-6">
      <label
        htmlFor="type"
        className="
          block
          text-pink-800
          text-lg
          font-extrabold
          uppercase
          mb-2
          tracking-wider
        "
      >
        2. Which Beanie Is Your Match?
      </label>

      <div
        className="
          flex 
          flex-nowrap 
          items-center 
          gap-4 
          overflow-x-auto 
          pb-2
        "
      >
        {[
          { value: 'A', label: 'Beanie', imgSrc: '/beanie.png' },
          { value: 'B', label: 'Bonnet', imgSrc: '/bonnet.png' },
          { value: 'C', label: 'Granny Style', imgSrc: '/granyhat.png' },
          { value: 'D', label: 'Scrappy', imgSrc: '/mössa.png' },
        ].map((bag) => (
          <label
            key={bag.value}
            className="
              flex flex-col 
              items-center 
              cursor-pointer
              transition-transform 
              hover:scale-105
            "
          >
            <input
              type="radio"
              name="type"
              value={bag.value}
              checked={formData.type === bag.value}
              onChange={handleRadio}
              className="hidden"
            />
            <img
              src={bag.imgSrc}
              alt={bag.label}
              className={`
                w-24 h-24
                rounded-full
                border-4 border-dashed border-pink-300
                ${
                  formData.type === bag.value
                    ? 'border-pink-600 bg-pink-100 shadow-xl'
                    : ''
                }
              `}
            />
            <span className="mt-1 text-sm text-pink-700 font-bold">
              {bag.label}
            </span>
          </label>
        ))}
      </div>
    </div>

  <div className="mb-6">
      <label
          className="
              block
              text-pink-800
              text-lg
              font-extrabold
              uppercase
              mb-2
              tracking-wider
          "
      >
          3. Pick Your Yarn
      </label>
      <div className="flex flex-nowrap items-center gap-4 overflow-x-auto pb-2">
          {['Cotton', 'Wool', 'Acrylic'].map((yarn) => {
              const isSelected = formData.yarnType === yarn;
              return (
                  <label
                      key={yarn}
                      className="
                          cursor-pointer
                          transition-transform
                          hover:scale-105
                          mr-4
                          relative
                      "
                  >
                      <input
                          type="radio"
                          name="yarnType"
                          value={yarn}
                          checked={isSelected}
                          onChange={handleRadio}
                          className="hidden"
                      />
                      <span
                          className={`
                              text-pink-700
                              font-bold
                              text-3xl
                          `}
                      >
                          {yarn}
                      </span>
                      {isSelected && (
                          <span
                              className="
                                  absolute
                                  top-0
                                  left-0
                                  w-full
                                  h-full
                                  border-4
                                  border-pink-600
                                  rounded-full
                                  pointer-events-none
                                  transform
                                  rotate-3
                              "
                          ></span>
                      )}
                  </label>
              );
          })}
      </div>
  </div>

  {/* 4) Width */}
  <div className="mb-6">
    <label
      htmlFor="width"
      className="
      block
      text-pink-800
      text-lg
      font-extrabold
      uppercase
      mb-2
      tracking-wider
      "
    >
      4. Width (OMG!)
    </label>
    <div className="flex items-center space-x-2">
      <input
      type="text"
      name="width"
      id="width"
      value={formData.measurements.width}
      onChange={handleChange}
      className="
        w-1/3
        py-2
        px-3
        border-2
        border-pink-300
        rounded-full
        focus:outline-none
        focus:ring-2
        focus:ring-pink-200
        text-gray-700
        font-semibold
      "
      required
      />
      <span className="text-sm text-pink-600 font-bold">cm</span>
    </div>
  </div>

  {/* 5) Length */}
  <div className="mb-6">
    <label
      htmlFor="length"
      className="
      block
      text-pink-800
      text-lg
      font-extrabold
      uppercase
      mb-2
      tracking-wider
      "
    >
      5. Length (So Stylish!)
    </label>
    <div className="flex items-center space-x-2">
      <input
      type="text"
      name="length"
      id="length"
      value={formData.measurements.length}
      onChange={handleChange}
      className="
        w-1/3
        py-2
        px-3
        border-2
        border-pink-300
        rounded-full
        focus:outline-none
        focus:ring-2
        focus:ring-pink-200
        text-gray-700
        font-semibold
      "
      required
      />
      <span className="text-sm text-pink-600 font-bold">cm</span>
    </div>
  </div>


    {/* 6. Comments */}
    <div className="mb-6">
      <label
        htmlFor="comment"
        className="
          block
          text-pink-800
          text-lg
          font-extrabold
          uppercase
          mb-2
          tracking-wider
        "
      >
        6. Your Juicy Thoughts!
      </label>
      <textarea
        name="comment"
        id="comment"
        value={formData.comment ?? ''}
        onChange={handleChange}
        className="
          w-full
          py-2
          px-3
          border-2
          border-pink-300
          rounded-3xl
          focus:outline-none
          focus:ring-2
          focus:ring-pink-200
          text-gray-700
          font-semibold
        "
        rows={3}
        placeholder="Spill the tea, bestie!"
        required
      ></textarea>
    </div>
  </div>
);
};

  export default MossaForm;
    