import React from 'react';
import styled from 'styled-components';
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const UserModal = ({ isOpen, onClose, user, fontSize, darkMode }) => {
  if (!isOpen) return null;
  return (
    <ModalContainer fontSize={fontSize} darkMode={darkMode} onClick={onClose}>
      <ModalContent fontSize={fontSize} darkMode={darkMode} onClick={(e) => e.stopPropagation()}>
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>SchoolID:</strong> {user.school_id}</p>
        <p><strong>Created:</strong> {user.created_at}</p>
        <p><strong>Updated:</strong> {user.updated_at}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Description:</strong> {user.description}</p>
        {/* Add more details as needed */}
      </ModalContent>
    </ModalContainer>
  );
};
export default UserModal;
