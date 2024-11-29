import { navButtonLightBackground, navDarkBackground, navLightBackground, lightTheme, darkTheme } from '@/Layouts/Global.styles';





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
    background-color: ${({ darkMode }) => (darkMode ? darkTheme.colors.secondary : lightTheme.colors.secondary)};
    transition: background-color 0.3s;

    border-color: rgba(123, 117, 127, 0.5); /* Softer border color with transparency */


    border-radius: 8px; /* Add border-radius for rounded corners */
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;



export const Content = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    height: 100%;
    min-height: 0;
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
  padding: ${({ fontSize }) => calculateFontSize(10, fontSize)} 0px;
  border-radius: 10px;
  background: ${({ darkMode }) => (darkMode ? darkTheme.colors.background : lightTheme.colors.background)};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  width: 100%;
  flex-grow: 1;
`;

export const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    width: 100%;
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
width: 100%;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

export const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;
   color: ${({ darkMode, active }) => (active ? (darkMode ? darkTheme.colors.purpleText : lightTheme.colors.purpleText) : (darkMode ? darkTheme.colors.text : lightTheme.colors.text))};
    border-bottom: ${({ active }) => (active ? "2px solid #6b538c" : "none")};
    transition: color 0.3s, border-bottom 0.3s;


    &.active {
        border-bottom: 2px solid ${lightTheme.colors.purpleText};
        color: ${lightTheme.colors.purpleText};
    }
`;

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    padding: 0 ${({ fontSize }) => calculateFontSize(10, fontSize)};

width: 100%;
overflow-y: auto;
     max-height: calc(100vh - 28vh);
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
    width: 100%;


    transition: transform 0.5s ease, border-color 0.3s;


    &:hover {

    }

    @media (max-width: 991px) {
        flex-direction: column;

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

    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    gap: ${({ fontSize }) => calculateFontSize(10, fontSize)};
`;

export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
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

    @media (max-width: 1024px) {
       flex-direction: column;
    }


`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: ${({ fontSize }) => calculateFontSize(8, fontSize)};
    padding: ${({ fontSize }) => calculateFontSize(8, fontSize)} ${({ fontSize }) => calculateFontSize(12, fontSize)};
    font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ outline, darkMode }) => (outline ? "transparent" : darkMode ? "#543e6c" : "#B6A1E5")};
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
         margin-top 1vh;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    margin: 0 auto;
    height:100%;
    border-radius: 10px;
    background: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: ${({ darkMode }) => (darkMode ? "#CCCCCC" : "#7b757f")};
    transition: background-color 0.3s, color 0.3s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    flex-grow: 1;  // Ensures the form takes up available space
`;

export const Title = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
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
    background: ${({ darkMode }) => (darkMode ? "#543e6c" : "#B6A1E5")};
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

export const ShareSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    width: 100%;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f9f9f9')};
    border-radius: 10px;
    box-shadow: ${({ darkMode }) => (darkMode ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)')};
`;

export const BackButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#B6A1E5')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#fff')};
    padding: 10px 20px;
    font-size: ${({ fontSize }) => fontSize || '1em'};
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ccc')};
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s ease; /* Smooth transition for hover */
    margin-top: 1%;

    &:hover {
        background-color: #FF4D4D; /* Red background on hover */
        color: #fff; /* Ensure text remains white */
    }
`;

export const EmailInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    font-size: ${({ fontSize }) => fontSize || '1em'};
    border: 1px solid ${({ darkMode }) => (darkMode ? '#666' : '#ddd')};
    border-radius: 5px;
    margin-top: 1%;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
    &:focus {
        outline: none;
        border-color: ${({ darkMode }) => (darkMode ? '#888' : '#bbb')};
    }
`;

export const ScrollableContainer = styled.div`
    width: 100%;
    max-height: 45vh; /* Set max height */
    overflow-y: auto;  /* Enable vertical scrolling */
    padding: 12px 15px;
    font-size: ${({ fontSize }) => fontSize || '1em'};
    border: 1px solid ${({ darkMode }) => (darkMode ? '#666' : '#ddd')};
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 1%;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
`;


export const EmailList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0 0 20px;
    width: 100%;
`;

export const EmailItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#555' : '#f1f1f1')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
    border-radius: 5px;
    margin-bottom: 10px;
`;

export const RemoveEmailButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#ff6666' : '#ff4d4d')};
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#ff3333' : '#ff1a1a')};
    }
`;

export const ShareButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#B6A1E5')};
    color: white;
    font-size: ${({ fontSize }) => fontSize || '1em'};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#47a38e' : '#47a38e')};
    }
`;

export const ButtonContainerUpload = styled.div`
display: flex;
gap: 1%;
`

export const ToggleSwitch = styled.div`
    width: 50px;
    height: 24px;
    background-color: ${({ isVisible, darkMode }) => (isVisible ? (darkMode ? '#B6A1E5' : '#B6A1E5') : '#ccc')};
    border-radius: 24px;
    cursor: pointer;
    position: relative;
`;

export const Slider = styled.div`
    position: absolute;
    top: 2px;
    left: ${({ isVisible }) => (isVisible ? '26px' : '2px')};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
`;

export const ShareBackContainer = styled.div`
display: flex;
flex-direction: column;

`

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;


export const VisibilityLabel = styled.span`
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
    margin-right: 10px;
`;

export const VisibilityContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
gap: 1%;
`

