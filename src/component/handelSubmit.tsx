import { FormDataType} from "../models/FromDataType";

export const handleSubmit = async (data: FormDataType): Promise<Response | null> => {
    try {
        console.log("✅ Data before sending:", JSON.stringify(data, null, 2)); // ✅ Check browser console

        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // ✅ Ensure JSON header is set
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('✅ Response from server:', responseData); 

        return responseData;
    } catch (error) {
        console.error('❌ Failed to send order:', error);
        return null;
    }
};



export const fetchUpdatedData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/orders');
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
