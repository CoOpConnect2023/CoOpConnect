import { keyframes, styled } from "styled-components";

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

export const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    transition: background-color 0.5s ease, color 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? '#1F1F1F' : '#fff')};
    gap: 40px;
    padding: 40px 30px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 20px;
    }
`;

export const ProfileHeader = styled.h1`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    text-decoration: underline;
    align-self: center;
    font-weight: 600;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-family: Poppins, sans-serif;
`;

export const ProfileSection = styled.section`
    margin-top: 40px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const ProfileContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        flex-direction: column;
    }
`;

export const ProfileImageWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 100%;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;

export const ProfileImage = styled.img`
    border-radius: 10px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(45, 54, 72, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#edf0f7')};
    display: block;
    width: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const ProfileBio = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)}; /* Increased font size */

    @media (max-width: 991px) {
        margin-top: 20px;
    }
`;

export const BioValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#260e44')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};

    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};
    letter-spacing: 0.25px;
    padding: 5vh 5vh;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
        background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f3e8ff')};
    }
`;

export const BioHeader = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2d3648')};
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Adjusted font size */
    font-family: Poppins, sans-serif;
`;

export const ProfileDetail = styled.section`
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const ProfileDetailItem = styled.div`
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const DetailLabel = styled.label`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;
`;

export const DetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#260e44')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};
    margin-top: 8px;
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
        background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f3e8ff')};
    }
`;

export const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')}, ${({ darkMode }) => (darkMode ? '#a97bbf' : '#a97bbf')});
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    line-height: 150%;
    font-family: Roboto, sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, ${({ darkMode }) => (darkMode ? '#543b6f' : '#543b6f')}, ${({ darkMode }) => (darkMode ? '#8e6aae' : '#8e6aae')});
        transform: scale(1.05);
    }
`;

export const ClearProfileButton = styled(EditProfileButton)`
    background: linear-gradient(135deg, ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')}, ${({ darkMode }) => (darkMode ? '#a97bbf' : '#a97bbf')});
    width: 100%;

    &:hover {
        background: linear-gradient(135deg, ${({ darkMode }) => (darkMode ? '#543b6f' : '#543b6f')}, ${({ darkMode }) => (darkMode ? '#8e6aae' : '#8e6aae')});
        transform: scale(1.05);
    }
`;

export const DropzoneContainer = styled.div`
    border: 2px dashed ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 500;
    letter-spacing: 0.1px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f3e8ff')};
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const SkillChip = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#e0e0e0')};
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#333')};
    padding: 6px 12px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
`;

export const AddSkillButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#543b6f' : '#7c4e7e')};
    }
`;

export const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#f0f0f0')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
`;

export const Spinner = styled.div`
    border: 4px solid ${({ darkMode }) => (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
    border-top: 4px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#3498db')};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

export const AutocompleteList = styled.ul`
    background-color: ${({ darkMode }) => (darkMode ? '#1F1F1F' : 'white')};
    border: 1px solid ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    border-radius: 5px;
    margin: 0;
    padding: 0;
    list-style: none;
    width: calc(100% - 20px);
    max-height: 150px;
    overflow-y: auto;
    z-index: 1000;
`;

export const AutocompleteItem = styled.li`
    padding: 8px;
    cursor: pointer;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    }
`;
