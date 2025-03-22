export type FormDataType = {
    product: string;
    type: string;
    color: string[];
    yarnType: string;
    measurements: {
      width: string;
      length: string;
    };
    comment: string;
    contactInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
  };
  