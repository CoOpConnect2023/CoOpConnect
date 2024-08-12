import styled, { keyframes } from "styled-components";

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
  border-radius: 10px;
  background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
  transition: background-color 0.3s;
  border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
`;

export const Section = styled.section`
  flex: 1; /* Grow to fill remaining space */
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  overflow-y: auto; /* Enable scrolling within this section */
  transition: background-color 0.3s;
`;

export const SectionTitle = styled.h1`
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  font: 500 24px/133% Poppins, sans-serif;
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

  th, td {
    padding: 12px;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#e2e8f0")};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#2d3748")};
  }

  th {
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#4a5568")};
  }

  tbody {
    max-height: 300px; /* Adjust as needed */
    overflow-y: auto; /* Enable scrolling */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#666666" : "#cbd5e0")};
  border-radius: 6px;
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
  font-size: 16px;
  font-family: Poppins, sans-serif;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#666666" : "#cbd5e0")};
  border-radius: 6px;
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
  font-size: 16px;
  font-family: Poppins, sans-serif;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px; /* Added margin to separate buttons */
  border: none;
  border-radius: 6px;
  background-color: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#6b538c" : "#543e6c")};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${({ darkMode }) => (darkMode ? "#FF6B6B" : "#f56565")}; /* Override delete button color */
`;

export const FixedBottom = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  padding: 20px;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
`;
