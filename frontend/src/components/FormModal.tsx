import React, { type ReactNode } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  type ModalProps,
} from '@chakra-ui/react';

// Define the interface extending Chakra's ModalProps
interface StandaloneModalProps extends Omit<ModalProps, 'children'> {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

const FormModal: React.FC<StandaloneModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  isCentered = true,
  ...rest
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered={isCentered} {...rest}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        
        <ModalBody pb={footer ? 2 : 6}>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormModal;