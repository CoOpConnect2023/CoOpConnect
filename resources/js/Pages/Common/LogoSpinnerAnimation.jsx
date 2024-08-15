import styled, { keyframes } from "styled-components";
import logo from '../Images/COOPCONNECTLOGO.png';

// Spin animation for the spinner
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

// Pulse animation for the logo
const pulse = keyframes`
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#f0f0f0")}; /* Background color changes based on dark mode */
    color: ${({ darkMode }) => (darkMode ? "#f0f0f0" : "#333")}; /* Text color changes based on dark mode */
`;

const SpinnerContainer = styled.div`
    position: relative;
    width: 30vw;  /* Container size matches the spinner */
    height: 30vw;

`;

const Spinner = styled.div`
    border: 4px solid ${({ darkMode }) => (darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")}; /* Border color changes based on dark mode */
    border-top: 4px solid ${({ darkMode }) => (darkMode ? "#fff" : "#3498db")}; /* Spinner color changes based on dark mode */
    border-radius: 50%;
    width: 100%;  /* Spinner size fills the container */
    height: 100%;
    animation: ${spin} 1s linear infinite;
`;

const Logo = styled.img`
    position: absolute;
    top: 45%;
    left: 28%;
    width: 50%;  /* Logo size is 50% of the spinner */
    height: auto;
    transform: translate(-55%, -50%);  /* Move the logo slightly to the left */
    animation: ${pulse} 2s infinite;
    pointer-events: none;  /* Ensure the logo does not interfere with the spinner's position */
`;

function LogoLoadingComponent({ darkMode }) {
    return (
        <LoadingScreen darkMode={darkMode}>
            <SpinnerContainer>
                <Logo src={logo} alt="Logo" />
                <Spinner darkMode={darkMode} />
            </SpinnerContainer>
        </LoadingScreen>
    );
}

export default LogoLoadingComponent;
