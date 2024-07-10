import React, { useEffect, useState } from 'react';
import styled from "styled-components";
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



