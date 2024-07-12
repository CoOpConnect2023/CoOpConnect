import styled from 'styled-components';

export const Container = styled.section`
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fdfdfd;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    font-size: 16px;
    color: #1a1919;
    font-weight: 400;
    line-height: 150%;
    height: 40vh;
    width: 100%;
    max-width: 400px; /* Adjust as needed */
`;

export const Title = styled.h2`
    text-align: center;
    color: #6b538c;
    font: 500 24px/133% Poppins, sans-serif;
`;

export const COLORS = ["#006aff", "#52c93f", "#ff2727"];
