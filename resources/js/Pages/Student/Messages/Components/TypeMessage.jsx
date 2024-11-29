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
        <Container darkMode={darkMode} fontSize={fontSize}>
            <Div98 darkMode={darkMode} fontSize={fontSize}>
                <Div99 darkMode={darkMode} fontSize={fontSize}>
                  
                    <Div100 darkMode={darkMode} fontSize={fontSize}> <Input darkMode={darkMode} fontSize={fontSize} data-testid="student-typeMessage"
                            type="text"
                            placeholder="Type your message"
                            value={newMessage}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        /></Div100>
                </Div99 >
                <SendButton darkMode={darkMode} fontSize={fontSize} data-testid="student-sendMessage"  onClick={onSendMessage}>Send</SendButton>

            </Div98>
        </Container>
    );
}

