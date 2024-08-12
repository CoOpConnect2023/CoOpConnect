import styled from "styled-components";

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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div98 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: ${({ darkMode }) => (darkMode ? "#1f1f1f" : "#f9f9f9")};
    border: 1px solid #ddd;
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    gap: 10px;
    padding: 10px 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div99 = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 143%;
`;

export const Div100 = styled.div`
    flex-grow: 1;
    font-family: Poppins, sans-serif;
    margin: auto 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
    background-color: #fff;
    border: 1px solid #ccc;
`;

export const Div101 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const SendButton = styled.button`
    padding: 10px 15px;
    background-color: #B6A1E5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */

    &:hover {
        background-color: #0056b3;
    }
`;
