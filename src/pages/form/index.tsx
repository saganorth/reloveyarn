import React, { useState } from 'react';

import Header from '../../component/ui/Header';
import Footer from '../../component/ui/Footer';
import FormComponent from '../../component/form /FormComponent';

const FormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        type: '',
        color: [],
        yarnType: '',
        measurements: {
            width: '',
            length: ''
        },
        comment: '',
        contactInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            if (name in prevFormData.contactInfo) {
                return {
                    ...prevFormData,
                    contactInfo: {
                        ...prevFormData.contactInfo,
                        [name]: value
                    }
                };
            } else {
                return {
                    ...prevFormData,
                    [name]: value
                };
            }
        });
    };

    const [ordersName, setOrdersName] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.contactInfo.firstName || !formData.contactInfo.lastName || !formData.contactInfo.email || !formData.contactInfo.phoneNumber || !formData.product || !formData.type || !formData.color || !formData.yarnType || !formData.measurements) {
            alert('Vänligen fyll i alla fält.');
            return;
        }

        try {
            setOrdersName(`${formData.contactInfo.firstName} ${formData.contactInfo.lastName}`);
            setShowPopup(true);
        } catch (error) {
            console.error('Det gick inte att skicka data:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-pink-300">
            <Header />
            
            <div className="bg-cover bg-center min-h-screen text-gray-800" style={{ background: 'url(/form.png)' }}>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div>
                    <form onSubmit={handleSubmission}>
                        <FormComponent
                            formData={formData}
                            handleChange={handleChange}
                            handleProductChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                console.log('Product changed:', e.target.value);
                            }}
                        />
                      
                    </form>
                </div>
                
            </main>
            </div>
            <Footer />
        </div>
    );
};

export default FormPage;
