import styled, { keyframes } from 'styled-components';

// Animation for the modal appearance
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Modal Overlay (background dimming)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);  /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;  /* High z-index to ensure it's on top */
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// Modal Container with off-white background
export const Modal = styled.div`
  position: fixed;
  top: 50%;  /* Align vertically */
  left: 50%;  /* Align horizontally */
  transform: translate(-50%, -50%);  /* Shift it back by 50% to perfectly center */
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#F8F8F8')}; /* Off-white background */
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  z-index: 1000;  /* Ensure it stays above other elements */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
`;

// Modal Header with purple title
export const ModalHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};  /* Purple color for title */
`;

// Modal Body
export const ModalBody = styled.div`
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  margin-bottom: 20px;
  color: ${({ darkMode }) => (darkMode ? '#ddd' : '#555')};
`;

// Input Fields
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#ccc')};
  background-color: ${({ darkMode }) => (darkMode ? '#555' : '#fff')};
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
  font-size: ${({ fontSize }) => fontSize || '1rem'};

  &:focus {
    outline: none;
    border-color: ${({ darkMode }) => (darkMode ? '#999' : '#6b538c')};  /* Highlight on focus */
  }
`;

// Modal Footer
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? '#A785D9' : '#5a4374')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${({ darkMode }) => (darkMode ? '#ff0000' : '#ff0000')};

&:hover {
  background-color: ${({ darkMode }) => (darkMode ? '#cc0000' : '#cc0000')};
}

`;


export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ccc')};
  border-radius: 4px;
  background-color: ${({ darkMode }) => (darkMode ? '#555' : '#fff')};
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  outline: none;

  &:focus {
    border-color: ${({ darkMode }) => (darkMode ? '#bbb' : '#888')};
  }
`;
