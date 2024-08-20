import styled, { keyframes } from "styled-components";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
export const Wrapper = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
    animation: ${fadeIn} 0.8s ease-in-out;

    transition: background-color 0.5s;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 480px) {
        padding: 10px;
        min-height: 80vh;
    }
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    gap: 20px;

    @media (max-width: 991px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export const FileSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 70%;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    padding: 20px 0px;
    border-radius: 10px;
    background: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 0;
        width: 100%;
    }

    @media (max-width: 480px) {
        padding: 10px 5px;
    }
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};

    @media (max-width: 480px) {
        margin-bottom: 20px;
    }
`;

export const TabList = styled.nav`
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#000')};
    border-radius: 6px;
    padding: 5px 10px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 500;
    color: ${({ darkMode }) => (darkMode ? '#cfcfcf' : '#334155')};

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        padding: 5px;
    }
`;

export const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;

    &.active {
        border-bottom: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#0f172a')};
    }

    @media (max-width: 480px) {
        padding: 6px 10px;
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 80px;
    max-height: 70vh; /* Set a maximum height */
    overflow-y: auto; /* Enable vertical scrolling */

    @media (max-width: 991px) {
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        max-height: 60vh; /* Adjust height for smaller screens */
    }

    @media (max-width: 480px) {
        padding: 0 10px;
        max-height: 50vh; /* Further adjust height for mobile */
    }
`;

export const FileContainer = styled.article`
    display: flex;
    justify-content: space-between; /* Ensure space between items */
    align-items: center; /* Vertically center the items */
    gap: 10px;
    padding: 20px 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    border-radius: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.01);
    }

    @media (max-width: 991px) {
        flex-wrap: wrap;
        max-height: 10vh;
    }

    @media (max-width: 768px) {
        padding: 15px 8px;
        flex-direction: column;
        align-items: center;
    }

    @media (max-width: 480px) {
        padding: 10px 5px;
        gap: 5px;
        border-radius: 5px;
    }
`;

export const FileIcons = styled.div`
    display: flex;
    gap: 20px;
    border-right: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    padding-right: 10px;

    @media (max-width: 768px) {
        gap: 10px;
        border-right: none;
        padding-right: 0;
    }

    @media (max-width: 480px) {
        gap: 8px;
    }
`;

export const FileDetails = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1; /* Allow it to take available space */
    gap: 10px;

    @media (max-width: 768px) {
        align-items: center;
        gap: 5px;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        gap: 3px;
    }
`;

export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#000')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

export const FileSize = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#7b757f')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    }
`;

export const FileActions = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end; /* Align actions to the far right */
    align-self: flex-start; /* Align with the start of the content */

    @media (max-width: 768px) {
        gap: 5px;
        align-self: center;
    }

    @media (max-width: 480px) {
        justify-content: center;
    }
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ outline, darkMode }) => (outline ? "transparent" : darkMode ? "#773dc3" : "#6b538c")};
    transition: background-color 0.5s;
    color: ${({ outline, darkMode }) => (outline ? (darkMode ? "#773dc3" : "#6b538c") : "#fff")};
    border: ${({ outline, darkMode }) => (outline ? `1px solid ${darkMode ? "#773dc3" : "#6b538c"}` : "none")};
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 14px;
    }

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
        padding: 4px 8px;
    }

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
        padding: 3px 6px;
    }
`;

export const FormSection = styled.section`
    display: flex;
    width: 30%;
    height: 100%;
    flex-direction: column;

border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
border-radius: 10px;
    @media (max-width: 991px) {
        width: 100%;
        padding: 0;
    }

    @media (max-width: 480px) {
        padding: 0 10px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 30px;
    height: 100%;
    border-radius: 10px;
    background: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};

    @media (max-width: 480px) {
        padding: 20px;
    }
`;

export const Title = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const Label = styled.label`
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

export const Input = styled.input`
    height: 48px;
    margin-top: 8px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    border-radius: 6px;
    background: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    padding: 12px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
        background-color: ${({ darkMode }) => (darkMode ? '#444' : '#f3e8ff')};
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 8px;
    }
`;

export const FileDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 22px 40px;
    margin-top: 10px;
    border: 2px dashed ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    border-radius: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#eddcff')};
    transition: background-color 0.5s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 600;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};

    @media (max-width: 991px) {
        padding: 20px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`;

export const DropText = styled.p`
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};

    @media (max-width: 480px) {
        margin-top: 5px;
    }
`;

export const FileTypes = styled.p`
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#7b757f')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(8, fontSize)};
        margin-top: 5px;
    }
`;

export const SecurityNote = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
        margin-top: 5px;
    }
`;

export const SubmitButton = styled.button`
    align-self: center;
    margin-top: 40px;
    padding: 10px 24px;
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    font-weight: 600;
    color: #fff;
    background: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    transition: background-color 0.5s;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.04);
    }

    @media (max-width: 991px) {
        padding: 20px;
    }

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    }
`;

export const DropZoneWrapper = styled.div`
    gap: 20px;
    display: flex;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;

export const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }

    @media (max-width: 480px) {
        margin-top: 10px;
    }
`;

export const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed ${({ darkMode }) => (darkMode ? '#773dc3' : 'rgba(107, 83, 140, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#eddcff')};
    transition: background-color 0.5s;
    font-size: ${({ fontSize }) => calculateFontSize(23, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#000')};
    line-height: 40px;
    padding: 40px;

    @media (max-width: 991px) {
        padding: 0 20px;
    }

    @media (max-width: 480px) {
        padding: 20px;
    }
`;

export const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};

    @media (max-width: 991px) {
        margin: 0 8px;
    }
`;

export const DropZoneDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    align-self: center;
    margin-top: 10px;
    font: bold 28px Poppins, sans-serif;

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#edf0f7')};

    @media (max-width: 480px) {
        width: 80px;
        height: 80px;
    }
`;
