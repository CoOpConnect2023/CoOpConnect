import styled, { keyframes } from "styled-components";

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

export const Main = styled.main`
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? '#3C3C3C' : '#fff')};
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  padding: 20px;
  flex-grow: 1;
  transition: box-shadow 0.3s ease, transform 0.5s ease, background-color 0.3s ease;
  animation: ${fadeIn} 0.8s ease-in-out;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;

  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#fff')};
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
  text-decoration: underline;
  align-self: start;
  font: 600 32px Poppins, sans-serif;
  font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
  margin-bottom: 1%;

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    text-align: center;
    margin-top: 10px;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
justify-content: space-between;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-direction: column;
    margin-top: 20px;
    height: auto;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  height: 20%;
  width: 100%;
  gap: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const ProfileImageWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  line-height: normal;
  max-width: 20%;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    max-width: 100%;
  }
`;

export const ProfileImage = styled.img`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  max-width: 50%;
  height: auto;
  border: 2px solid rgba(45, 54, 72, 1);
  background-color: #edf0f7;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    max-width: 100%;
  }
`;

export const ClearProfileButton = styled.button`
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #6b538c, #a97bbf);
  margin-top: 20px;
  width: 100%;
  max-width: 50%; /* Match the image's max-width */
  color: #fff;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  font-weight: 700;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  line-height: 150%;
  font-family: Roboto, sans-serif;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #543b6f, #8e6aae);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Ensure it resizes properly on smaller screens */
    align-self: center;
  }
`;


export const BioSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

// ... Continue with other styled-components in the same structured manner

export const BioTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#2d3648')};
    letter-spacing: 0.1px;
    font: 500 14px Poppins, sans-serif;

    @media (max-width: 768px) {
        max-width: 100%;
        text-align: center;
    }
`;

export const BioDescription = styled.div`
    border-radius: 10px;
    border: 2px solid rgba(123, 117, 127, 1);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eedcff')};

    display: flex;
    flex-direction: column;
    padding: 12px;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 8px;
    }
`;

export const BioLine = styled.div`
    border-radius: 3px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#260e44')};
    height: 16px;
`;

export const BioLineGroup = styled.div`
    display: flex;
    padding-right: 80px;

    @media (max-width: 768px) {
        padding-right: 20px;
    }
`;

export const SmallBioLine = styled.div`
    border-radius: 3px;
    background-color: ${({ darkMode }) => (darkMode ? '#773dc3' : '#260e44')};
    height: 16px;
    flex: 1;
`;

export const FieldTitle = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : '#6b538c')};
    letter-spacing: 0.1px;
    margin-top: 20px;
    font: 500 ${({ fontSize }) => calculateFontSize(16, fontSize)} Poppins, sans-serif;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const Input = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'rgba(38, 14, 68, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff7ff')};
    margin-top: 8px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    letter-spacing: 0.25px;
    justify-content: center;
    padding: 15px 12px;
    font: 400 ${({ fontSize }) => calculateFontSize(14, fontSize)} Poppins, sans-serif;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #6b538c;
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#f3e8ff')};
    }

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 10px;
    }
`;

export const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font: 700 ${({ fontSize }) => calculateFontSize(16, fontSize)} Roboto, sans-serif;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        align-self: center;
        width: 100%;
    }
`;

export const DetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'rgba(38, 14, 68, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff7ff')};
    margin-top: 8px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: 14px;
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #6b538c;
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#f3e8ff')};
    }

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 10px;
    }
`;

export const ProfileDetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'rgba(38, 14, 68, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#fff7ff')};

    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#7b757f')};
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: 14px;
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #6b538c;
        background-color: ${({ darkMode }) => (darkMode ? '#5a4175' : '#f3e8ff')};
    }

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 10px;
    }
`;


export const ProfileDetailSection = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 100%;
   justify-content: space-between;
   gap: 5%;

`;


export const DropzoneContainer = styled.div`
    border: 2px dashed ${({ darkMode }) => (darkMode ? '#888' : '#6b538c')};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    text-align: center;
    color: ${({ darkMode }) => (darkMode ? '#ccc' : '#6b538c')};
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#444' : '#f3e8ff')};
    }

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const SuccessMessage = styled.div`
    color: green;
    margin-top: 10px;
    font: 500 14px Poppins, sans-serif;
`;



export const StatusRadioButton = styled.input.attrs({ type: 'radio' })`
    appearance: none;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    outline: none;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

    &:checked {
        background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
        border-color: ${({ darkMode }) => (darkMode ? '#6b538c' : '#6b538c')};
    }

    &:focus {
        border-color: ${({ darkMode }) => (darkMode ? '#8e6aae' : '#8e6aae')};
    }
`;

export const StatusLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize, 1.5, 'rem')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#333')};
    font-family: Poppins, sans-serif;
    cursor: pointer;
`;

export const StatusContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize, 1.5, 'rem')};
`;

export const InputSection = styled.div`
display:flex;
width: 100%;
height: 100%;
flex-direction: row;
gap: 1%;

@media (max-width: 1024px) {
        flex-direction: column;
       width: 100%;
    }


`

export const LeftSide = styled.div`
display:flex;
width: 50%;
flex-direction: column;

@media (max-width: 1024px) {
        flex-direction: column;
       width: 100%;
    }
`

export const RightSide = styled.div`
display:flex;
width: 50%;
flex-direction: column;

@media (max-width: 1024px) {
        flex-direction: column;
       width: 100%;
    }
`
