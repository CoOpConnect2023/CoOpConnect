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
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px; /* Increased max-width for a wider modal */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
  transition: width 0.3s ease;

  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (min-width: 1024px) {
    max-width: 700px; /* Even wider on larger screens */
    padding: 35px;
  }
`;

const ModalHeader = styled.h2`
  margin: 0 0 20px 0;
  font-size: 1.5em;
  color: ${({ darkMode }) => (darkMode ? '#ddd' : '#333')};

  @media (max-width: 480px) {
    font-size: 1.3em;
  }
`;

const ModalText = styled.p`
  margin: 0 0 20px 0;
  font-size: 16px;
  color: ${({ darkMode }) => (darkMode ? '#ccc' : '#666')};

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 15px;
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 15px;
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
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ primary, darkMode }) =>
      primary
        ? darkMode
          ? '#765a99'
          : '#5b2a8b'
        : darkMode
        ? '#444'
        : '#b3b3b3'};
    transform: scale(1.04);
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width on small screens */
    font-size: 14px;
    padding: 10px;
  }
`;

const ConfirmModal = ({ onClose, onConfirm, onUpdateWithoutNotification, darkMode, headerText, modalText }) => {
    return (
      <ModalBackdrop>
        <ModalContent darkMode={darkMode}>
          <ModalHeader darkMode={darkMode}>{headerText || 'Confirm Action'}</ModalHeader>
          <ModalText darkMode={darkMode}>
            {modalText || 'Are you sure you want to proceed with this action?'}
          </ModalText>
          <ButtonGroup>
            <Button darkMode={darkMode} onClick={onClose}>
              Cancel
            </Button>
            <Button primary darkMode={darkMode} onClick={onConfirm}>
              Confirm
            </Button>
            <Button darkMode={darkMode} onClick={onUpdateWithoutNotification}>
              Update Without Notifying
            </Button>
          </ButtonGroup>
        </ModalContent>
      </ModalBackdrop>
    );
  };

export default ConfirmModal;
