import React from 'react';
import styles from '../styles/FormData.module.css';
import {ContactFormData} from '../models/ContactFormData'; 



type FormComponentProps = {
  formData: ContactFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
const FormComponent: React.FC<FormComponentProps> = ({ formData, handleChange }) => {
  return (
    <form>
      <div className={styles.formControl}>
        <label htmlFor='firstName' className={styles.label}>Förnamn</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={formData.firstName}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor='lastName' className={styles.label}>Efternamn</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor='email' className={styles.label}>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor='telNumber' className={styles.label}>Telefon Nummer</label>
        <input
          type='text'
          name='telNumber'
          id='telNumber'
          value={formData.telNumber}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
    </form>
  );
};

export default FormComponent;
