import React from "react";
import { Input, type InputProps } from "@chakra-ui/react";

interface TextboxProps extends Omit<InputProps, 'onChange'> {
  value?: string | number;
  onChange?: (value: string | number) => void;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url';
  ref?: React.Ref<HTMLInputElement>;
}

export const Textbox: React.FC<TextboxProps> = ({ 
  value, 
  onChange, 
  type = 'text', 
  ref, 
  ...props 
}) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (type === 'number') {
      const numValue = inputValue === '' ? '' : Number(inputValue);
      onChange?.(numValue as number);
    } else {
      onChange?.(inputValue);
    }
  };

  return (
    <Input
      ref={ref}
      type={type}
      value={value ?? ''}
      onChange={handleChange}
      {...props}
      style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '6px',
        width: '100%',
      }}
    />
  );
};