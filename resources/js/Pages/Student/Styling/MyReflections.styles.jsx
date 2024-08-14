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

export const Container = styled.div`
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    height: 80vh;

`;

export const Title = styled.h1`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: bold;
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#333')};
`;

export const ReflectionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ddd')};
    border-radius: 8px;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
`;

export const ReflectionInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
`;

export const ReflectionTitle = styled.span`
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    font-weight: bold;
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#333')};
`;

export const ReflectionSize = styled.span`
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#CCC' : '#666')};
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

export const ViewButton = styled.button`
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: #fff;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    transition: background-color 0.5s ease, color 0.5s ease;
    border: none;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#543b6f' : '#7b1fa2')};
    }
`;

export const ShareButton = styled.button`
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: #fff;
    background-color: ${({ darkMode }) => (darkMode ? '#7c4e7e' : '#b39ddb')};
    transition: background-color 0.5s ease, color 0.5s ease;
    border: none;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#9575cd')};
    }
`;

export const DeleteButton = styled.button`
    padding: 8px 16px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: #fff;
    background-color: ${({ darkMode }) => (darkMode ? '#d32f2f' : '#f44336')};
    transition: background-color 0.5s ease, color 0.5s ease;
    border: none;
    border-radius: 12px;
    cursor: pointer;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#b71c1c' : '#d32f2f')};
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};

    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const ModalBody = styled.div`
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const CloseButton = styled.button`
    background: ${({ darkMode }) => (darkMode ? '#d32f2f' : '#f44336')};
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
        background: ${({ darkMode }) => (darkMode ? '#b71c1c' : '#d32f2f')};
    }
`;
