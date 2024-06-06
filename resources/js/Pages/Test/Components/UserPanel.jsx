import * as React from "react";
import styled from "styled-components";

export default function UserPanel() {
    return (
        <Div70>
            <Div71>
                <Img12
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c47a81d89b80af54f5476e14879bb84b3496b020df7bb399a343744b681844d6?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Div72>
                    <Div73>John</Div73>
                    <Div74>
                        <Div75 />
                        <Div76>Online</Div76>
                    </Div74>
                </Div72>
            </Div71>
            <Div77>
                <Img13
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18b30724b21e718cecd79e9d58a4751dc9d29c80e72a3b1d737245d749bb9fa?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Img14
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ef2d6651b9e231f5622a1089941388469ca36165ad2ac303cfe7f091df1e521?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Img15
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dad3c2de01c60c15dc76acc88922a9a3073420dcb807ac85918e4b6a028f0b7e?apiKey=d66532d056b14640a799069157705b77&"
                />
            </Div77>
        </Div70>
    );
}

const Div70 = styled.div`
    justify-content: space-between;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

const Div71 = styled.div`
    justify-content: center;
    display: flex;
    gap: 20px;
    white-space: nowrap;
    line-height: 133%;
    padding: 5px 0;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const Img12 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 70px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 2px;
`;

const Div72 = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const Div73 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font: 600 24px Poppins, sans-serif;
`;

const Div74 = styled.div`
    justify-content: center;
    display: flex;
    margin-top: 10px;
    gap: 5px;
    font-size: 12px;
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 400;
    letter-spacing: 0.4px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const Div75 = styled.div`
    background-color: #55e685;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: auto 0;
`;

const Div76 = styled.div`
    font-family: Poppins, sans-serif;
`;

const Div77 = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 20px;
    margin: auto 0;
`;

const Img13 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 30px;
    align-self: stretch;
`;

const Img14 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
`;

const Img15 = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
`;
