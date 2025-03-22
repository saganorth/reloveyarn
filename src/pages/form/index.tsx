import React, { useState } from 'react';
import Header from '../../component/ui/Header';
import Footer from '../../component/ui/Footer';
import FormComponent from '../../component/form /FormComponent';
import { handleSubmit } from '../../component/handelSubmit';
import { FormDataType } from '../../models/FromDataType';

const FormPage = () => {
    const [formData, setFormData] = useState<FormDataType>({
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
            if (name.startsWith('measurements.')) {
                return {
                    ...prevFormData,
                    measurements: {
                        ...prevFormData.measurements,
                        [name.split('.')[1]]: value
                    }
                };
            } else if (name in prevFormData.contactInfo) {
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

    const validateForm = () => {
        const missingFields = [];
    
        if (!formData.product.trim()) missingFields.push('product');
        if (!formData.type.trim()) missingFields.push('type');
        if (!formData.yarnType.trim()) missingFields.push('yarnType');
        if (!formData.color || formData.color.length === 0) missingFields.push('color');
        if (!formData.measurements.width.trim()) missingFields.push('width');
        if (!formData.measurements.length.trim()) missingFields.push('length');
        if (!formData.comment.trim()) missingFields.push('comment');
    
        // Validate contact info
        if (!formData.contactInfo.firstName.trim()) missingFields.push('firstName');
        if (!formData.contactInfo.lastName.trim()) missingFields.push('lastName');
        if (!formData.contactInfo.email.trim()) missingFields.push('email');
        if (!formData.contactInfo.phoneNumber.trim()) missingFields.push('phoneNumber');
    
        console.log('Missing fields:', missingFields);
        return missingFields;
    };
    

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        const missingFields = validateForm();

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const response = await handleSubmit(formData);
            if (response) {
                setOrdersName(`${formData.contactInfo.firstName} ${formData.contactInfo.lastName}`);
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-pink-300">
            <Header />
            
            <div className="bg-cover bg-center min-h-screen text-gray-800" style={{ background: 'url(/form.png)' }}>
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <form onSubmit={handleSubmission}>
                    <FormComponent 
    formData={formData}
    setFormData={setFormData}
    handleSubmit={handleSubmission} 
/>
                    </form>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default FormPage;
