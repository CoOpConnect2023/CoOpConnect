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
    flex-direction: column;
    padding: 20px;
    flex: 1;
width: 100%;
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
    width: 100%;
flex: 1;
    max-width: 100%;
    flex-direction: column;
    @media (max-width: 991px) {
        margin-bottom: 40px;
    }
`;

export const Title = styled.h1`
    color: ${({ darkMode }) => (darkMode ? "#B7A1E5" : "#6b538c")};
    align-self: start;
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

export const Form = styled.form`
    border-radius: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#000")};
    display: flex;
    flex: 1;
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

export const SectionTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font: 400 32px Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
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
position: relative;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const Label = styled.label`
    font-feature-settings: "calt" off;
    letter-spacing: -0.14px;
    font: 600 14px/114% Inter, sans-serif;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#334155")};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
`;

export const Input = styled.input`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#666" : "#cbd2e0")};
    background: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const Select = styled.select`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#666" : "#cbd2e0")};
    background: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    appearance: none;
    background-image: url(${downarrow});
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 24px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
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
    justify-content: space-between;
    gap: 10px;
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
export const Dropdown = styled.ul`
    position: absolute;
    top: 100%; /* Places dropdown right below the input */
    left: 0;
    right: 0;
    z-index: 1000; /* Ensures it appears above other content */
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")}; /* Dark mode background */
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#ccc")}; /* Dark mode border */
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Font size calculation */
`;

export const DropdownItem = styled.li`
    padding: 8px 12px;
    cursor: pointer;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")}; /* Dark mode text color */
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#fff")}; /* Dark mode background */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)}; /* Font size calculation */

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? "#555" : "#f0f0f0")}; /* Hover background for dark and light modes */
    }
`;

