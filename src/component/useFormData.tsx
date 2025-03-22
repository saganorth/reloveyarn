import { ContactFormData } from '../models/ContactFormData';


export const getFormData = async (): Promise<ContactFormData> => {
        
        return new Promise((resolve) => {
            setTimeout(() => {
                return resolve({
                            product: '', // default value
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
                                phoneNumber: ''
                            }
                    });
            }, 1000);
        });
    };
