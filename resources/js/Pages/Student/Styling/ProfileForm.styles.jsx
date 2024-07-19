import {keyframes, styled} from "styled-components";



export const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 300px; /* Set a minimum width */
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    gap: 40px;
    padding: 40px 30px;

    @media (max-width: 991px) {
        padding: 20px;
    }
`;

export const ProfileHeader = styled.h1`
    color: #6b538c;
    text-decoration: underline;
    align-self: center;
    font-weight: 600;
    font-size: 32px;
    font-family: Poppins, sans-serif;
`;

export const ProfileSection = styled.section`
    margin-top: 40px;
`;

export const ProfileContainer = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
    }
`;

export const ProfileImageWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 100%;

    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;

export const ProfileImage = styled.img`
    border-radius: 10px;
    border: 2px solid rgba(45, 54, 72, 1);
    background-color: #edf0f7;
    display: block;
    width: 100%;

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const ProfileBio = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 0;

    @media (max-width: 991px) {
        margin-top: 20px;
    }
`;

export const BioHeader = styled.h2`
    color: #2d3648;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;

export const ProfileDetail = styled.section`
    margin-top: 20px;
`;

export const ProfileDetailItem = styled.div`
    margin-top: 20px;
`;

export const DetailLabel = styled.label`
    color: #6b538c;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;

export const DetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid #260e44;
    background-color: #fff7ff;
    margin-top: 8px;
    color: #7b757f;
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: 14px;
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    white-space: pre-wrap; /* Ensures that whitespace is preserved and text wraps */
    word-wrap: break-word;
`;

export const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, #6b538c, #a97bbf);
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    font-family: Roboto, sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }
`;

export const ClearProfileButton = styled(EditProfileButton)`
    background: linear-gradient(135deg, #6b538c, #a97bbf);

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }
`;

export const DropzoneContainer = styled.div`
    border: 2px dashed #6b538c;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #6b538c;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f3e8ff;
    }
`;

export const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const SkillChip = styled.div`
    background-color: #e0e0e0;
    color: #333;
    padding: 6px 12px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
`;

export const AddSkillButton = styled.button`
    background-color: #6b538c;
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #7c4e7e;
    }
`;

export const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333;
`;

export const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

export const AutocompleteList = styled.ul`
    background-color: white;
    border: 1px solid #6b538c;
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

    &:hover {
        background-color: #f0f0f0;
    }
`;
