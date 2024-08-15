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

export const Div15 = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: ${({ darkMode }) => (darkMode ? "#2c2c2c" : "#FEF7FF")};
    transition: background-color 0.5s ease, color 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease;

    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px 10px 0;
    flex-grow: 1; /* Allow it to grow and fill the remaining space */
    height: 100%; /* Ensure it stretches to the bottom */

    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div16 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#773dc3")};
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)}; /* Apply font size */
    font-weight: 600;
    line-height: 133%;
    font-family: Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div17 = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */

    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

export const Div18 = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)}; /* Apply font size */
    line-height: 133%;
    flex: 1;
    overflow-y: auto;
    height: 50vh;
`;

export const Div19 = styled.div`
    justify-content: center;
    border-color: rgba(0, 0, 0, 1);
    border-style: solid;
    border-bottom-width: 1px;
    display: flex;
    gap: 10px;
    padding: 10px 5px;
    transition: background-color 0.3s ease;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)")};
    }
`;

export const Img4 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 50px;


    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const Div20 = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: auto 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div21 = styled.div`
    justify-content: space-between;
    display: flex;
    gap: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div22 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#1d1a20")};
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div23 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#7b757f")};
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div24 = styled.div`
    max-width: 300px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#7b757f")};
    text-overflow: ellipsis;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    letter-spacing: 0.4px;
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Apply font size */
`;

export const Div67 = styled.div`
    padding-bottom: 80px;
    border-radius: 100px;
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */

    &:hover {
        background-color: #d8c5f0;
        transform: translateY(-5px);
    }
`;

export const Div68 = styled.div`
    border-radius: 100px;
    background-color: var(--Schemes-Primary, #6b538c);
    height: 33px;
    transition: background-color 0.3s ease;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */

    &:hover {
        background-color: #5a4175;
    }
`;
