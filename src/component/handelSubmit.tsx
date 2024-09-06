import { ContactFormData } from "../models/ContactFormData";


export const handleSubmit = async (data: ContactFormData): Promise<Response | null> => {
    try {
        const response = await fetch('http://localhost:3000/api/besokare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const responseData = await response.json();
        console.log('Response from POST:', responseData);
        return responseData; // Returnerar responseData
    } catch (error) {
        console.error('Det gick inte att skicka data:', error);
        return null; // Returnerar null vid fel
    }
  };
  
  export const fetchUpdatedData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/besokare');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedData = await response.json();
      return updatedData; 
    } catch (error) {
      console.error('Det gick inte att hämta uppdaterad data:', error);
      return null; 
    }
  };

  