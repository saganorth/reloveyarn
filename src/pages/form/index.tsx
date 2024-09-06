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
        
        <div>
            <Header/>
            <FormComponent
                formData={formData}
                handleChange={handleChange}
                handleProductChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    // Implement or call another function here if needed
                    console.log('Product changed:', e.target.value);
                }}
            />
            <Footer/>
        </div>
    );
};

export default FormPage;