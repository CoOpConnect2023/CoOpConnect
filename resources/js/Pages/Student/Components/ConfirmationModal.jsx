import React from "react";
import styled from "styled-components";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);

    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }

    return `${basePixelSize * em * factor}px`;
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
    cursor: pointer;
`;

const ModalBody = styled.div`
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const ConfirmButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#e53e3e' : '#e53e3e')};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const CancelButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? 'grey' : 'grey')};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Modal = ({ title, children, onConfirm, onCancel, darkMode, fontSize }) => (
    <ModalOverlay>
        <ModalContent darkMode={darkMode} fontSize={fontSize}>
            <ModalHeader>
                <ModalTitle darkMode={darkMode} fontSize={fontSize}>{title}</ModalTitle>
                <CloseButton darkMode={darkMode} fontSize={fontSize} onClick={onCancel}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody darkMode={darkMode} fontSize={fontSize}>{children}</ModalBody>
            <ModalFooter>
                <CancelButton darkMode={darkMode} fontSize={fontSize} onClick={onCancel}>Cancel</CancelButton>
                <ConfirmButton darkMode={darkMode} fontSize={fontSize} onClick={onConfirm}>Confirm</ConfirmButton>
            </ModalFooter>
        </ModalContent>
    </ModalOverlay>
);

export default Modal;
