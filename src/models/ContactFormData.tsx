
interface ContactInfo {
  firstName: string;  
  lastName: string;   
  email: string;      
  phoneNumber: string;  
}
export interface ContactFormData {
  product: string;
  type: string;
  color?: string[];
  yarnType: string;
  measurements: string;
  comment: string;
  contactInfo: ContactInfo;
}
