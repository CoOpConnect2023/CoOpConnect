import styled, { keyframes } from "styled-components";

// Function to multiply the base font size by an em value with optional factor adjustment
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

// Define the keyframes for the slide-in animations
const slideInFromSide = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Full height of viewport */
  background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
padding: 10px;
   @media (max-width: 768px) {
    min-height: 80vh; /* Adjust for smaller screens */
  }

`;

export const Section = styled.section`
  flex: 1; /* Grow to fill remaining space */
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  display: flex;
  flex-direction: column;
  padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  gap: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  overflow-y: auto; /* Enable scrolling within this section */
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const SectionTitle = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  font: 500 ${({ fontSize }) => calculateFontSize(24, fontSize)} Poppins, sans-serif;
  transition: color 0.3s;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  border-radius: ${({ fontSize }) => calculateFontSize(10, fontSize)};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
  background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  transition: background-color 0.3s, border-color 0.3s;

  th, td {
    padding: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#2d3748")};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
  }

  th {
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#4a5568")};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
  }
`;

export const FormContainer = styled.div`
  position: sticky;
  bottom: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#fff" : "#2D2D2D")};
  padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  border-radius: ${({ fontSize }) => calculateFontSize(10, fontSize)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 0.5vh; /* Push to the bottom of the container */
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  width: 98%;

  align-self: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
   background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Input = styled.input`
  padding: ${({ fontSize }) => calculateFontSize(8, fontSize)};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#666666" : "#cbd5e0")};
  border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  font-family: Poppins, sans-serif;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

export const Button = styled.button`
  padding: ${({ fontSize }) => calculateFontSize(8, fontSize)} ${({ fontSize }) => calculateFontSize(20, fontSize)};
  margin-right: ${({ fontSize }) => calculateFontSize(10, fontSize)}; /* Added margin to separate buttons */
  border: none;
  border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
  color: #fff;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  font-family: Poppins, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s, padding 0.3s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#6b538c" : "#543e6c")};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${({ darkMode }) => (darkMode ? "#FF6B6B" : "#e53e3e")}; /* Red color for delete button */
  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#FF4C4C" : "#c53030")}; /* Darker red on hover */
  }
`;
