
interface ContactInfo {
  firstName?: string;  // Optional property
  lastName?: string;   // Optional property
  email?: string;      // Optional property
  phoneNumber?: string;  // Optional property
}
export interface ContactFormData {
  product: string;
  type?: string;
  color?: string[];
  yarnType?: string;
  measurements?: string;
  comment?: string;
  contactInfo: ContactInfo;
}
