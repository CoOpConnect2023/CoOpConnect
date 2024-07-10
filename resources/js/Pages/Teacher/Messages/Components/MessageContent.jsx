import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
const appUrl = import.meta.env.VITE_APP_URL;

export default function MessageContent({ message, isCurrentUser }) {
     const timestamp = new Date(message.created_at).toLocaleString();

    return (
        <MessageContainer isCurrentUser={isCurrentUser}>
            <Message isCurrentUser={isCurrentUser}>{message.content}</Message>
            <Timestamp>{timestamp}</Timestamp>
        </MessageContainer>
    );
};


const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px; /* Reduced margin */
    align-items: ${({ isCurrentUser }) =>
        isCurrentUser ? "flex-end" : "flex-start"};

`;

const Message = styled.div`
    border-radius: ${({ isCurrentUser }) =>
        isCurrentUser ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
    background-color: ${({ isCurrentUser }) =>
        isCurrentUser ? "#6b538c" : "#7c4e7e"};
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/150% Poppins, sans-serif;
    margin-top: 5px; /* Reduced margin */
    width: fit-content;

`;

const Timestamp = styled.div`
    color: #000000; /* Lighter color for timestamp */

    margin-top: 5px;
    font: 12px/133% Poppins, sans-serif;
    width: fit-content;
    margin-bottom: 5px; /* Reduced margin */
`;
