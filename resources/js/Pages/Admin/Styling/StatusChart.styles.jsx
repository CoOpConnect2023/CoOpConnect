import styled from 'styled-components';
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};
export const Container = styled.section`
    border: 1px solid ${({ darkMode }) => (darkMode ? 'white' : '#ddd')};
    border-radius: 10px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : 'white')};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : 'white')};
    font-weight: 400;
    line-height: 150%;
    height: 40vh;
    width: 100%;
    max-width: 400px; /* Adjust as needed */
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }
    @media (max-width: 768px) {
        padding: 16px;
        font-size: 14px;
    }
`;
export const Title = styled.h2`
    text-align: center;
    color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
    font: 500 24px/133% Poppins, sans-serif;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;
export const COLORS = ["#006AFF", "#52C93F", "#FF2727"];
