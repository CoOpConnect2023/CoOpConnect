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
    height: 100vh; /* Full height of viewport */
     animation: ${slideInFromSide} 0.5s ease-out;
`;

export const Section = styled.section`
    flex: 1; /* Grow to fill remaining space */
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    overflow-y: auto; /* Enable scrolling within this section */
`;

export const SectionTitle = styled.h1`
    color: var(--Schemes-Primary, #6b538c);
    font: 500 24px/133% Poppins, sans-serif;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border-radius: 10px;
    border: 1px solid var(--gray-200, #e2e8f0);
    background: var(--white, #fff);
    th, td {
        padding: 12px;
        border-bottom: 1px solid var(--gray-200, #e2e8f0);
        color: var(--gray-700, #2d3748);
    }
    th {
        color: var(--gray-600, #4a5568);
    }
`;

export const FormContainer = styled.div`
    position: sticky;
    bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-top: auto; /* Push to the bottom of the container */
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid var(--gray-300, #cbd5e0);
    border-radius: 6px;
    font-size: 16px;
    font-family: Poppins, sans-serif;
`;

export const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px; /* Added margin to separate buttons */
    border: none;
    border-radius: 6px;
    background-color: var(--Schemes-Primary, #6b538c);
    color: #fff;
    font-size: 16px;
    font-family: Poppins, sans-serif;
    cursor: pointer;
    &:hover {
        background-color: #543e6c;
    }
`;

export const DeleteButton = styled(Button)`
    background-color: #e53e3e; /* Red color for delete button */
    &:hover {
        background-color: #c53030; /* Darker red on hover */
    }
`;
