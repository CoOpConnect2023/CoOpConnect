import * as React from "react";
import styled from "styled-components";
import { Container, Div98, Div99, Div100, Input, Div101, SendButton } from "../../Styling/TypeMessage.styles";

export default function TypeMessage({ newMessage, setNewMessage, onSendMessage, darkMode, fontSize }) {

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    };



    return (
        <Container darkMode={darkMode}
        fontSize={fontSize} data-testid="type-message-component">
            <Div98 darkMode={darkMode}
        fontSize={fontSize}>
                <Div99 darkMode={darkMode}
        fontSize={fontSize}>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1fe555b0ffdbe13c397278b479bee6782aab134a4d597d83c876620c9e724f1?apiKey=d66532d056b14640a799069157705b77&"
                    />
                    <Div100 darkMode={darkMode}
        fontSize={fontSize}> <Input darkMode={darkMode}
        fontSize={fontSize}
                            type="text"
                            placeholder="Type your message"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            data-testid="type-message-input"
                        /></Div100>
                </Div99>
                <Div101 darkMode={darkMode}
        fontSize={fontSize}>
                <SendButton darkMode={darkMode}
        fontSize={fontSize} data-testid="type-message-send" onClick={onSendMessage}>Send</SendButton>
                    

                </Div101>
            </Div98>
        </Container>
    );
}
