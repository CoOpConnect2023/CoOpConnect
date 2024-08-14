import React from "react";
import styled from "styled-components";
import { Link } from "@inertiajs/react";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'rgba(38, 14, 68, 1)')};
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: background-color 0.5s ease;

    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-weight: 600;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Title = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'var(--Schemes-Primary, #6b538c)')};
    text-decoration: underline;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-family: Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: #fff;
    white-space: nowrap;
    letter-spacing: 0.5px;
    line-height: 150%;
    padding: 10px;

    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

const OptionCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${({ color }) => color};
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const OptionText = styled.p`
    font-family: Poppins, sans-serif;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#fff')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const OptionImage = styled.img`
    width: 24px;
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
`;

const ReflectionDocuments = ({ darkMode, fontSize }) => (
    <Container darkMode={darkMode} fontSize={fontSize}>
        <Title darkMode={darkMode} fontSize={fontSize}>Documents</Title>
        <OptionsWrapper darkMode={darkMode} fontSize={fontSize}>
            <OptionCard color="var(--Schemes-Tertiary, #7c4e7e)">
                <Link href="/employer/documents">
                    <OptionImage
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddb447f5a5634723dbdbd666e52ad19e8d1cd8e9ab1b5753d740485b4ba7d7a8?apiKey=d66532d056b14640a799069157705b77&"
                        alt="Documents Icon"
                        loading="lazy"
                    />
                    <OptionText darkMode={darkMode} fontSize={fontSize}>My Documents</OptionText>
                </Link>
            </OptionCard>
        </OptionsWrapper>
    </Container>
);

export default ReflectionDocuments;
