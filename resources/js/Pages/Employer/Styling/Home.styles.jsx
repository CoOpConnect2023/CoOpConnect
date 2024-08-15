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

const fadeInLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const UnderlineText = styled.span`
    text-decoration: underline;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
`;

export const MainContainer = styled.main`
    align-self: stretch;
    display: flex;
    flex: 1;
    flex-direction: column;
     border-radius: 10px;
    padding: 10px;
    background: ${({ darkMode }) => (darkMode ? '#121212' : 'var(--Schemes-Background, #fff7ff)')};
    animation: ${fadeIn} 0.8s ease-in-out;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const CreateJobSection = styled.section`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    padding: 20px 10px;
    transition: background-color 0.5s ease;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const JobTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    font: 600 32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    }
`;

export const JobSubtitle = styled.h3`
    margin-top: 10px;
    font: 500 24px/133% Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const JobDescription = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    text-align: center;
    margin-top: 30px;
    font: 400 22px/28px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(22, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
        margin-top: 20px;
    }
`;

export const PostJobButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    margin-top: 30px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font: 700 16px/150% Roboto, sans-serif;
    cursor: pointer;
    transition: background-color 0.5s ease, transform 0.3s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#5a4175')};
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const CurrentPostingsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 10px;
    margin-top: 40px;
    transition: background-color 0.5s ease;

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const SectionTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    font: 600 32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    }
`;

export const EditingInstructions = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#cfcfcf' : '#7b757f')};
    margin-top: 10px;
    font: 500 24px/32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const PostingsGrid = styled.div`
    justify-content: center;
    flex-wrap: wrap;
    align-self: stretch;
    margin: 20px 0 30px;
    display: flex;
    gap: 20px;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        max-width: 100%;
    }
`;

export const JobCard = styled.article`
    max-width: 400px;
    border-radius: 10px;
    border: 2px solid #EDDCFF; /* Added border */
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#eddcff')};

    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px 40px;
    word-wrap: break-word;
    transition: background-color 0.5s ease, box-shadow 0.3s ease, transform 0.3s ease;
    animation: ${fadeInLeft} 0.5s ease forwards;
    animation-delay: ${(props) => props.index * 0.1}s;
    opacity: 0; /* Start hidden */

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }

    @media (max-width: 768px) {
        margin-top: 20px;
        padding: 10px 20px;
        max-width: 300px;
    }
`;

export const JobCardTitle = styled.h3`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    font: 28px/129% Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(28, fontSize)};
    text-align: center;
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const CompanyName = styled.h4`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    font-family: Poppins, sans-serif;
    margin-top: 18px;
    letter-spacing: 0.15px;
    text-align: center;
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    }
`;

export const Location = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    text-align: center;
    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    }
`;

export const Tags = styled.div`
    justify-content: space-between;
    flex-wrap: wrap;
    display: flex;
    margin-top: 17px;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    font-weight: 400;
    letter-spacing: 0.4px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const Tag = styled.span`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    padding: 8px 10px;
    white-space: nowrap;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
        padding: 6px 8px;
    }
`;

export const JobDescriptionText = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    text-align: center;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font: 400 14px/20px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    }
`;

export const Divider = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    align-self: center;
    margin-top: 14px;
    width: 86px;
    height: 1px;
`;

export const CardButtons = styled.div`
    justify-content: center;
    display: flex;
    margin-top: 15px;
    gap: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition:  transform 0.3s ease;

    &:hover {

        transform: scale(1.05);
    }
`;

export const ViewPostingButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    color: #fff;
    padding: 8px 16px;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#5a4175')};
    }

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const EditPostingButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    padding: 8px 16px;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#5a4175')};
    }

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const DeletePostingButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 12px;
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const SkillsList = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    margin-top: 17px;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    letter-spacing: 0.4px;
    line-height: 133%;

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;

    &:nth-child(4) {
        background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
        padding: 6px 8px;
    }
`;
