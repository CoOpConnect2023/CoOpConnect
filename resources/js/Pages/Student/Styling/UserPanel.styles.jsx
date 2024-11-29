import styled from "styled-components";

// Function to calculate font size dynamically
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number
    // If the emValue is exactly "1em", return the base size without modification
    if (emValue === '1em') {
        return `${basePixelSize * em * 1.2}px`;
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

export const Div70 = styled.div`
    justify-content: space-between;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

export const Div71 = styled.div`
    justify-content: center;
    display: flex;
    gap: 20px;
    white-space: nowrap;
    line-height: 133%;
    padding: 5px 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const Img12 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 70px;
    border-radius: 35px;

`;

export const Div72 = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const Div73 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)}; /* Apply font size */
    font-weight: 600;
    font-family: Poppins, sans-serif;
`;

export const Div74 = styled.div`
    justify-content: center;
    display: flex;
    margin-top: 10px;
    gap: 5px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)}; /* Apply font size */
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 400;
    letter-spacing: 0.4px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const Div75 = styled.div`
    background-color: #55e685;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: auto 0;
`;

export const Div76 = styled.div`
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Div77 = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 20px;
    margin: auto 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Img13 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 30px;
    align-self: stretch;
`;

export const Img14 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
`;

export const Img15 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
`;
