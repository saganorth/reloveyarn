import { ContactFormData } from '../models/ContactFormData';

// Asynchronously fetches initial form data
export const getFormData = async (): Promise<ContactFormData> => {
        // Simulate fetching data with a timeout
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
