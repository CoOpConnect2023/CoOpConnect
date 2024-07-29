import styled from "styled-components";
export const Div15 = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: var(--Schemes-Background, #fff7ff);
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px 10px 0;
    flex-grow: 1; /* Allow it to grow and fill the remaining space */
    height: 100%; /* Ensure it stretches to the bottom */
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div16 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font: 600 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const Div17 = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 10px;

    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

export const Div18 = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 133%;
    flex: 1;
    overflow-y: auto;
    height:50vh;
`;

export const Div19 = styled.div`
    justify-content: center;
    border-color: rgba(0, 0, 0, 1);
    border-style: solid;
    border-bottom-width: 1px;
    display: flex;
    gap: 10px;
    padding: 10px 5px;
`;

export const Img4 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 50px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 2px;
`;

export const Div20 = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: auto 0;
`;

export const Div21 = styled.div`
    justify-content: space-between;
    display: flex;
    gap: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
`;

export const Div22 = styled.div`
    color: var(--Schemes-On-Background, #1d1a20);
    font-family: Poppins, sans-serif;
`;

export const Div23 = styled.div`
    color: var(--Schemes-Outline, #7b757f);
    font-family: Poppins, sans-serif;
`;

export const Div24 = styled.div`
    max-width: 300px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: var(--Schemes-Outline, #7b757f);
    text-overflow: ellipsis;
    font-family: Poppins, sans-serif;
    font-weight: 400;
    letter-spacing: 0.4px;
    margin-top: 10px;
`;

export const Div67 = styled.div`
    padding-bottom: 80px;
    border-radius: 100px;
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    flex-direction: column;
`;

export const Div68 = styled.div`
    border-radius: 100px;
    background-color: var(--Schemes-Primary, #6b538c);
    height: 33px;
`;
