import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import MessageContent from "./MessageContent";
import { MainContainer, Content, Column, LeftColumn, Column2, RightColumn, MessageContainer, ScrollableContainer } from '../../Styling/Chat.styles';

export default function Chat({newMessage, setNewMessage, brandNewMessage, setBrandNewMessage, handleSendNewMessage, recipientEmail, setRecipientEmail, shortlists, conversations, selectedConversation, messages, handleSendMessage, setConversationsID, currentUser, conversationID, handleFetchConversationDetails, darkMode,
    fontSize }) {




    return (
        <MainContainer darkMode={darkMode}
        fontSize={fontSize}>
            <Content darkMode={darkMode}
                        fontSize={fontSize}>
                <Column darkMode={darkMode}
                        fontSize={fontSize}>
                    <LeftColumn darkMode={darkMode}
                        fontSize={fontSize}>
                        <NewMessage darkMode={darkMode}
                        fontSize={fontSize} newMessage={newMessage} setNewMessage={setNewMessage} brandNewMessage={brandNewMessage} setBrandNewMessage={setBrandNewMessage} onSendNewMessage={handleSendNewMessage} recipientEmail={recipientEmail} setRecipientEmail={setRecipientEmail} shortlists={shortlists} />
                        {conversations && <SidePanel darkMode={darkMode}
                        fontSize={fontSize}  conversations={conversations} setConversationsID={setConversationsID} currentUser={currentUser} />}
                    </LeftColumn>
                </Column>
                <Column2 darkMode={darkMode}
                        fontSize={fontSize}>
                    <RightColumn darkMode={darkMode}
                        fontSize={fontSize}>
                        {selectedConversation && <UserPanel darkMode={darkMode}
                        fontSize={fontSize} conversation={selectedConversation} currentUser={currentUser} />}
                        <ScrollableContainer darkMode={darkMode}
                        fontSize={fontSize}>
                            <MessageContainer darkMode={darkMode}
                        fontSize={fontSize}>
                                {messages.map((message, index) => (
                                    <MessageContent darkMode={darkMode}
                                    fontSize={fontSize}
                                        key={index}
                                        message={message}
                                        isCurrentUser={message.user_id === currentUser}
                                        conversationID={conversationID}

                                    />
                                ))}
                            </MessageContainer>
                        </ScrollableContainer>
                        <TypeMessage darkMode={darkMode}
                        fontSize={fontSize} newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSendMessage} />
                    </RightColumn>
                </Column2>
            </Content>
        </MainContainer>
    );
}

