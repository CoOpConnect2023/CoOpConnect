import styled from 'styled-components';

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

export const SectionContainer = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const SchoolSearchInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
  color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
  width: 100%;
  box-sizing: border-box;
`;


export const SectionTitle = styled.h2`
  color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
  margin-bottom: 10px;
  font-size: ${({ fontSize, basePixelSize }) => calculateFontSize(basePixelSize || 16, fontSize || '1em')};
`;

export const SectionContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardList = styled.div`
  flex: 3;
  max-height: 40vh;
  overflow-y: auto;
  padding-right: 10px;
  @media (max-width: 768px) {
    max-height: unset;
    padding-right: 0;
    margin-bottom: 15px;
    max-height: 40vh;
    overflow-y: auto;
  }
`;

export const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
