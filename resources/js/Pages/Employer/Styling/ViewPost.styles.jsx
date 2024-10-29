import styled from "styled-components";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 75vh;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    padding: 10px;
`;

export const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: stretch;
    flex: 1;
    padding: 1%;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.5s ease;
`;

export const JobPostingCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch; /* Allow children to stretch full width */
    width: 100%;
    flex: 1;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#f8f8ff')};
    padding: 30px;
    transition: background-color 0.5s ease;
`;

export const JobInfo = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    width: 100%;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    font-weight: 400;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;


export const Title = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#1d1a20')};
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(36, fontSize)};
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;



export const JobInfoLeft = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    font-weight: 400;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

export const CompanyLogo = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 100px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'rgba(45, 54, 72, 1)')};
    max-width: 100%;
    margin: auto 0;
`;

export const JobDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const JobTitle = styled.h3`
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-family: 'Poppins', sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const CompanyName = styled.h4`
    color: ${({ darkMode }) => (darkMode ? '#D1C4E9' : '#6c538c')};
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(22, fontSize)};
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const JobDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    letter-spacing: 0.5px;
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    line-height: 24px;
    font-family: 'Poppins', sans-serif;

      ul {
        list-style-type: disc;
        padding-left: 20px; /* Add some padding for indentation */
    }

    ol {
        list-style-type: decimal;
        padding-left: 20px; /* Add some padding for indentation */
    }

    li {
        margin-bottom: 5px; /* Space out list items */
    }
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const StatusIcon = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
    align-self: start;
`;

export const JobInfoRight = styled.div`
    justify-content: center;
    border-bottom: 1px solid black;
    display: flex;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#000')};
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 150%;
    padding: 10px 20px;
    @media (max-width: 991px) {
        flex-wrap: wrap;
        padding: 0 20px;
    }
`;

export const StatusTag = styled.span`
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#eddcff')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    justify-content: center;
    padding: 10px;
`;

export const JobTypeTag = styled.span`
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#eddcff')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    justify-content: center;
    padding: 10px;
`;

export const LocationTag = styled.span`
    font-family: 'Poppins', sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#eddcff')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    justify-content: center;
    padding: 10px;
`;

export const ApplicantSection = styled.section`
    margin-top: 20px;
`;

export const ApplicantTitle = styled.h4`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    align-self: center;
    text-align: center;
    margin-bottom: 5px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
`;

export const Applicants = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;

export const ApplicantCard = styled.article`
    max-width: 350px;
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(123, 117, 127, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    display: flex;
    flex-direction: column;
    padding: 10px 13px;
    transition: background-color 0.5s ease;
    @media (max-width: 991px) {
        margin-top: 10px;
    }
`;

export const ApplicantInfo = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(123, 117, 127, 1)')};
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#D1C4E9' : '#6b538c')};
    font-weight: 500;
    line-height: 133%;
`;

export const ApplicantImage = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 75px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'rgba(45, 54, 72, 1)')};
`;

export const ApplicantDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ApplicantName = styled.span`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#000')};
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-family: 'Poppins', sans-serif;
`;

export const SchoolInfo = styled.span`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
    color: ${({ darkMode }) => (darkMode ? '#D1C4E9' : '#2C2C2C')};
`;

export const Location = styled.span`
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
    color: ${({ darkMode }) => (darkMode ? '#D1C4E9' : '#2C2C2C')};
`;

export const ApplicantDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    color: ${({ darkMode }) => (darkMode ? '#E0E0E0' : '#4a454e')};
    text-overflow: ellipsis;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    margin-top: 10px;
`;

export const ViewButton = styled.button`
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    align-self: center;
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#fff')};
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.5s ease;
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: center;

    flex-direction: row;
    gap: 10px;
`;

export const ActionButton = styled.button`
    font-family: Poppins, sans-serif;
    background-color: var(--Palettes-Primary-40, #773dc3);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--Palettes-Primary-30, #542a93);
    }
`;

export const JobDates = styled.div`
display: flex;
gap: 5px;
    margin-top: 15px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    flex-direction: row;

    p {
        margin: 5px 0;
    }
`;
