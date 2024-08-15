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
    flex-direction: column;
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Card = styled.article`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#fff")};
    display: flex;
    flex: 1;
    justify-content: center;
    padding: 20px 10px;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const FormWrapper = styled.div`
    display: flex;

    width: 720px;
    max-width: 100%;
    flex-direction: column;
    @media (max-width: 991px) {
        margin-bottom: 40px;
    }
`;

export const Title = styled.h1`
    color: ${({ darkMode }) => (darkMode ? "#B7A1E5" : "#6b538c")};
    align-self: center;
    font: 600 32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
`;

export const Subtitle = styled.p`
    color: ${({ darkMode }) => (darkMode ? "#cbd2e0" : "#7b757f")};
    margin: 10px 68px 0;
    font: 500 24px/133% Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

export const FormContainer = styled.div`
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#000")};
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#2d3648")};
    padding: 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#fff")};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Form = styled.form`
    border: 2px solid ${({ darkMode }) => (darkMode ? "#777" : "#7b757f")};
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    display: flex;
    margin-top: 12px;
    flex-direction: column;
    padding: 12px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font: 400 32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionHeading = styled.h2`
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    letter-spacing: 0.15px;
    margin-top: 20px;
    font: 500 16px/150% Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionDescription = styled.p`
    color: ${({ darkMode }) => (darkMode ? "#cbd2e0" : "#7b757f")};
    letter-spacing: 0.25px;
    font: 400 14px/20px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    margin-top: 5px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const InputField = styled.input`
    border-radius: 3px;
    height: 62px;
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    border: 2px solid ${({ darkMode }) => (darkMode ? "#666" : "#ccc")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
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
    background-color: ${({ darkMode }) => (darkMode ? "#555" : "#a0abc0")};
    &:first-of-type {
        border-radius: 3px 0 0 3px;
    }
    &:last-of-type {
        border-radius: 0 3px 3px 0;
    }
`;

export const StyledInput = styled.input`
    border: 2px solid ${({ darkMode }) => (darkMode ? "#666" : "#cbd2e0")};
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    margin-top: 8px;
    width: 371px;
    max-width: 100%;
    height: 48px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Tag = styled.div`
    display: flex;
    gap: 8px;
    padding: 4px 12px;
    border-radius: 6px;
    background-color: ${({ darkMode }) => (darkMode ? "#555" : "#e9d8fd")};
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

export const TagName = styled.span`
    font-family: Inter, sans-serif;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const TagIcon = styled.img`
    width: 10px;
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    fill: ${({ darkMode }) => (darkMode ? "#888" : "#44337a")};
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
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#44337a")};
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
    margin-top: 5px;
    font: 600 14px/114% Inter, sans-serif;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#334155")};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
`;

export const HorizontalRule = styled.hr`
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#000")};
    background-color: ${({ darkMode }) => (darkMode ? "#666" : "#000")};
    margin-top: 19px;
    height: 1px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-top: 20px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
`;

export const ActionButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#9f7aea" : "rgba(107, 83, 140, 1)")};
    border-radius: 12px;
    color: ${({ darkMode }) => (darkMode ? "#9f7aea" : "#6b538c")};
    padding: 8px 16px;
    background: none;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const SubmitButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? "#9f7aea" : "#6b538c")};
    color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    white-space: nowrap;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        white-space: initial;
    }
`;
