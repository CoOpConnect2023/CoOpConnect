import React from "react";
import styled from "styled-components";
import { Link } from "@inertiajs/react";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    font-weight: 600;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        
    }
`;

const Title = styled.h2`
    color: var(--Schemes-Primary, #6b538c);
    text-decoration: underline;
    font: 32px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
    max-width: 430px;
    gap: 10px;
    font-size: 16px;
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const OptionText = styled.p`
    font-family: Poppins, sans-serif;
`;

const OptionImage = styled.img`
    width: 24px;
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const ReflectionDocuments = () => (
    <Container>
        <Title>Reflections & Documents</Title>
        <OptionsWrapper>
            <OptionCard color="var(--Schemes-Primary, #6b538c)">
            <Link href="/student/reflections">
                <OptionImage
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2c092e48480b10a594eda25d3cd6e685945fceb2d8ab8ee8dac19991294fb65?apiKey=d66532d056b14640a799069157705b77&"
                    alt="Reflection Icon"
                    loading="lazy"
                />
                <OptionText>My Reflections</OptionText>
                </Link>
            </OptionCard>
            <OptionCard color="var(--Schemes-Tertiary, #7c4e7e)">
            <Link href="/student/documents">
          <OptionImage
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddb447f5a5634723dbdbd666e52ad19e8d1cd8e9ab1b5753d740485b4ba7d7a8?apiKey=d66532d056b14640a799069157705b77&"
            alt="Documents Icon"
            loading="lazy"
          />
          <OptionText>My Documents</OptionText>
        </Link>
            </OptionCard>
        </OptionsWrapper>
    </Container>
);

export default ReflectionDocuments;
