import styled from "styled-components";
import downarrow from "@/Pages/Images/Icon.svg";

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
    border-radius: 10px;
    flex: 1;
    flex-direction: column;
    width: 100%;
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff')};
    display: flex;
    width: 100%;
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
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

export const Form = styled.form`
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#777' : '#000')};
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    background-color: ${({ darkMode }) => (darkMode ? '#333333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2d3648')};
    padding: 20px;
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

export const FormRow = styled.div`
    display: flex;
    gap: 20px;
    margin: 20px 20px 0 0;
    @media (max-width: 991px) {
        margin-right: 10px;
        flex-wrap: wrap;
    }
`;

export const FormField = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;

     @media (max-width: 991px) {
        width: 100%;
    }

`;

export const Label = styled.label`
    font-feature-settings: "calt" off;
    letter-spacing: -0.14px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 600;
`;

export const Input = styled.input`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#cbd2e0')};
    background: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    transition: background-color 0.5s ease;
`;

export const Select = styled.select`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : '#cbd2e0')};
    background: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    appearance: none;
    background-image: url(${downarrow});
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 24px;
    transition: background-color 0.5s ease;
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

export const SubmitButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#773dc3' : 'rgba(107, 83, 140, 1)')};
    align-self: start;
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    white-space: nowrap;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 700;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : 'lightgreen')};
    }

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const BackButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#773dc3' : 'rgba(107, 83, 140, 1)')};
    align-self: start;
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    white-space: nowrap;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 700;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : 'lightcoral')};
    }

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const ButtonContainerPost = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
`;
