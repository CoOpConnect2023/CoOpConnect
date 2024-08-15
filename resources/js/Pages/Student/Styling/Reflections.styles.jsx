import styled from "styled-components";

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

export const Section = styled.section`
    align-self: stretch;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#1d1a20')};
    justify-content: center;
    padding: 80px 0;
`;

export const Container = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const FormWrapper = styled.div`
    display: flex;
    width: 840px;
    max-width: 100%;
    flex-direction: column;
`;

export const Header = styled.h1`
    text-decoration-line: underline;
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(36, fontSize)};
    font-family: Poppins, sans-serif;
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#1d1a20')};
`;

export const Description = styled.p`
    margin: 10px 78px 0;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-family: Poppins, sans-serif;
    font-weight: 400;
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#1d1a20')};
    line-height: 133%;

    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

export const FormContainer = styled.div`
    border-radius: 10px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(123, 117, 127, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    line-height: 150%;
    padding: 20px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-family: Poppins, sans-serif;
    font-weight: 500;
    letter-spacing: 0.15px;
    align-self: center;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#1d1a20')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const TextareaWrapper = styled.div`
    border-radius: 6px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#773dc3' : 'rgba(38, 14, 68, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff7ff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 20px;
    padding: 36px 12px 3px 12px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Textarea = styled.textarea`
    font-family: Poppins, sans-serif;
    border: none;
    resize: none;
    outline: none;
    width: 100%;
    height: 100px;
    background: transparent;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#1d1a20')};
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
`;

export const Image = styled.img`
    aspect-ratio: 1.54;
    object-fit: auto;
    object-position: center;
    width: 20px;
    align-self: end;
    margin-top: 21px;
`;

export const Button = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    transition: background-color 0.5s ease, color 0.5s ease;
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#fff')};
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    margin-top: 5px;
`;

export const SuccessMessage = styled.p`
    color: green;
    font-weight: bold;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    margin-top: 10px;
`;
