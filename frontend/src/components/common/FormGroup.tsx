import React from 'react';

interface FormGroupProps {
  label: string;
  id: string;
  type?: 'text' | 'date' | 'textarea' | 'number' | 'password';
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  rows?: number;
  children?: React.ReactNode; // To wrap custom components like DatePicker
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  required,
  rows,
  children,
}) => {
  const renderInput = () => {
    if (children) {
      return children;
    }

    switch (type) {
      case 'textarea':
        return (
          <textarea
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
          />
        );
      case 'text':
      case 'date':
      case 'number':
      case 'password':
      default:
        return (
          <input
            type={type}
            className="form-control"
            id={id}
            value={value}
            onChange={onChange}
            required={required}
          />
        );
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label d-block">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormGroup;
