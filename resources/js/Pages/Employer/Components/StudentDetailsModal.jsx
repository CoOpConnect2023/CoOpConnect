import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #c0392b;
  }
`;

const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>Close</CloseButton>
        <h2>Student Details</h2>
        <p><strong>Name:</strong> {student.user.name}</p>
        <p><strong>Email:</strong> {student.user.email}</p>
        <p><strong>Pronouns:</strong> {student.user.pronouns || 'Not specified'}</p>
        <p><strong>School:</strong> {student.user.school.name || 'Not specified'}</p>
        <p><strong>School Email:</strong> {student.user.school.email || 'Not specified'}</p>
        <p><strong>School Location:</strong> {student.user.school.location || 'Not specified'}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudentDetailsModal;
