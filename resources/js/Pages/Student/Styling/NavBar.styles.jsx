import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navButtonLightBackground, navDarkBackground, navLightBackground } from '@/Layouts/Global.styles';


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number

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
// Keyframes for vibration animation
const vibration = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  50% { transform: translateX(1px); }
  75% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
`;
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const getAnimation = (isOpen) => css`
  animation: ${isOpen ? slideIn : slideOut} 0.3s ease-out forwards;
`;

const getFontSize = (size) => {
    switch (size) {
        case 'small':
            return '1em';
        case 'medium':
            return '1.07em';
        case 'large':
            return '1.12em';
        default:
            return '1em';
    }
};

export const AppContainer = styled.div`
  display: flex;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "var(--Schemes-Background, #fff7ff)")};
  gap: 0px;
transition: background-color 0.5s ease, color 0.5s ease;
  flex-direction: row;


  @media (max-width: 991px) {
    flex-direction: column;
    width: 100vw;
    margin: 0 auto; /* Center the content */

  }
`;

export const NavContainer = styled.nav`
  align-items: center;
  border: 1px solid rgba(123, 117, 127, 1);
transition: background-color 0.5s ease, color 0.5s ease;
  background-color: ${({ darkMode }) => (darkMode ? navDarkBackground : navLightBackground)};
  display: flex;
  flex-direction: column;
  width: 90px;
  padding: 30px 20px 20px;
  border-radius: 0 10px 10px 0;
  height: 100vh;
  z-index: 1000;

  @media (max-width: 991px) {
    align-items: center;
    display: flex;
    width: 100vw;
    height: 12vh;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid rgba(123, 117, 127, 1);
    flex-direction: row;
    justify-content: space-around;
    padding 10px;
    margin-bottom: 1vh;

  }
`;

export const Logo = styled.img`
  aspect-ratio: 1.25;
  object-fit: auto;
  width: 50px;

  @media (max-width: 991px) {
    width: 40px;
  }
`;

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#fff" : "rgba(0, 0, 0, 0.1)")}; /* White border for dark mode */
  background-color: ${({ darkMode, active }) =>
    darkMode
      ? active
        ? "rgba(255, 255, 255, 0.32)"
        : "transparent"
      : active
      ? "rgba(0, 0, 0, 0.15)"
      : "transparent"}; /* White background for dark mode when active */
  box-shadow: ${({ active }) => (active ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none")};
  transform: ${({ active }) => (active ? "translateX(5px)" : "none")};
  margin-top: 30px;
  cursor: pointer;

  @media (max-width: 991px) {
    width: auto;
    height: auto;
    margin-top: 0;
    padding: 5px;
   background-color: ${({ darkMode, active }) =>
    darkMode
      ? active
        ? "rgba(255, 255, 255, 0.32)"
        : "transparent"
      : active
      ? "rgba(0, 0, 0, 0.15)"
      : "transparent"};
`;

export const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 30px;

  @media (max-width: 991px) {
    width: 24px;
  }
`;

export const Divider = styled.hr`
  border: 1px solid #000;
  margin-top: 29px;
  align-self: stretch;

  @media (max-width: 991px) {
    display: none;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 40px;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: row;
    justify-content: space-between;

  }
`;

export const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, opacity 0.3s ease;

  // Apply slide-in animation when isOpen prop is true
  ${(props) =>
    css`
      animation: ${slideInFromRight} 0.5s ease-out;
    `}

  @media (max-width: 991px) {
justify-content: space-around;
gap: none;
    width: 100%;
    align-items: center;

  }
`;

export const RightAlignedItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    justify-content: flex-end;
    width: 100%;
  }
`;

export const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};
  font: 600 36px/122% Poppins, sans-serif;

  @media (max-width: 991px) {
    display: none;

  }

`;

export const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
 color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};
  background-color: ${({ darkMode }) => (darkMode ? navDarkBackground : navButtonLightBackground)};
  border: 2px solid ${({ darkMode }) => (darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: transform 0.5s ease;



  &:hover {
    transform: scale(1.05);
  }

  svg {
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#6B538C")};
    font-size: 20px;
  }

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

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    svg {
      font-size: 18px;
    }
    &::after {
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    svg {
      font-size: 16px;
    }
    &::after {
      width: 6px;
      height: 6px;
    }
  }

  @media (min-width: 1024px) {
    width: 45px;
    height: 45px;
    svg {
      font-size: 22px;
    }
    &::after {
      width: 12px;
      height: 12px;
    }
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
  border: 2px solid ${({ darkMode }) => (darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)')};
  background-color: ${({ darkMode }) => (darkMode ? navDarkBackground : navButtonLightBackground)};
  padding: 5px 10px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 4px 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    padding: 3px 6px;
  }

  @media (min-width: 1024px) {
    gap: 12px;
    padding: 6px 12px;
  }
`;


export const Avatar = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 30px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 26px; /* Adjust width for smaller screens */
  }

  @media (max-width: 480px) {
    width: 22px; /* Further adjust width for very small screens */
  }

  @media (min-width: 1024px) {
    width: 34px; /* Increase width for larger screens */
  }
`;


export const ExpandIcon = styled(FontAwesomeIcon)`
  font-size: ${({ fontSize }) => fontSize || "24px"};
  margin: auto 0;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  cursor: pointer;
  transition: transform 0.3s ease;

  /* Start with the icon rotated -90deg to face left, rotate to 0deg to face down */
  transform: ${({ isOpen }) =>
    isOpen ? "rotate(0deg)" : "rotate(+90deg)"};

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => fontSize || "20px"};
  }

  @media (max-width: 480px) {
    font-size: ${({ fontSize }) => fontSize || "18px"};
  }

  @media (min-width: 1024px) {
    font-size: ${({ fontSize }) => fontSize || "28px"};
  }
`;


export const FontSizer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: ${({ darkMode }) => (darkMode ? "#fff" : "#6B538C")};
  border-radius: 50px;
  border: 2px solid ${({ darkMode }) => (darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)')};
  background-color: ${({ darkMode }) => (darkMode ? navDarkBackground : navButtonLightBackground)};
  height: 40px;
  padding: 0 20px; /* Added padding to give some horizontal spacing */

  @media (max-width: 768px) {
    gap: 8px; /* Reduce gap on smaller screens */
    height: 35px; /* Adjust height for smaller screens */
    padding: 0 15px; /* Adjust padding for smaller screens */
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }

  @media (max-width: 480px) {
    gap: 6px; /* Further reduce gap on very small screens */
    height: 30px; /* Further adjust height for very small screens */
    padding: 0 10px; /* Further adjust padding for very small screens */
    font-size: 0.8rem; /* Further adjust font size for very small screens */
  }

  @media (min-width: 1024px) {
    gap: 12px; /* Increase gap on larger screens */
    height: 45px; /* Increase height on larger screens */
    padding: 0 25px; /* Increase padding on larger screens */
    font-size: 1rem; /* Adjust font size for larger screens */
  }
`;


export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

export const Modal = styled.div`
  position: absolute;
  top: 60px;
  right: 5px;


  border-radius: 5px;
opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;

 transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  font-size: ${({ fontSize }) => getFontSize(fontSize)};

   @media (max-width: 768px) {

   top: 170px;
    right: 5px;

  }
`;

export const NotificationModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 80px; /* Adjusted to move the modal slightly lower */
  right: 0;



  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  max-height: 80vh;
  max-width: 60%;
  overflow-y: auto;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
 animation: ${({ isOpen }) => (isOpen ? slideInFromRight : slideOut)} 0.3s ease-out forwards;
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (min-width: 700px) {

  }
`;

export const NotificationModalContent = styled.ul`
  list-style: none;
  margin: 0;

  padding: 20px;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#2C2C2C")};
`;

export const Conversation = styled.div`
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "#fafafa")};
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const ConversationInfo = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#2C2C2C")};
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const Message = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? "#4c4c4c" : "#fff")};
  border: 1px solid #e0e0e0;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "black")};
  border-radius: 5px;
  padding: 10px;

  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: ${navDarkBackground};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};

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
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#2C2C2C")};
`;

export const ModalItem = styled.div`
  padding: 12px 18px;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "black")};
  border: 2px solid ${({ darkMode }) => (darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)')};
  text-decoration: none;
  margin-top: 5px;
  text-align: center;
  display: block;
  width: 100%;
  border-radius: 8px;
  background: ${({ darkMode }) => darkMode ? "linear-gradient(45deg, #6B538C, #9C85D8)" : "linear-gradient(45deg, #D3BDF2, #EDDCFF)"};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }
`;

export const NoNotificationsMessage = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? '#4F4F4F' : '#F0F0F0')}; /* Darker background for dark mode, lighter for light mode */
  color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#000000')}; /* Text color based on mode */
  padding: 20px; /* Add padding for better spacing */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text */
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  margin: 20px 0; /* Add some margin to separate it from other content */
`;


export const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5); }
  100% { transform: scale(1); opacity: 1; }
`;

export const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  animation: ${pulse} 1s infinite;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const DotContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60px;
`;

export const LoadingContainer = () => (
  <DotContainer>
    <Dot />
    <Dot />
    <Dot />
  </DotContainer>
);

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const BouncingDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  animation: ${bounce} 0.6s infinite alternate;
  margin: 0 5px;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

const BouncingLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const LoadingDot = () => (
  <BouncingLoader>
    <BouncingDot />
    <BouncingDot />
    <BouncingDot />
  </BouncingLoader>
);

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  transform: translateY(${({ isVisible }) => (isVisible ? "0%" : "100%")});
  z-index: 999;
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};
  background-color: ${({ darkMode }) => (darkMode ? "#2C2C2C" : "#FFF")};
  font: 600 36px/122% Poppins, sans-serif;
  font: 600 36px/122% Poppins, sans-serif;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};
  font-size: ${({ fontSize }) => getFontSize(fontSize)};

  &:hover {
    color: #ff0000; // Optional: Change color on hover
  }
`;
export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  z-index: 1000;
  transition: opacity 0.3s ease;
  font-size: ${({ fontSize }) => getFontSize(fontSize)};

  &:hover {
    background-color: #0056b3;
  }
`;

export const IconContainer = styled.div`
  display: none; // Hide by default
  position: relative;
  width: 40px; // Adjust the size as needed
  height: 40px;
  margin-top: auto; // Push to the bottom
  font-size: ${({ fontSize }) => getFontSize(fontSize)};

  @media (min-width: 992px) {
    display: block; // Show on desktop
  }

  .fa-icon {
    width: 100%;
    height: 100%;

    color: ${({ darkMode }) => (darkMode ? "#fff" : "#6B538C")};

  }
`;
