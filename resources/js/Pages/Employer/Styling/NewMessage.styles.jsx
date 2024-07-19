import styled from "styled-components";

export const Div4 = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: #fff7ff;
    display: flex;
    flex-direction: column;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div5 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font: 600 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div6 = styled.div`
    align-items: center;
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
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
    color: var(--Schemes-Primary, #6b538c);
    letter-spacing: 0.5px;
    font: 500 16px/150% Poppins, sans-serif;
`;

export const Div9 = styled.div`
    color: var(--Schemes-On-Primary-Container, #260e44);
    letter-spacing: 0.25px;
    margin: auto 0;
    font: 400 14px/143% Poppins, sans-serif;
    overflow: hidden; /* Hide any content that exceeds the container's dimensions */
    white-space: nowrap; /* Prevent text from wrapping */
    text-overflow: ellipsis; /* Show an ellipsis (...) when text overflows */

    /* Optionally, add max-width or width properties to limit the size */
    /* max-width: 100%; */
    /* width: 100%; */
`;

export const Div10 = styled.div`
    justify-content: center;
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
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
    color: var(--Schemes-Outline, #7b757f);
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
    max-width: 100%;
    white-space: wrap;
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
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #ccc;
    white-space: wrap;
`;

export const SendButton = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledMessage = styled.div`
    color: #260e44;
    font-size: 14px;
    overflow: hidden; /* Hide any content that exceeds the container's dimensions */
    white-space: wrap; /* Prevent text from wrapping */
    text-overflow: ellipsis; /* Show an ellipsis (...) when text overflows */
`;
