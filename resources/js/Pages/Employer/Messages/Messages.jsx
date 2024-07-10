import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../Components/NavBar";
import Chat from "./Components/Chat";

import {
    getUser, selectUser, selectUserStatus
} from "@/Features/users/userSlice";
import {
    getMessages, selectMessages, selectMessagesStatus, getConversations, selectConversations, selectConversationsStatus, getSelectedConversation, selectCurrentConversation, selectCurrentConversationsStatus, fetchConversationDetails, sendMessage, sendNewMessage
} from "@/Features/messages/messagesSlice";
import {
    getShortlists, selectShortlists, selectShortlistsStatus
} from "@/Features/shortlists/shortlistsSlice";

export default function Messages() {
    const [conversationID, setConversationsID] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userStatus = useSelector(selectUserStatus);
    const messages = useSelector(selectMessages);
    const messageStatus = useSelector(selectMessagesStatus);
    const shortlists = useSelector(selectShortlists);
    const rawSelectedConversation = useSelector(selectCurrentConversation);
    const shortlistsStatus = useSelector(selectMessagesStatus);
    const convoStatus = useSelector(selectMessagesStatus);
    const conversationsStatus = useSelector(selectConversationsStatus);

    useEffect(() => {
        dispatch(getUser());

    }, [dispatch]);

    const userInfo = user;
    const currentUser = userInfo?.id;

    useEffect(() => {
        if (conversationID !== null) {
            dispatch(getMessages({ conversationID }));

        }
    }, [dispatch, conversationID]);

    useEffect(() => {
        if (conversationID !== null) {
            dispatch(getSelectedConversation({ conversationID }));

        }
    }, [dispatch, conversationID]);

    useEffect(() => {
        if (currentUser !== null) {
            dispatch(getConversations({ userId: currentUser }));
        }
    }, [dispatch, currentUser]);

    const convos = useSelector(selectConversations);

    useEffect(() => {

    }, [convos]);

    const conversations = convos.conversations;
    const selectedConversation = rawSelectedConversation?.conversation;

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        dispatch(sendMessage({ newMessage, userInfo, conversationID }));
    };

    const handleSendNewMessage = () => {
        if (newMessage.trim() === '') return;

        dispatch(sendNewMessage({ newMessage, userInfo, recipientEmail }));
        window.location.reload()
    };

    useEffect(() => {
        if (currentUser) {
            dispatch(getShortlists(currentUser)).then(response => {


            });
        }
    }, [dispatch, currentUser]);


    if (userStatus === 'loading') {
        return <LoadingScreen><Spinner /></LoadingScreen>;
    }
    if (messageStatus === 'loading') {
        return <LoadingScreen><Spinner /></LoadingScreen>;
    }

    if (convoStatus === 'loading') {
        return <LoadingScreen><Spinner /></LoadingScreen>;
    }

    return (
        <PageContainer>
            <NavBar header={"Messages"}>
                <ChatContainer>
                    <Chat
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handleSendNewMessage={handleSendNewMessage}
                        recipientEmail={recipientEmail}
                        setRecipientEmail={setRecipientEmail}
                        shortlists={shortlists}
                        conversations={conversations}
                        selectedConversation={selectedConversation}
                        messages={messages}
                        handleSendMessage={handleSendMessage}
                        setConversationsID={setConversationsID}
                        currentUser={currentUser}
                        conversationID={conversationID}
                    />
                </ChatContainer>
            </NavBar>
        </PageContainer>
    );
}

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333;
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const ChatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;


























