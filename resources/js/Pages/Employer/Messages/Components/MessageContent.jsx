import React, { useEffect, useState } from 'react';
import { MessageContainer, Message, Timestamp } from '../../Styling/MessageContent.styles';

export default function MessageContent({ message, isCurrentUser, darkMode, fontSize }) {
     const timestamp = new Date(message.created_at).toLocaleString();

    return (
        <MessageContainer isCurrentUser={isCurrentUser} darkMode={darkMode}>
            <Message isCurrentUser={isCurrentUser} darkMode={darkMode}>{message.content}</Message>
            <Timestamp darkMode={darkMode}>{timestamp}</Timestamp>
        </MessageContainer>
    );
};



