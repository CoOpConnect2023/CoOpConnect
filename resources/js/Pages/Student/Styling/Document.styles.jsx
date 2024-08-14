import styled, { keyframes } from "styled-components";

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

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

// Main Container
export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-top: 0;
    animation: ${fadeIn} 0.8s ease-in-out;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

// Section
export const Section = styled.section`
    justify-content: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 80px 35px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 20px;
        margin-top: 20px;
    }
`;

// DropZoneWrapper
export const DropZoneWrapper = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }
`;

// DropZoneContainer
export const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`;

// DropZone
export const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed ${({ darkMode }) => (darkMode ? '#555' : '#6b538c')};
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#eddcff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    font-size: ${({ fontSize }) => calculateFontSize(23, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};
    line-height: 40px;
    padding: 40px;

    @media (max-width: 991px) {
        padding: 20px;
        font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    }
`;

// DropZoneText
export const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        margin: 0 8px;
    }
`;

// DropZoneDescription
export const DropZoneDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    align-self: center;
    margin-top: 10px;
    font: bold ${({ fontSize }) => calculateFontSize(28, fontSize)} Poppins, sans-serif;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

// PreviewImage
export const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;

    @media (max-width: 991px) {
        width: 80px;
        height: 80px;
    }
`;

// UploadButton
export const UploadButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#B7A1E5' : '#6C4BCF')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 8px 16px;
    }
`;

// DocumentWrapper
export const DocumentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 991px) {
        gap: 10px;
    }
`;

// DocumentItem
export const DocumentItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f9f9f9')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    text-align: center;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    max-width: 100%;
    min-width: 100%;

    @media (max-width: 991px) {
        flex-direction: column;
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

// ButtonContainer
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

// PreviewImageDownload
export const PreviewImageDownload = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 10px;

    @media (max-width: 991px) {
        width: 80px;
        height: 80px;
    }
`;

// DownloadButton
export const DownloadButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#EDDCFF')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    height: 3vh;
    margin-left: 0.5vh;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

    @media (max-width: 991px) {
        padding: 4px 8px;
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

// DeleteButton
export const DeleteButton = styled.button`
    background-color: #ff0000;
    transition: background-color 0.5s ease, color 0.5s ease;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    height: 3vh;
    margin-left: 0.5vh;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    margin-top: 0.5vh;

    @media (max-width: 991px) {
        padding: 4px 8px;
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

// MessageContainer
export const MessageContainer = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#f0f0f0')};
    transition: background-color 0.5s ease, color 0.5s ease;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ccc')};
    padding: 20px;
    margin-top: 20px;

    @media (max-width: 991px) {
        padding: 15px;
    }
`;

// Message
export const Message = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    text-align: center;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    }
`;

// FileContainer
export const FileContainer = styled.article`
    display: flex;
    gap: 10px;
    padding: 20px 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    border-radius: 10px;
    transition: transform 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f9f9f9')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};

    &:hover {
        transform: scale(1.01);
    }

    @media (max-width: 991px) {
        flex-direction: column;
        padding: 10px;
    }
`;

// FileIcons
export const FileIcons = styled.div`
    display: flex;
    gap: 20px;
    border-right: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    padding-right: 10px;

    @media (max-width: 991px) {
        border-right: none;
        margin-bottom: 10px;
    }
`;

// FileDetails
export const FileDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

// FileTitle
export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

// FileSize
export const FileSize = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    }
`;

// FileActions
export const FileActions = styled.div`
    display: flex;
    gap: 10px;
    align-self: end;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

// ActionButton
export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ darkMode, outline }) => (outline ? "transparent" : darkMode ? "#6b538c" : "#6b538c")};
    color: ${({ outline }) => (outline ? "#6b538c" : "#fff")};
    border: ${({ outline }) => (outline ? "1px solid #6b538c" : "none")};
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
`;
