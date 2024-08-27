import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
  animation: ${fadeIn} 0.8s ease-in-out;
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;
export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
export const InfoText = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: 100%;
`;
export const CardActions = styled.div`
  display: flex;
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;
export const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: ${({ darkMode }) => (darkMode ? '#B6A1E5' : '#6E3AA7')};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #5A2C85;
    transform: scale(1.05);
  }
`;
export const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  width: 100%;
  color: ${({ darkMode }) => (darkMode ? 'black' : 'black')};
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(10, fontSize)};
  @media (max-width: 768px) {
    width: 100%;
  }
`;
