import styled from "styled-components";









export const AppContainer = styled.div`
  background-color: var(--Schemes-Background, #fff7ff);
  display: flex;
  gap: 0px;
  height: 100vh; /* Ensure it takes the full viewport height */
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export const NavContainer = styled.nav`
  align-items: center;
  border: 1px solid rgba(123, 117, 127, 1);
  background-color: var(--White, #fff);
  display: flex;
  flex-direction: column;
  width: 90px;
  padding: 30px 20px 20px;
  border-radius: 0 10px 10px 0;
  height: 100vh;
  @media (max-width: 991px) {
    display: none;
  }
`;

export const Logo = styled.img`
  aspect-ratio: 1.25;
  object-fit: auto;
  width: 50px;
`;

export const Divider = styled.hr`
  border: 1px solid #000;
  margin-top: 29px;
  align-self: stretch;
`;

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 30px;
`;

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  color: #000;
  font: 600 36px/122% Poppins, sans-serif;
`;

export const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  position: relative;
`;

export const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #EDDCFF;
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  /* Icon styling */
  svg {
    color: white;
    font-size: 20px; /* Adjust icon size */
  }

  /* Indicator for unread messages */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    display: ${(props) => (props.hasUnreadMessages ? "block" : "none")};
  }
`;

export const NotificationBadge = styled.div`
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  margin-right: 5px;
`;

export const UserDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 2px solid rgba(0, 0, 0, 1);
  background-color: var(--Schemes-Primary-Container, #eddcff);
  padding: 5px 10px;
  margin-top: 7px;
`;

export const Avatar = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 30px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 50%;
`;

export const ExpandIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 24px;
  margin: auto 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) =>
        isOpen ? "rotate(-360deg)" : "rotate(-270deg)"}; // Adjusted rotation here
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto; /* Ensure it scrolls if content overflows */
`;

export const Modal = styled.div`
  position: absolute;
  top: 60px; /* Adjust according to your header height */
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 02px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

export const NotificationModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 60px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  max-height: 80vh;
  overflow-y: auto;
`;

export const NotificationModalContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 20px;
`;

export const Conversation = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fafafa;
`;

export const ConversationInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;

`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

   &:not(:last-child) {
    margin-right: 1vw;
  }
`;





export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 80vh;
`;

export const ModalItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(237, 220, 255);
  }
`;

export const NoNotificationsMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #666;
`;

