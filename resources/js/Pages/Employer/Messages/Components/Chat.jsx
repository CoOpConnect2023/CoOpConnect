import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import MessageContent from "./MessageContent";
import { MainContainer, Content, Column, LeftColumn, Column2, RightColumn, MessageContainer, ScrollableContainer, BackButton } from '../../Styling/Chat.styles';

export default function Chat({ userInfo,
  newMessage, setNewMessage, brandNewMessage, setBrandNewMessage,
  handleSendNewMessage, recipientEmail, setRecipientEmail, shortlists,
  conversations, selectedConversation, messages, handleSendMessage,
  setConversationsID, currentUser, conversationID, handleFetchConversationDetails,
  darkMode, fontSize
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBackToConversations = () => {

    setConversationsID(null);

  };

  return (
    <MainContainer darkMode={darkMode} fontSize={fontSize}>
      <Content darkMode={darkMode} fontSize={fontSize}>
        {!isMobile || !conversationID ? (
          <Column darkMode={darkMode} fontSize={fontSize}>
            <LeftColumn darkMode={darkMode} fontSize={fontSize}>
              <NewMessage darkMode={darkMode} fontSize={fontSize} newMessage={newMessage} setNewMessage={setNewMessage} brandNewMessage={brandNewMessage} setBrandNewMessage={setBrandNewMessage} handleSendNewMessage={handleSendNewMessage} recipientEmail={recipientEmail} setRecipientEmail={setRecipientEmail} shortlists={shortlists} />
              {conversations && <SidePanel darkMode={darkMode} fontSize={fontSize} conversations={conversations} setConversationsID={setConversationsID} currentUser={currentUser} />}
            </LeftColumn>
          </Column>
        ) : null}

        {isMobile && conversationID && (
          <BackButton onClick={handleBackToConversations} darkMode={darkMode}>
            Back to Conversations
          </BackButton>
        )}

        {!isMobile || conversationID ? (
          <Column2 darkMode={darkMode} fontSize={fontSize}>
            <RightColumn darkMode={darkMode} fontSize={fontSize}>
              {selectedConversation && <UserPanel messages={messages}  userInfo={userInfo} darkMode={darkMode} fontSize={fontSize} conversation={selectedConversation} currentUser={currentUser} />}
              <ScrollableContainer darkMode={darkMode} fontSize={fontSize}>
                <MessageContainer darkMode={darkMode} fontSize={fontSize}>
                  {messages.map((message, index) => (
                    <MessageContent
                      darkMode={darkMode}
                      fontSize={fontSize}
                      key={index}
                      message={message}
                      isCurrentUser={message.user_id === currentUser}
                      conversationID={conversationID}
                    />
                  ))}
                </MessageContainer>
              </ScrollableContainer>
              {conversationID &&
              <TypeMessage darkMode={darkMode} fontSize={fontSize} newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSendMessage} />}
            </RightColumn>
          </Column2>
        ) : null}
      </Content>
    </MainContainer>
  );
}
