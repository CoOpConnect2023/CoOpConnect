import styled from "styled-components";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

export const Container = styled.section`
    align-self: stretch;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#ffffff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    transition: background-color 0.5s ease;
`;

export const Card = styled.article`
    align-items: center;
    border-radius: 10px;
    flex: 1;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    display: flex;
    margin-top: 40px;
    justify-content: center;
    padding: 20px 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const FormWrapper = styled.div`
    display: flex;

    width: 60%;
    height: 100%;
    flex-direction: column;
    @media (max-width: 991px) {
        margin-bottom: 40px;
        width: 100%;
    }
`;

export const Title = styled.h1`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-weight: 600;
`;

export const Subtitle = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#b3b3b3' : '#7b757f')};
    margin: 10px 68px 0;
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

export const FormContainer = styled.div`
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#777' : '#000')};
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2d3648')};
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    transition: background-color 0.5s ease;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Form = styled.form`
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    padding: 12px;
    transition: background-color 0.5s ease;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#000')};
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-weight: 400;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionHeading = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#000')};
    letter-spacing: 0.15px;
    margin-top: 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 500;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#b3b3b3' : '#7b757f')};
    letter-spacing: 0.25px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 400;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const InputField = styled.input`
    border-radius: 3px;
    height: 62px;
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#7b757f')};
    transition: background-color 0.5s ease;
    & + & {
        margin-top: 8px;
    }
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const ProgressBar = styled.div`
    display: flex;
    margin-top: 8px;
    padding-right: 80px;
    gap: 0px;
    @media (max-width: 991px) {
        flex-wrap: wrap;
        padding-right: 20px;
    }
`;

export const ProgressItem = styled.div`
    flex: 1;
    height: 16px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#e9d8fd')};
    &:first-of-type {
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
        border-radius: 0 3px 3px 0;
    }
`;

export const StyledInput = styled.input`
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#cbd2e0')};
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    margin-top: 8px;
    width: 371px;
    max-width: 100%;
    height: 48px;
    transition: background-color 0.5s ease;
`;

export const Tag = styled.div`
    display: flex;
    gap: 8px;
    padding: 4px 12px;
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#e9d8fd')};
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const TagName = styled.span`
    font-family: Inter, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#44337a')};
`;

export const TagIcon = styled.img`
    width: 10px;
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    fill: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#44337a')};
    margin: auto 0;
`;

export const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 15px;
    margin-top: 10px;
    padding-right: 80px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#44337a')};
    font-weight: 500;
    white-space: nowrap;
    line-height: 150%;
    @media (max-width: 991px) {
        padding-right: 20px;
        white-space: initial;
    }
`;

export const Label = styled.label`
    font-feature-settings: "calt" off;
    letter-spacing: -0.14px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
`;

export const HorizontalRule = styled.hr`
    border: 1px solid ${({ darkMode }) => (darkMode ? '#777' : '#000')};
    background-color: ${({ darkMode }) => (darkMode ? '#777' : '#000')};
    margin-top: 19px;
    height: 1px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
    margin-top: 1vh;
`;

export const ActionButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    border-radius: 12px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    padding: 8px 16px;
    background: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : 'lightcoral')};
    }

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const SubmitButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#6b538c')};
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#fff')};
    white-space: nowrap;
    padding: 8px 16px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const ButtonContainerPost2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
`;
