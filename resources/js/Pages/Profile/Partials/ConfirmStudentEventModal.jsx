import React from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px 0;
  color: ${({ darkMode }) => (darkMode ? '#ddd' : '#333')};
`;

const ModalText = styled.p`
  margin: 0 0 20px 0;
  font-size: 16px;
  color: ${({ darkMode }) => (darkMode ? '#ccc' : '#666')};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: ${({ primary, darkMode }) =>
    primary
      ? darkMode
        ? '#8A76BD'
        : '#6E3AA7'
      : darkMode
      ? '#555'
      : '#ccc'};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ primary, darkMode }) =>
      primary
        ? darkMode
          ? '#765a99'
          : '#5b2a8b'
        : darkMode
        ? '#444'
        : '#b3b3b3'};
  }
`;

const ConfirmModal = ({  onClose, onConfirm, darkMode }) => {


  return (
    <ModalBackdrop>
      <ModalContent darkMode={darkMode}>
        <ModalHeader darkMode={darkMode}>Confirm Update</ModalHeader>
        <ModalText darkMode={darkMode}>
          Are you sure you want to send the updated interview time to the student?
        </ModalText>
        <ButtonGroup>
          <Button darkMode={darkMode} onClick={onClose}>
            Cancel
          </Button>
          <Button primary darkMode={darkMode} onClick={onConfirm}>
            Confirm
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ConfirmModal;
