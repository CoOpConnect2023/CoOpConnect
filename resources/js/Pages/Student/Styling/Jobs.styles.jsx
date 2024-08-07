import styled, { keyframes } from "styled-components";


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
    flex-direction: column;
    animation: ${fadeIn} 0.8s ease-in-out;
`

export const SearchContainer = styled.section`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 20px 10px 0;

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`
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

    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const SubHeading = styled.h2`
    color: #6b538c;
    font: 700 32px Poppins, sans-serif;
`

export const TextDescription = styled.p`
    color: #7b757f;
    margin-top: 10px;
    font: 700 24px/133% Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const SearchForm = styled.form`
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(123, 117, 127, 1);
    display: flex;
    margin-top: 30px;
    gap: 20px;
    font-size: 16px;
    color: #7b757f;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
    padding: 10px;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`

export const SearchField = styled.div`
    justify-content: center;
    display: flex;
    gap: 10px;
`

export const SearchInput = styled.input`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(107, 83, 140, 1);
    background-color: #fff;
    padding: 8px 16px;
`

export const SearchButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    color: #fff;
    padding: 8px 16px;
`

export const JobList = styled.div`
    display: flex;
    margin-top: 5vh;
    margin-bottom: 5vh;
    padding: 10px 10px 0;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-direction: column;
        margin-top: 2vh;
        margin-bottom: 2vh;
        padding: 0;
    }
`

export const JobColumn = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 43%;
    gap: 10px;
    max-height: 50vh; /* Adjust the height as needed */
    overflow-y: auto;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    @media (max-width: 991px) {
        width: 100%;
    }
`

export const JobCard = styled.article`
    max-width: 400px;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(107, 83, 140, 1);
    background-color: #eddcff;
    display: flex;

    width: 100%;
    flex-direction: column;
    padding: 20px 40px;
    margin-top: ${(props) => (props.hasMargin ? "10px" : "0")};
    animation: ${appearFromTop} 0.8s ease forwards;
    animation-delay: ${(props) => props.index * 0.3}s;
    opacity: 0; /* Start hidden */
    transition: transform 0.7s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`

export const JobTitle = styled.h3`
    display: flex;
    font: 28px/129% Poppins, sans-serif;
`

export const JobMeta = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
`

export const JobTags = styled.div`
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    display: flex;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    font-weight: 400;
    letter-spacing: 0.4px;
    line-height: 133%;
`

export const Tag = styled.span`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid rgba(119, 61, 195, 1);
    padding: 8px 10px;
`

export const JobDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    align-self: stretch;
    text-align: center;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font: 400 14px/20px Poppins, sans-serif;
`

export const Divider = styled.hr`
    border-color: rgba(38, 14, 68, 1);
    border-top: 1px solid;
    background-color: #260e44;
    margin-top: 14px;
    width: 86px;
`

export const ViewButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
`

export const FeaturedJob = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-end;
    line-height: normal;
    width: 57%;
    margin-left: 20px;

      @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2vh;
    }
`

export const JobCardFeatured = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(107, 83, 140, 1);
    background-color: #eddcff;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 40px;
    margin-bottom: 10px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`

export const CompanyImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`

export const CompanyInfo = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 20px;
    letter-spacing: 0.15px;
`

export const CompanyDetails = styled.div`
    display: flex;
    align-self: start;
    flex-direction: column;
`

export const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
`

export const CompanyLocation = styled.p`
    font-family: Poppins, sans-serif;
`

export const ApplyButton = styled.button`
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-family: Roboto, sans-serif;
    border-radius: 12px;
    background-color: #6b538c;
    margin-top: 10px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 24px;
    font-style: normal;
    font-size: 16px;
    width: 26%;
`

export const JobFullDescription = styled.p`
    max-width: 550px;
    padding-top: 11px;
    border-top: 1px solid rgba(0, 0, 0, 1);
    align-self: stretch;
    margin-top: 15px;
    color: #000;
    letter-spacing: 0.25px;
    font: 400 14px/20px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const SkillsList = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    letter-spacing: 0.4px;
    line-height: 133%;

    @media (max-width: 991px) {
        white-space: initial;
    }
`

export const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid #773dc3;
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;

    &:nth-child(4) {
        background-color: #773dc3;
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`

