import styled from "styled-components";


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);

    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }

    return `${basePixelSize * em * factor}px`;
};

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px; /* Reduced margin */
    align-items: ${({ isCurrentUser }) =>
        isCurrentUser ? "flex-end" : "flex-start"};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
`;

export const Message = styled.div`
    border-radius: ${({ isCurrentUser }) =>
        isCurrentUser ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
    background-color: ${({ isCurrentUser }) =>
        isCurrentUser ? "#6b538c" : "#7c4e7e"};
    color: #fff;
    justify-content: center;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Apply font size */
    line-height: 150%;
    font-family: Poppins, sans-serif;
    margin-top: 5px; /* Reduced margin */
    width: fit-content;
`;

export const Timestamp = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#773dc3")};
    margin-top: 5px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)}; /* Apply font size */
    line-height: 133%;
    font-family: Poppins, sans-serif;
    width: fit-content;
    margin-bottom: 5px; /* Reduced margin */
`;
