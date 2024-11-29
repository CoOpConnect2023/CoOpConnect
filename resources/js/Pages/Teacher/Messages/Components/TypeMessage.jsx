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
        fontSize={fontSize} data-testid="type-message-component-teacher">
            <Div98 darkMode={darkMode}
        fontSize={fontSize}>
                <Div99 darkMode={darkMode}
        fontSize={fontSize}>
                  
                    <Div100 darkMode={darkMode}
        fontSize={fontSize}> <Input
                            type="text"
                            placeholder="Type your message"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            data-testid="type-message-input-teacher"
                        /></Div100>
                </Div99>
                <Div101 darkMode={darkMode}
        fontSize={fontSize}>
                <SendButton darkMode={darkMode}
        fontSize={fontSize} data-testid="type-message-send-teacher" onClick={onSendMessage}>Send</SendButton>


                </Div101>
            </Div98>
        </Container>
    );
}
