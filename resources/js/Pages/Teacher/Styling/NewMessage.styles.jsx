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

export const Div4 = styled.div`
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    transition: background-color 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? "#2c2c2c" : "#FEF7FF")};
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div5 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#773dc3")};
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-radius: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)}; /* Apply font size */
    font-weight: 600;
    line-height: 133%;
    font-family: Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div6 = styled.div`
    align-items: center;
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    display: flex;
    margin-top: 10px;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const Div7 = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: flex-start;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div8 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    letter-spacing: 0.5px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    font-weight: 500;
    line-height: 150%;
    font-family: Poppins, sans-serif;
`;

export const Div9 = styled.div`
    width: 100%;
    color: ${({ darkMode }) => (darkMode ? "#260e44" : "#260e44")};
    letter-spacing: 0.25px;
    margin: auto 0;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
    line-height: 143%;
    font-family: Poppins, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
  box-sizing: border-box;
`;

export const Div10 = styled.div`
    justify-content: center;
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    padding: 10px 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div11 = styled.div`
    display: flex;
    width: 100%;
    padding-right: 20px;
    gap: 10px;
    justify-content: space-between;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div12 = styled.div`
    display: flex;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
    color: ${({ darkMode }) => (darkMode ? "#7b757f" : "#7b757f")};
    font-weight: 600;
    width: 100%;
    letter-spacing: 0.25px;
    line-height: 143%;
`;

export const Img = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
`;

export const Div13 = styled.div`
    font-family: Poppins, sans-serif;
    margin: auto 0;
    width: 100%;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div14 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
`;

export const SendButton = styled.button`
    padding: 10px 15px;
    background-color: #B7A1E5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledMessage = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#260e44" : "#260e44")};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
`;
