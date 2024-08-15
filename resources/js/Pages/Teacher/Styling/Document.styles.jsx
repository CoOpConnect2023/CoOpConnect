





import styled, { keyframes } from "styled-components";

// Function to multiply the base font size by an em value with optional factor adjustment
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
  const em = parseFloat(emValue); // Convert emValue to a number
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
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;

    padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    animation: ${fadeIn} 0.8s ease-in-out;
    background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
    transition: background-color 0.3s;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    height: 100%;
    @media (max-width: 991px) {
        flex-direction: column;
         min-height: 100vh;

    }
`;

export const FileSection = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
    padding: ${({ fontSize }) => calculateFontSize(20, fontSize)} 0px;
    border-radius: 10px;
    background: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    transition: background-color 0.3s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 0;
        width: 100%;
        

    }
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: ${({ fontSize }) => calculateFontSize(40, fontSize)};
`;

export const TabList = styled.nav`
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#444444" : "#000")};
    border-radius: 6px;
    padding: ${({ fontSize }) => calculateFontSize(5, fontSize)} ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 500;
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#334155")};
    transition: border-color 0.3s, color 0.3s;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

export const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;
    color: ${({ darkMode, active }) => (active ? (darkMode ? "#EDDCFF" : "#0f172a") : (darkMode ? "#CCCCCC" : "#334155"))};
    border-bottom: ${({ active }) => (active ? "2px solid #6b538c" : "none")};
    transition: color 0.3s, border-bottom 0.3s;

    &.active {
        border-bottom: 2px solid #6b538c;
        color: #0f172a;
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    padding: 0 ${({ fontSize }) => calculateFontSize(80, fontSize)};
    flex-grow: 1;

    @media (max-width: 991px) {
        padding: 0 ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const FileContainer = styled.article`
    display: flex;
    gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(20, fontSize)} ${({ fontSize }) => calculateFontSize(10, fontSize)};
    border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#7b757f")};
    border-radius: 10px;
    transition: transform 0.5s ease, border-color 0.3s;
    flex-grow: 1;

    &:hover {
        transform: scale(1.01);
    }

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

export const FileIcons = styled.div`
    display: flex;
    gap: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    border-right: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#7b757f")};
    padding-right: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    transition: border-color 0.3s;
`;

export const FileDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
`;

export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;
`;

export const FileSize = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#7b757f")};
    transition: color 0.3s;
`;

export const FileActions = styled.div`
    display: flex;
    gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    align-self: end;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: ${({ fontSize }) => calculateFontSize(8, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(6, fontSize)} ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ outline, darkMode }) => (outline ? "transparent" : darkMode ? "#543e6c" : "#6b538c")};
    color: ${({ outline, darkMode }) => (outline ? (darkMode ? "#EDDCFF" : "#6b538c") : "#fff")};
    border: ${({ outline, darkMode }) => (outline ? (darkMode ? "1px solid #EDDCFF" : "1px solid #6b538c") : "none")};
    transition: transform 0.5s ease, background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    }
`;

export const FormSection = styled.section`
    width: 28%;
    margin-left: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    flex-grow: 1;

    @media (max-width: 991px) {
        margin-left: 0;
        width: 100%;
        flex-grow: 1;
        height: 100%
         min-height: 100vh;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    margin: 0 auto;
    border-radius: 10px;
    background: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#7b757f")};
    transition: background-color 0.3s, color 0.3s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    flex-grow: 1;  // Ensures the form takes up available space
`;

export const Title = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    transition: color 0.3s;
`;

export const Label = styled.label`
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
    margin-top: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;
`;

export const Input = styled.input`
    height: ${({ fontSize }) => calculateFontSize(48, fontSize)};
    margin-top: ${({ fontSize }) => calculateFontSize(8, fontSize)};
    border: 2px solid ${({ darkMode }) => (darkMode ? "#666666" : "#7b757f")};
    border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
    background: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const FileDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(22, fontSize)} ${({ fontSize }) => calculateFontSize(40, fontSize)};
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    border: 2px dashed ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    border-radius: 10px;
    background-color: ${({ darkMode }) => (darkMode ? "#444444" : "#eddcff")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 600;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    @media (max-width: 991px) {
        padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const DropText = styled.p`
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;
`;

export const FileTypes = styled.p`
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#7b757f")};
    transition: color 0.3s;
`;

export const SecurityNote = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ fontSize }) => calculateFontSize(5, fontSize)};
    font-weight: 500;
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;
`;

export const SubmitButton = styled.button`
    align-self: center;
    margin-top: ${({ fontSize }) => calculateFontSize(40, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(10, fontSize)} ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    font-weight: 600;
    color: #fff;
    background: ${({ darkMode }) => (darkMode ? "#543e6c" : "#6b538c")};
    border: none;
    border-radius: ${({ fontSize }) => calculateFontSize(6, fontSize)};
    cursor: pointer;
    transition: transform 0.5s ease, background-color 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 991px) {
        padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const DropZoneWrapper = styled.div`
    gap: ${({ fontSize }) => calculateFontSize(20, fontSize)};
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
    margin-left: ${({ fontSize }) => calculateFontSize(20, fontSize)};

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed ${({ darkMode }) => (darkMode ? "#EDDCFF" : "rgba(107, 83, 140, 1)")};
    background-color: ${({ darkMode }) => (darkMode ? "#444444" : "#eddcff")};
    font-size: ${({ fontSize }) => calculateFontSize(23, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    line-height: ${({ fontSize }) => calculateFontSize(40, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(40, fontSize)};
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    @media (max-width: 991px) {
        padding: 0 ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;

    @media (max-width: 991px) {
        margin: 0 ${({ fontSize }) => calculateFontSize(8, fontSize)};
    }
`;

export const DropZoneDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    align-self: center;
    margin-top: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font: bold ${({ fontSize }) => calculateFontSize(28, fontSize)} Poppins, sans-serif;
    transition: color 0.3s;
`;

export const PreviewImage = styled.img`
    width: ${({ fontSize }) => calculateFontSize(100, fontSize)};
    height: ${({ fontSize }) => calculateFontSize(100, fontSize)};
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: ${({ fontSize }) => calculateFontSize(10, fontSize)};
`;

