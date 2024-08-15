import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const appearFromTop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const MainContainer = styled.main`
    align-self: stretch;
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: 10px;
    gap: 20px;
    transition: background-color 0.5s ease, color 0.5s ease;
    animation: ${fadeIn} 0.8s ease-in-out;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
@media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
        flex-direction: column;
`;

export const SearchContainer = styled.section`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
     border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ddd')};
    border-radius: 8px;
    display: flex;

    flex-direction: column;
    transition: background-color 0.5s ease, color 0.5s ease;
    padding: 20px 10px 0;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const FeaturedJobandList = styled.main`
    @media (max-width: 991px) {
        display: flex;
        flex-direction: column;
    }
`;

export const SearchInnerContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1088px;
    flex-direction: column;
    align-items: center;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SubHeading = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-family: Poppins, sans-serif;
    font-weight: 700;
`;

export const TextDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#7b757f')};
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-family: Poppins, sans-serif;
    font-weight: 700;
    line-height: 133%;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SearchForm = styled.form`
    justify-content: center;
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    display: flex;
    margin-top: 30px;
    gap: 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
    padding: 10px;
    overflow-x: auto;
    width: 100%;
    white-space: nowrap;

    @media (max-width: 991px) {
        flex-wrap: nowrap;
    }


`;
export const SearchField = styled.div`
    justify-content: center;
    display: flex;
    flex: 1;
    gap: 10px;
    min-width: 0; /* Allows shrinking of the input field if needed */
`;

export const SearchInput = styled.input`
    font-family: Poppins, sans-serif;
    flex: 1;
    border-radius: 4px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#6b538c')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    padding: 8px 16px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    width: 100%;
    min-width: 0; /* Allows the input to shrink if necessary */
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${({ darkMode }) => (darkMode ? '#666' : '#9c4dcc')}; /* Slightly different border color on focus */
    }
`;

export const SearchButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: #fff;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const JobList = styled.div`
    display: flex;
    margin-top: 5vh;
    margin-bottom: 5vh;
    padding: 10px 10px 0;
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        max-width: 100%;
        flex-direction: column;
        margin-top: 2vh;
        margin-bottom: 2vh;
        padding: 0;
    }
`;

export const JobColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    width: 90%;
    overflow-y: auto;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    padding: 16px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ddd')};
    border-radius: 8px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    max-height: 86vh;

    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    /* Ensure no more than 3 columns are displayed */
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (max-width: 991px) {
        width: 100%;
        flex-direction: column;
        max-height: 50vh;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
`;

export const JobCard = styled.article`
    max-width: 400px;
    align-items: center;
    border-radius: 10px;
    transition: background-color 0.5s ease, color 0.5s ease;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid ${({ darkMode }) => (darkMode ? '#444' : '#773dc3')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 40px;
    margin-top: ${(props) => (props.hasMargin ? "10px" : "0")};
    animation: ${appearFromTop} 0.8s ease forwards;
    animation-delay: ${(props) => props.index * 0.3}s;
    opacity: 0;
    transition: transform 0.7s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const JobTitle = styled.h3`
    display: flex;
    font-size: ${({ fontSize }) => calculateFontSize(28, fontSize)};
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
`;

export const JobMeta = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const JobTags = styled.div`
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    display: flex;
    margin-top: 17px;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
    font-weight: 400;
    letter-spacing: 0.4px;
    line-height: 133%;
`;

export const Tag = styled.span`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
    padding: 8px 10px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
`;

export const JobDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    align-self: stretch;
    text-align: center;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
`;

export const Divider = styled.hr`
    border-color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    border-top: 1px solid;
    background-color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#260e44')};
    transition: background-color 0.5s ease, color 0.5s ease;
    margin-top: 14px;
    width: 86px;
`;

export const ViewButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    transition: background-color 0.5s ease, color 0.5s ease;
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const FeaturedJob = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-end;
    line-height: normal;
    width: 100%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2vh;
    }
`;

export const JobCardFeatured = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 3px solid ${({ darkMode }) => (darkMode ? '#444' : '#773dc3')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 40px;
    margin-bottom: 10px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

export const CompanyImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

export const CompanyInfo = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 20px;
    letter-spacing: 0.15px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const CompanyDetails = styled.div`
    display: flex;
    align-self: start;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
`;

export const CompanyLocation = styled.p`
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};
`;

export const ApplyButton = styled.button`
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-family: Roboto, sans-serif;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    transition: background-color 0.5s ease, color 0.5s ease;
    margin-top: 10px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 24px;
    font-style: normal;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    width: 26%;
`;

export const JobFullDescription = styled.p`
    max-width: 550px;
    padding-top: 11px;
    border-top: 1px solid rgba(0, 0, 0, 1);
    align-self: stretch;
    margin-top: 15px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};
    letter-spacing: 0.25px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-family: Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
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
    color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
    letter-spacing: 0.4px;
    line-height: 133%;

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2C2C2C')};

    &:nth-child(4) {
        background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#773dc3')};
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

export const SearchIcon = styled(FontAwesomeIcon)`
font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
margin-right: 10px;
align-self: center;
`;

export const LocationIcon = styled(FontAwesomeIcon)`
font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
margin-right: 10px;
align-self: center;
`;
