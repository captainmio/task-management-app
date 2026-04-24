import { useState } from 'react'
import { Button, InputGroup, InputRightElement, type InputProps } from '@chakra-ui/react'
import { Textbox } from './Textbox';
import React from 'react';

interface PasswordFieldProps extends Omit<InputProps, 'onChange' | 'type'> {
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({value, onChange, ...props}) => {
  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Textbox
        pr='4.5rem'
        placeholder='Enter password'
        value={value}
        onChange={onChange}
        type={show ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
};

export default PasswordField;
