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
export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    height: 89vh;
    background: ${({ darkMode }) => (darkMode ? '#121212' : 'var(--Schemes-Background, #fff7ff)')};
    padding: 20px;
    animation: ${fadeIn} 0.8s ease-in-out;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    box-sizing: border-box;
    overflow: hidden;

    @media (max-width: 991px) {
        padding: 10px;
        height: 80%;
    }
`;

export const SearchSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    margin-top: 20px;
    height: 35%;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 10px;
        height: auto;
    }
`;

export const SearchTitle = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    text-align: center;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(28, fontSize)};
    }
`;

export const Tagline = styled.h3`
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    text-align: center;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const Description = styled.p`
    text-align: center;
    font-size: ${({ fontSize }) => calculateFontSize(22, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    margin-top: 30px;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    }
`;

export const Button = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    color: #fff;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    border-radius: 12px;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    margin-top: 30px;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#5a4175')};
        transform: scale(1.05);
    }

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const JobsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    margin-top: 20px;
    flex-grow: 1;
    max-height: 65%;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    overflow-y: auto;

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 10px;
        max-height: 100%;
        overflow-y: visible;
        flex-grow: 1;
    }
`;

export const JobsHeader = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    text-align: center;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(28, fontSize)};
    }
`;

export const JobsSubHeader = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#7b757f')};
    text-decoration: underline;
    margin-top: 10px;
    text-align: center;

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const JobListings = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    overflow-y: auto;

    @media (max-width: 991px) {
        flex-direction: row;
        align-items: stretch;
        max-height: 40vh;
        overflow-y: auto;
    }
`;

export const JobCardContainer = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    border-radius: 10px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#773dc3')};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    max-width: 400px;
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    animation: ${fadeInLeft} 0.5s ease forwards;
    animation-delay: ${(props) => props.index * 0.1}s;
    opacity: 0;

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }

    @media (max-width: 991px) {
        max-width: 80%;
        height: 100%; /* Allow the height to be flexible */
        flex-direction: column;
    }
`;

export const JobTitle = styled.h3`
    font-size: ${({ fontSize }) => calculateFontSize(28, fontSize)};
    align-self: stretch;
    margin-bottom: 10px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
`;

export const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    margin-top: 18px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Location = styled.p`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    letter-spacing: 0.4px;
    line-height: 133%;
    margin-top: 17px;
    text-align: center;
`;

export const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#773dc3')};
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};

    &:nth-child(4) {
        background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

export const JobDescription = styled.p`
    text-align: center;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const Divider = styled.hr`
    width: 86px;
    height: 1px;
    margin-top: 14px;
    background-color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    border: none;
    align-self: center;
`;

export const JobButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    color: #fff;
    font-family: Roboto, sans-serif;
    font-weight: 700;
    border-radius: 12px;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    margin-top: 15px;
    cursor: pointer;
    align-self: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#5a4175')};
        transform: scale(1.05);
    }

    @media (max-width: 991px) {
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        padding: 6px 12px;
    }
`;

export const EmptyMessage = styled.div`
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#ff6347')};
    font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    padding: 20px;
    text-align: center;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#f0f0f0')};
    border-radius: 8px;
    margin-top: 20px;
`;
