import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number

    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }
    // Otherwise, apply the amplification factor
    return `${basePixelSize * em * factor}px`;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: center;

  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#1a1919")};
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
  border-color: rgba(123, 117, 127, 1);
  border-style: solid;
  border-width: 1px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

  @media (max-width: 991px) {
    width: 100%; /* Ensure it takes the full width */
  }
`;

const Title = styled.h2`
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  text-decoration: underline;
  font: ${({ fontSize }) => calculateFontSize(32, fontSize)} Poppins, sans-serif;
  transition: color 0.3s;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
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
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

  @media (max-width: 991px) {
    padding: 0 20px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const OptionText = styled.p`
  font-family: Poppins, sans-serif;
  color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#fff")};
  transition: color 0.3s;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const OptionImage = styled.img`
  width: 24px;
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
`;

const ReflectionDocuments = ({fontSize}) => {
  const darkMode = useSelector((state) => state.accessibility.darkMode);

  return (
    <Container fontSize={fontSize} darkMode={darkMode}>
      <Title  fontSize={fontSize} darkMode={darkMode}>Documents</Title>
      <OptionsWrapper fontSize={fontSize}>
        <OptionCard fontSize={fontSize} color="var(--Schemes-Tertiary, #7c4e7e)">
          <Link fontSize={fontSize} href="/teacher/documents">
            <OptionImage
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddb447f5a5634723dbdbd666e52ad19e8d1cd8e9ab1b5753d740485b4ba7d7a8?apiKey=d66532d056b14640a799069157705b77&"
              alt="Documents Icon"
              loading="lazy"
            />
            <OptionText darkMode={darkMode}>Documents</OptionText>
          </Link>
        </OptionCard>
      </OptionsWrapper>
    </Container>
  );
};

export default ReflectionDocuments;
