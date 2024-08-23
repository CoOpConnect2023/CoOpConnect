import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    gap: 20px;
    flex: 1 0 0;
    border-radius: 20px;

    justify-content: center;
    background-color: ${({ darkMode }) => (darkMode ? "#2c2c2c" : "##FEF7FF")}; /* Lighter background for dark mode */
    transition: background-color 0.5s ease;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100vw;
        align-self: center;
        
    }
`
