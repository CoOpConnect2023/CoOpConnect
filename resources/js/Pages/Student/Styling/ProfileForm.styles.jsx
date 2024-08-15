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
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#1F1F1F' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    /* Ensure the form does not stretch too much */
    margin: 0 auto;
    padding: 20px;
    @media (max-width: 991px) {
        padding: 20px;
    }
`;

export const ProfileHeader = styled.h1`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    text-decoration: underline;
    align-self: center;
    font-weight: 600;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-family: Poppins, sans-serif;
    margin-bottom: 20px;
`;

export const ProfileSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
    margin-bottom: 20px;
`;

export const ProfileImageWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100px;
    margin-bottom: 10px;
`;

export const ProfileImage = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(45, 54, 72, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#edf0f7')};
`;

export const ProfileBio = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
`;

export const BioValue = styled.input`
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#260e44')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;
    height: 100%;
    width: 90%;
    align-self: center;
`;

export const BioHeader = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2d3648')};
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Adjusted font size */
    font-family: Poppins, sans-serif;
`;

export const ProfileDetail = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
`;

export const ProfileDetailItem = styled.div`
    margin-bottom: 15px;
`;


export const DetailLabel = styled.label`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    font-weight: 500;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    margin-bottom: 5px;
    display: block;
`;

export const DetailValue = styled.input`
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#260e44')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    padding: 8px;
    width: 100%;
`;

export const EditProfileButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    color: #fff;
    padding: 10px 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    max-width: 200px;
    align-self: start;
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
`;

export const SkillChip = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#e0e0e0')};
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#333')};
    padding: 6px 12px;
    border-radius: 20px;
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

export const ProfileDetailOne = styled.div`
    width: 100%;
    @media (min-width: 992px) {
        width: 48%;
    }
`;

export const ProfileDetailTwo = styled(ProfileDetailOne)`
`;

