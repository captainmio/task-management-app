import React from "react";
import { Input, type InputProps } from "@chakra-ui/react";

interface TextboxProps extends Omit<InputProps, 'onChange'> {
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    onChange(e)
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