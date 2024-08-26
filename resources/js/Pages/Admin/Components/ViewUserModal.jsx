import React from 'react';
import styled from 'styled-components';

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

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
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : 'white')};
  color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#000')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const UserModal = ({ isOpen, onClose, user, fontSize, darkMode }) => {
  if (!isOpen) return null;

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent fontSize={fontSize} darkMode={darkMode} onClick={(e) => e.stopPropagation()}>
        {user.name && <h2>{user.name}</h2>}
        {user.email && <p><strong>Email:</strong> {user.email}</p>}
        {user.contactEmail && <p><strong>Email:</strong> {user.contactEmail}</p>}
        {user.school_id && <p><strong>School ID:</strong> {user.school_id}</p>}
        {user.teacherID && <p><strong>Teacher ID:</strong> {user.teacherID}</p>}
        {user.schoolID && <p><strong>School ID:</strong> {user.schoolID}</p>}
        {user.startDate && <p><strong>Start Date:</strong> {user.startDate}</p>}
        {user.endDate && <p><strong>End Date:</strong> {user.endDate}</p>}
        {user.created_at && <p><strong>Created:</strong> {user.created_at}</p>}
        {user.updated_at && <p><strong>Updated:</strong> {user.updated_at}</p>}
        {user.status && <p><strong>Status:</strong> {user.status}</p>}
        {user.role && <p><strong>Role:</strong> {user.role}</p>}
        {user.company && <p><strong>Company:</strong> {user.company}</p>}
        {user.description && <p><strong>Description:</strong> {user.description}</p>}
        {user.contactPhone && <p><strong>Phone:</strong> {user.contactPhone}</p>}
        {user.principalName && <p><strong>Principal Name:</strong> {user.principalName}</p>}
        {/* Add more conditionally rendered details as needed */}
      </ModalContent>
    </ModalContainer>
  );
};

export default UserModal;
