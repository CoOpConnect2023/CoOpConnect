import styled from 'styled-components';

// Modal Overlay
const ModalOverlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

// Modal Container
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: ${({ darkMode }) => (darkMode ? '#2D2D2D' : '#fff')};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) =>
    isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)'};
  transition: opacity 0.3s ease, transform 0.3s ease;
`;

// Modal Content
const ModalContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
`;

// Modal Items
const ModalItem = styled.a`
  font-size: ${({ fontSize }) => fontSize || '1em'};
  text-decoration: none;
  color: inherit;
  padding: 10px 15px;
  border-radius: 5px;
  background: ${({ darkMode }) => (darkMode ? '#444' : '#eee')};
  transition: background 0.3s ease;

  &:hover {
    background: ${({ darkMode }) => (darkMode ? '#666' : '#ccc')};
  }

  &:active {
    background: ${({ darkMode }) => (darkMode ? '#555' : '#bbb')};
  }

  &.button {
    text-align: center;
    cursor: pointer;
  }
`;

// Modal Component
export const NavBarModal = ({ isOpen, fontSize, darkMode, children }) => (
  <ModalOverlay isOpen={isOpen}>
    <ModalContainer isOpen={isOpen} darkMode={darkMode}>
      <ModalContent darkMode={darkMode} fontSize={fontSize}>
        {children}
      </ModalContent>
    </ModalContainer>
  </ModalOverlay>
);

export default function YourComponent({
  isProfileModalOpen,
  fontSize,
  darkMode,
  handleLogout,
}) {
  return (
    <Modal fontSize={fontSize} darkMode={darkMode} isOpen={isProfileModalOpen}>
      <ModalItem
        fontSize={fontSize}
        darkMode={darkMode}
        href="/teacher/profile"
      >
        Profile
      </ModalItem>
      <ModalItem
        fontSize={fontSize}
        darkMode={darkMode}
        href="/teacher/settings"
      >
        Settings
      </ModalItem>
      <ModalItem
        fontSize={fontSize}
        darkMode={darkMode}
        className="button"
        onClick={handleLogout}
      >
        Logout
      </ModalItem>
    </Modal>
  );
}
