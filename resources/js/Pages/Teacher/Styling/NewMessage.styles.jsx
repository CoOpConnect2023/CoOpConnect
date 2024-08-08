import styled from "styled-components";



export const Div4 = styled.div`
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    transition: background-color 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? "#1f1f1f" : "#fff7ff")};
    display: flex;
    flex-direction: column;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div5 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#773dc3")};
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    font: 600 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div6 = styled.div`

    align-items: center;
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    display: flex;
    margin-top: 10px;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const Div7 = styled.div`
    display: flex;
    gap: 10px;

    justify-content: flex-start;
`;

export const Div8 = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    letter-spacing: 0.5px;
    font: 500 16px/150% Poppins, sans-serif;

`;

export const Div9 = styled.div`
width: 100%;
    color: var(--Schemes-On-Primary-Container, #260e44);color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#260e44")};
    letter-spacing: 0.25px;

    margin: auto 0;
    font: 400 14px/143% Poppins, sans-serif;
    display: flex;
  flex-direction: column;
  align-items: stretch;

`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: ${({ fontSize }) => fontSize};
  box-sizing: border-box;
`;

export const Div10 = styled.div`
    justify-content: center;
    border-radius: 10px;
    border-color: ${({ darkMode }) => (darkMode ? "rgba(123, 117, 127, 1)" : "#000")};
    border-style: solid;
    border-width: 1px;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    padding: 10px 20px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div11 = styled.div`
    display: flex;
    width: 100%;
    padding-right: 20px;
    gap: 10px;
    justify-content: space-between;

`;

export const Div12 = styled.div`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#7b757f")};
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 143%;

`;

export const Img = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
`;

export const Div13 = styled.div`
    font-family: Poppins, sans-serif;
    margin: auto 0;

`;

export const Div14 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;

`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;

`;

export const SendButton = styled.button`
    padding: 10px 15px;
    background-color: #B7A1E5;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledMessage = styled.div`
    color: var(--Schemes-On-Primary-Container, #260e44);color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#260e44")};
    font-size: ${({ fontSize }) => fontSize};
`;
