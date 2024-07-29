import styled from "styled-components";




export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full height of viewport */
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
    padding: 10px;
    border: 1px solid var(--gray-300, #cbd5e0);
    border-radius: 6px;
    font-size: 16px;
    font-family: Poppins, sans-serif;
`;

export const Select = styled.select`
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
`;

export const DeleteButton = styled(Button)`
    background-color: #f56565; /* Override delete button color */
`;

export const FixedBottom = styled.div`
    position: sticky;
    bottom: 0;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);
`;
