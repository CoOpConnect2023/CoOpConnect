import * as React from "react";
import styled from "styled-components";

export default function NewMessage() {
    return (
        <Div4>
            <Div5>New Message</Div5>
            <Div6>
                <Div7>
                    <Div8>To: </Div8>
                    <Div9>john@gmail.com</Div9>
                </Div7>
            </Div6>
            <Div10>
                <Div11>
                    <Div12>
                        <Img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                        />
                        <Div13>Type your message</Div13>
                    </Div12>
                    <Div14>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/429c7b4cb95b7c4e354a15b6ad7cd6acbf0861060a65e20f88c199fd588a121b?apiKey=d66532d056b14640a799069157705b77&"
                        />
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad0c75797c11a3cca0eab47099060da2128dc39e1cbf2928ea5d120dd074356?apiKey=d66532d056b14640a799069157705b77&"
                        />
                    </Div14>
                </Div11>
            </Div10>
        </Div4>
    );
}

const Div4 = styled.div`
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

const Div5 = styled.div`
    color: var(--Palettes-Primary-40, #773dc3);
    font: 600 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Div6 = styled.div`
    justify-content: center;
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

const Div7 = styled.div`
    display: flex;
    gap: 10px;
`;

const Div8 = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    letter-spacing: 0.5px;
    font: 500 16px/150% Poppins, sans-serif;
`;

const Div9 = styled.div`
    color: var(--Schemes-On-Primary-Container, #260e44);
    letter-spacing: 0.25px;
    margin: auto 0;
    font: 400 14px/143% Poppins, sans-serif;
`;

const Div10 = styled.div`
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

const Div11 = styled.div`
    display: flex;
    width: 100%;
    padding-right: 20px;
    gap: 10px;
    justify-content: space-between;
`;

const Div12 = styled.div`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 143%;
`;

const Img = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 24px;
`;

const Div13 = styled.div`
    font-family: Poppins, sans-serif;
    margin: auto 0;
`;

const Div14 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
`;
