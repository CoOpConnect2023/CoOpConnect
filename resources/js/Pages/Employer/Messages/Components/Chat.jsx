import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import MessageContent from "./MessageContent";
import {
    getUser, selectUser, selectUserStatus
} from "@/Features/users/userSlice";
import {
    getMessages, selectMessages, selectMessagesStatus, getConversations, selectConversations, selectConversationsStatus, getSelectedConversation, selectCurrentConversation, selectCurrentConversationsStatus
} from "@/Features/messages/messagesSlice";
const appUrl = import.meta.env.VITE_APP_URL;

export default function Chat({newMessage, setNewMessage, handleSendNewMessage, recipientEmail, setRecipientEmail, shortlists, conversations, selectedConversation, messages, handleSendMessage, setConversationsID, currentUser, conversationID, handleFetchConversationDetails }) {





    return (
        <MainContainer>
            <Content>
                <Column>
                    <LeftColumn>
                        <NewMessage newMessage={newMessage} setNewMessage={setNewMessage} onSendNewMessage={handleSendNewMessage} recipientEmail={recipientEmail} setRecipientEmail={setRecipientEmail} shortlists={shortlists} />
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

const MainContainer = styled.div`
    justify-content: center;
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    padding: 20px;

`;

const Content = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 36%;
    margin-left: 0px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const LeftColumn = styled.div`
    align-self: stretch;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 64%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const RightColumn = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: #fff7ff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const MessageContainer = styled.div`
    height: 60vh;
`;

const ScrollableContainer = styled.div`

    overflow-y: auto;
`;

const Div78 = styled.div`
    margin-top: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Div79 = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
`;

const Column3 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 50%;
    margin-left: 0px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const Div80 = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0.5px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Div81 = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Div82 = styled.div`
    border-radius: 0px 10px 10px 10px;
    background-color: var(--Schemes-Primary, #6b538c);
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/150% Poppins, sans-serif;
    margin-top: 10px;
`;

const Div83 = styled.div`
    color: #000;
    margin-top: 10px;
    font: 12px/133% Poppins, sans-serif;
`;

const Div84 = styled.div`
    display: flex;
    margin-top: 134px;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    line-height: 150%;
    padding: 10px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Column4 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 50%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const Div88 = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin: auto 0;
    padding: 10px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Div89 = styled.div`
    max-width: 350px;
    border-radius: 10px 0px 10px 10px;
    background-color: var(--Schemes-Tertiary, #7c4e7e);
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/24px Poppins, sans-serif;
    margin-top: 10px;
`;

const Div90 = styled.div`
    color: #000;
    align-self: end;
    margin-top: 10px;
    font: 12px/133% Poppins, sans-serif;
`;

const Div91 = styled.div`
    align-items: end;
    align-self: end;
    display: flex;
    margin-top: 10px;
    width: 370px;
    max-width: 100%;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px;
`;

const Div95 = styled.div`
    display: flex;
    margin-top: 10px;
    width: 249px;
    max-width: 100%;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px;
`;
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

// Styled component with a loading animation
const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0; /* Adjust background color as needed */
    color: #333; /* Adjust text color as needed */
`;

// Additional styling for the spinning element
const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db; /* Adjust loading spinner color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite; /* Apply the spin animation */
`;
