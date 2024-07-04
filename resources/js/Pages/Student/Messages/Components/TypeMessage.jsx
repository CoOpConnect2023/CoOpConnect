import * as React from "react";
import styled from "styled-components";

export default function TypeMessage({ newMessage, setNewMessage, onSendMessage }) {

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    };



    return (
        <Container>
            <Div98>
                <Div99>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                    />
                    <Div100> <Input
                            type="text"
                            placeholder="Type your message"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        /></Div100>
                </Div99>
                <Div101>
                <SendButton onClick={onSendMessage}>Send</SendButton>
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
        </Container>
    );
}

const Container = styled.div`
     display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
`;

const Div98 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    gap: 10px;
    padding: 10px 20px;

`;

const Div99 = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1;
    gap: 10px;
    font-size: 14px;
    color: var(--Schemes-Outline, #7b757f);
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 143%;
`;

const Div100 = styled.div`
    flex-grow: 1;
    font-family: Poppins, sans-serif;
    margin: auto 0;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #ccc;
`;

const Div101 = styled.div`
    justify-content: center;
    align-content: flex-start;
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
`;

const SendButton = styled.button`
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

