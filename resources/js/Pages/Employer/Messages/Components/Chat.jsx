import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import MessageContent from "./MessageContent";
import { MainContainer, Content, Column, LeftColumn, Column2, RightColumn, MessageContainer, ScrollableContainer } from '../../Styling/Chat.styles';



export default function Chat({newMessage, setNewMessage, brandNewMessage, setBrandNewMessage, handleSendNewMessage, recipientEmail, setRecipientEmail, shortlists, conversations, selectedConversation, messages, handleSendMessage, setConversationsID, currentUser, conversationID, handleFetchConversationDetails }) {





    return (
        <MainContainer>
            <Content>
                <Column>
                    <LeftColumn>
                        <NewMessage newMessage={newMessage} setNewMessage={setNewMessage} brandNewMessage={brandNewMessage} setBrandNewMessage={setBrandNewMessage}  handleSendNewMessage={handleSendNewMessage} recipientEmail={recipientEmail} setRecipientEmail={setRecipientEmail} shortlists={shortlists} />
                        {conversations && <SidePanel conversations={conversations} setConversationsID={setConversationsID} currentUser={currentUser} />}
                    </LeftColumn>
                </Column>
                <Column2>
                    <RightColumn>
                        {selectedConversation && <UserPanel conversation={selectedConversation} currentUser={currentUser} />}
                        <ScrollableContainer>
                            <MessageContainer>
                                {messages.map((message, index) => (
                                    <MessageContent
                                        key={index}
                                        message={message}
                                        isCurrentUser={message.user_id === currentUser}
                                        conversationID={conversationID}

                                    />
                                ))}
                            </MessageContainer>
                        </ScrollableContainer>
                        <TypeMessage newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSendMessage} />
                    </RightColumn>
                </Column2>
            </Content>
        </MainContainer>
    );
}


