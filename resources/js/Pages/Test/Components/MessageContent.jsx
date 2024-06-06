import React from "react";
import styled from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";

export default function Chat() {
    const messages = [
        {
            content: "This is the only message that was received.",
            sender: "PersonB",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the top Message",
            sender: "PersonA",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the only message",
            sender: "PersonA",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the only message that was received.",
            sender: "PersonB",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the top Message",
            sender: "PersonA",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the bottom Message",
            sender: "PersonA",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the first message to be received out of 2.",
            sender: "PersonB",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "2nd message received.",
            sender: "PersonB",
            timestamp: "Today, 12:00pm",
        },
        {
            content: "This is the only message",
            sender: "PersonA",
            timestamp: "Today, 12:00pm",
        },
    ];

    return (
        <>
            {messages.map((message, index) => {
                const nextSender =
                    index < messages.length - 1
                        ? messages[index + 1].sender
                        : null;
                return (
                    <MessageContainer key={index} sender={message.sender}>
                        <Message sender={message.sender}>
                            {message.content}
                        </Message>
                        {(nextSender !== message.sender ||
                            nextSender === null) && (
                            <Timestamp sender={message.sender}>
                                {message.timestamp}
                            </Timestamp>
                        )}
                    </MessageContainer>
                );
            })}
        </>
    );
}

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px; /* Reduced margin */
    align-items: ${({ sender }) =>
        sender === "PersonB" ? "flex-end" : "flex-start"};
`;

const Message = styled.div`
    border-radius: ${({ sender }) =>
        sender === "PersonA" ? "0px 10px 10px 10px" : "10px 0px 10px 10px"};
    background-color: ${({ sender }) =>
        sender === "PersonA" ? "#6b538c" : "#7c4e7e"};
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/150% Poppins, sans-serif;
    margin-top: 5px; /* Reduced margin */
    width: fit-content;
    align-self: ${({ sender }) =>
        sender === "PersonB" ? "flex-end" : "flex-start"};
`;

const Timestamp = styled.div`
    color: #000000; /* Lighter color for timestamp */
    align-self: ${({ sender }) =>
        sender === "PersonB" ? "flex-end" : "flex-start"};
    margin-top: 5px;
    font: 12px/133% Poppins, sans-serif;
    width: fit-content;
    margin-bottom: 5px; /* Reduced margin */
`;
