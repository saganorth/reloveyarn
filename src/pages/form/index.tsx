import React, { useState } from 'react';

import Header from '../../component/ui/Header';
import Footer from '../../component/ui/Footer';
import FormComponent from '../../component/form /FormComponent';

const FormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        type: '',
        color: '',
        yarnType: '',
        measurements: '',
        comment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-pink-100">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto bg-pink-200 shadow-xl rounded-xl p-8 border border-pink-300">
                    <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">Create Your Perfect Crochet Project</h1>
                    <FormComponent
                        formData={formData}
                        handleChange={handleChange}
                        handleProductChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            console.log('Product changed:', e.target.value);
                        }}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FormPage;
