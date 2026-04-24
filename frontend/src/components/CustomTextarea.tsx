import { type TextareaProps, Textarea } from '@chakra-ui/react';
import React from 'react'

interface TextAreaProps extends Omit<TextareaProps, 'onChange'> {
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomeTextarea: React.FC<TextAreaProps> = ({onChange, value}) => {
  return (
    <Textarea value={value} style={{
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      borderRadius: '6px',
      width: '100%',
    }}
    onChange={onChange}
    />
  )
}

export default CustomeTextarea