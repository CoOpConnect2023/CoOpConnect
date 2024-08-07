import * as React from "react";
import styled from "styled-components";
import { Container, Div98, Div99, Div100, Input, Div101, SendButton } from "../../Styling/TypeMessage.styles";

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
        <Container data-testid="type-message-component-teacher">
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
                            data-testid="type-message-input-teacher"
                        /></Div100>
                </Div99>
                <Div101>
                <SendButton data-testid="type-message-send-teacher" onClick={onSendMessage}>Send</SendButton>
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
