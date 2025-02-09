import styled, { keyframes } from "styled-components";
import { navButtonLightBackground, navDarkBackground, navLightBackground, lightTheme, darkTheme } from '@/Layouts/Global.styles';

// Function to calculate font size dynamically
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number
    // If the emValue is exactly "1em", return the base size without modification
    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }
    // Otherwise, apply the amplification factor
    return `${basePixelSize * em * factor}px`;
};

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? darkTheme.colors.background : lightTheme.colors.background)};
    transition: background-color 0.5s ease;
    padding: 20px;
    height: 100%; /* Make sure it stretches to the bottom */
    flex-grow: 1; /* Allow it to grow */
    animation: ${fadeIn} 0.8s ease-in-out;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Content = styled.div`
    gap: 20px;
    display: flex;
    flex-grow: 1; /* Allow it to grow */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 36%;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    margin-left: 0;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    transition: background-color 0.5s ease;
    flex-grow: 1; /* Allow it to grow */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
        max-height: 90vh;
        min-height: 90vh;
        margin-top: 10px;
    }
`;

export const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    flex-grow: 1;
    width: 64%;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
flex-grow: 1;
        margin-left: 0;
        margin-top: 20px;
    }
`;

export const RightColumn = styled.div`
    border-radius: 10px;
    border: 1px solid rgba(123, 117, 127, 1);
     background-color: ${({ darkMode }) => (darkMode ? darkTheme.background : lightTheme.textBlack)};
    transition: background-color 0.5s ease;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Allow it to grow */
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
        max-height: 70vh;
        min-height: 70vh;

    }
`;

export const MessageContainer = styled.div`
    height: 60vh;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        height: auto;
        max-height: 60vh;
    }
`;

export const ScrollableContainer = styled.div`
    overflow-y: auto;
    flex-grow: 1; /* Allow it to grow */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-height: 60vh;
        overflow-y: auto;
    }
`;

export const BackButton = styled.button`
  background-color: ${({ darkMode }) => (darkMode ? lightTheme.colors.button.default : darkTheme.colors.button.default)};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%; /* Make the button take up the full width of the container */
  text-align: center;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? lightTheme.colors.button.hover : darkTheme.colors.button.hover)};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
