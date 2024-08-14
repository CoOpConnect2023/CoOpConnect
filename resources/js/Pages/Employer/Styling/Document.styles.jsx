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
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#ffffff')};
    transition: background-color 0.5s;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
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
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
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
`;

export const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;
    &.active {
        border-bottom: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#0f172a')};
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 80px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const FileContainer = styled.article`
    display: flex;
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
    }
`;

export const FileIcons = styled.div`
    display: flex;
    gap: 20px;
    border-right: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    padding-right: 10px;
`;

export const FileDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`;

export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#000')};
`;

export const FileSize = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#7b757f')};
`;

export const FileActions = styled.div`
    display: flex;
    gap: 10px;
    align-self: end;
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
`;

export const FormSection = styled.section`
    display: flex;
    width: 30%;
    height: 100%;
    flex-direction: column;
    padding: 10px;

    @media (max-width: 991px) {
        width: 100%;
        padding: 0;
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
`;

export const Title = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
`;

export const Label = styled.label`
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
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
`;

export const DropText = styled.p`
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
`;

export const FileTypes = styled.p`
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#7b757f')};
`;

export const SecurityNote = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    margin-top: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
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
`;

export const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#edf0f7')};
`;
