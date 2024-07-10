import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import { MessageContainer, Message, Timestamp } from '../../Styling/MessageContent.styles';

export default function MessageContent({ message, isCurrentUser }) {
     const timestamp = new Date(message.created_at).toLocaleString();

    return (
        <MessageContainer isCurrentUser={isCurrentUser}>
            <Message isCurrentUser={isCurrentUser}>{message.content}</Message>
            <Timestamp>{timestamp}</Timestamp>
        </MessageContainer>
    );
};


