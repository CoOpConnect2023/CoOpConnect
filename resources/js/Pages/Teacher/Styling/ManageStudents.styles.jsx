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
  flex-grow: 1;
  max-height: 87.25vh;
  border-radius: 10px;
  background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
  transition: background-color 0.3s;
  border-color: rgba(123, 117, 127, 1);
  border-style: solid;
  border-width: 1px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Section = styled.section`
  flex-grow: 1; /* Grow to fill remaining space */
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-height: 50vh; /* Default max height for medium screens */
  overflow-y: auto;
  gap: 20px;
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

  @media (min-width: 1025px) {
    max-height: 60vh; /* Set max height for screens larger than 1024px */
  }

  @media (max-width: 1024px) {
    max-height: 50vh; /* Adjust for medium screens */
  }

  @media (max-width: 768px) {
    max-height: 40vh; /* Adjust for smaller screens */
  }

  @media (max-width: 480px) {
    max-height: 30vh; /* Adjust for very small screens */
  }
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
  border-radius: 10px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
  background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
  transition: background-color 0.3s, border-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};


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

  tbody {
    max-height: 300px; /* Adjust as needed */
    overflow-y: auto; /* Enable scrolling */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  margin-top: 20px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Input = styled.input`
  padding: ${({ fontSize }) => calculateFontSize(8, fontSize)};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#666666" : "#cbd5e0")};
  border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#4F4F4F" : "#fff")}; /* White background in dark mode */
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")}; /* Black text in dark mode */
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  font-family: Poppins, sans-serif;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;


export const Select = styled.select`
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
  padding: ${({ fontSize }) => calculateFontSize(10, fontSize)} ${({ fontSize }) => calculateFontSize(20, fontSize)};
  margin-right: ${({ fontSize }) => calculateFontSize(10, fontSize)}; /* Added margin to separate buttons */
  border: none;
  border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
  color: #fff;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  cursor: pointer;
  transition: background-color 0.3s, padding 0.3s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#6b538c" : "#543e6c")};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${({ darkMode }) => (darkMode ? "#FF6B6B" : "#f56565")}; /* Override delete button color */
  border-radius: ${({ fontSize }) => calculateFontSize(8, fontSize)};

  padding: 8px;
`;

export const FixedBottom = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Label = styled.label`
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")}; /* Light color in dark mode, dark color otherwise */
  font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
  font-family: Poppins, sans-serif;
  transition: color 0.3s;
`;

