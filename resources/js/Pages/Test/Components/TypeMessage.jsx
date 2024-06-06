import * as React from "react";
import styled from "styled-components";

export default function TypeMessage() {
    return (
        <Div98>
            <Div99>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                />
                <Div100>Type your message</Div100>
            </Div99>
            <Div101>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/429c7b4cb95b7c4e354a15b6ad7cd6acbf0861060a65e20f88c199fd588a121b?apiKey=d66532d056b14640a799069157705b77&"
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad0c75797c11a3cca0eab47099060da2128dc39e1cbf2928ea5d120dd074356?apiKey=d66532d056b14640a799069157705b77&"
                />
            </Div101>
        </Div98>
    );
}

const Div98 = styled.div`
    justify-content: space-between;
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    display: flex;
    margin-top: 38px;
    width: 100%;
    gap: 10px;
    padding: 10px 20px;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

const Div99 = styled.div`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 143%;
`;

const Div100 = styled.div`
    font-family: Poppins, sans-serif;
    margin: auto 0;
`;

const Div101 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
`;
