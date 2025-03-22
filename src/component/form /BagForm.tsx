import React from 'react';
import { ContactFormData } from '../../models/ContactFormData';
import Image from 'next/image';

interface BagFormProps {
    formData: ContactFormData;
    handleChange: (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
            | { target: { name: string; value: string[] | string } }
    ) => void;
}

const BagForm: React.FC<BagFormProps> = ({ formData, handleChange }) => {
    console.log('BagForm - Current form data:', formData);

    const handleColorCheckbox = (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
        const newValue = e.target.checked
            ? [...formData.color, color]
            : formData.color.filter((c) => c !== color);

        handleChange({ target: { name: 'color', value: newValue } });
    };

    const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
    };

    return (
        <div className="p-4 md:p-6" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
            {/* Title */}
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-pink-600 mb-6 uppercase tracking-widest">
                Let's make your IT bag!
            </h2>
            <p className="text-center text-gray-700 italic mb-8">
                Find your totally perfect style!
            </p>

            {/* 1. Color Selection */}
            <div className="mb-8">
                <label className="block text-pink-800 text-lg font-extrabold uppercase mb-2 tracking-wider">
                    1. Pick Your Fave Colors!
                </label>
                <div className="flex flex-wrap justify-center md:justify-start">
                    {['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white', 'brown'].map(
                        (color) => {
                            const isSelected = formData.color.includes(color);
                            return (
                                <label key={color} className="relative flex flex-col items-center mr-6 mb-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="color"
                                        value={color}
                                        checked={isSelected}
                                        onChange={(e) => handleColorCheckbox(e, color)}
                                        className="hidden"
                                    />
                                    <span
                                        className={`
                                            w-12 h-12 border-2 border-pink-400 relative transition-transform duration-200
                                            ${isSelected ? 'transform scale-110' : ''}
                                        `}
                                        style={{
                                            backgroundColor: color,
                                            clipPath:
                                                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                            boxShadow: isSelected ? '0 0 0 2px #f472b6' : 'none',
                                        }}
                                    ></span>
                                    <span className={`mt-1 text-sm capitalize text-gray-600 ${isSelected ? 'underline' : ''}`}>
                                        {color}
                                    </span>
                                </label>
                            );
                        }
                    )}
                </div>
            </div>

            {/* 2. Type Selection */}
            <div className="mb-8">
                <label className="block text-pink-800 text-lg font-extrabold uppercase mb-4 tracking-wider">
                    2. Which Bag Is Your Match?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 lg:gap-20 px-4">
                    {[
                        { value: 'A', label: 'Tote Bag', imgSrc: '/tote.png' },
                        { value: 'B', label: 'Big Bag', imgSrc: '/bigbag.png' },
                        { value: 'C', label: 'Beach Bag', imgSrc: '/beach.png' },
                        { value: 'D', label: 'Granny Bag', imgSrc: '/granny.png' },
                        { value: 'E', label: 'Petit Bag', imgSrc: '/petit.png' },
                        { value: 'F', label: 'Snus Bag', imgSrc: '/snus.png' },
                    ].map((bag) => (
                        <label key={bag.value} className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105 p-4">
                            <input
                                type="radio"
                                name="type"
                                value={bag.value}
                                checked={formData.type === bag.value}
                                onChange={handleRadio}
                                className="hidden"
                            />
                            <div className="w-24 h-24 relative mb-3">
                                <Image
                                    src={bag.imgSrc}
                                    alt={bag.label}
                                    className={`
                                        w-full h-full object-cover rounded-full border-4 border-dashed border-pink-300
                                        ${formData.type === bag.value ? 'border-pink-600 bg-pink-100 shadow-xl' : ''}
                                    `}
                                />
                            </div>
                            <span className="mt-2 text-xs sm:text-sm text-pink-700 font-bold text-center">
                                {bag.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 3. Yarn Selection */}
            <div className="mb-6">
                <label className="block text-pink-800 text-base sm:text-lg font-extrabold uppercase mb-2 tracking-wider">
                    3. Pick Your Yarn
                </label>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    {['Cotton', 'Wool', 'Acrylic'].map((yarn) => {
                        const isSelected = formData.yarnType === yarn;
                        return (
                            <label key={yarn} className="cursor-pointer transition-transform hover:scale-105 mr-2 sm:mr-4 relative">
                                <input
                                    type="radio"
                                    name="yarnType"
                                    value={yarn}
                                    checked={isSelected}
                                    onChange={handleRadio}
                                    className="hidden"
                                />
                                <span className="text-pink-700 font-bold text-xl sm:text-3xl">{yarn}</span>
                                {isSelected && (
                                    <span className="absolute top-0 left-0 w-full h-full border-2 sm:border-4 border-pink-600 rounded-full pointer-events-none transform rotate-3"></span>
                                )}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* 4. Width & Length */}
            <div className="mb-6">
                <label className="block text-pink-800 text-lg font-extrabold uppercase mb-2 tracking-wider">
                    4. Width (OMG!)
                </label>
                <input
                    type="text"
                    name="width"
                    value={formData.measurements.width}
                    onChange={handleChange}
                    className="w-1/3 py-2 px-3 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 font-semibold"
                    required
                />
                <label className="block text-pink-800 text-lg font-extrabold uppercase mb-2 tracking-wider mt-4">
                    5. Length (So Extra!)
                </label>
                <input
                    type="text"
                    name="length"
                    value={formData.measurements.length}
                    onChange={handleChange}
                    className="w-1/3 py-2 px-3 border-2 border-pink-300 rounded-full"
                    required
                />
            </div>

            {/* 6. Comments */}
            <textarea
                name="comment"
                value={formData.comment ?? ''}
                onChange={handleChange}
                className="w-full py-2 px-3 border-2 border-pink-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 font-semibold"
                rows={3}
                placeholder="Spill the tea, bestie!"
                required
            ></textarea>
        </div>
    );
};

export default BagForm;
