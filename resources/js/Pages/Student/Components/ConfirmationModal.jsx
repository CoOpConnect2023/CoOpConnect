import React from "react";
import styled from "styled-components";

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
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const ModalBody = styled.div`
    margin-bottom: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const ConfirmButton = styled.button`
    background-color: #e53e3e;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const CancelButton = styled.button`
    background-color: grey;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Modal = ({ title, children, onConfirm, onCancel }) => (
    <ModalOverlay>
        <ModalContent>
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton onClick={onCancel}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
            </ModalFooter>
        </ModalContent>
    </ModalOverlay>
);

export default Modal;
