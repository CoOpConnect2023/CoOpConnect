import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "@/Pages/Images/puzzle.svg";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import settings from "@/Pages/Images/settings.svg";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const appUrl = import.meta.env.VITE_APP_URL;

function Sidebar() {
  return (
    <aside>
      <NavContainer>
        <Link href="/">
          <Logo src={logo} alt="Logo" loading="lazy" />
        </Link>
        <Divider />
        <Link href="/student/home">
          <IconButton>
            <Icon src={briefcase} alt="Icon 1" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/student/messages">
          <IconButton>
            <Icon src={message} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/student/interviews">
          <IconButton>
            <Icon src={calendar} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/student/profile">
          <IconButton>
            <Icon src={user} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/student/settings">
          <IconButton>
            <Icon src={settings} alt="" loading="lazy" />
          </IconButton>
        </Link>
      </NavContainer>
    </aside>
  );
}

function Header({ header }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [conversations, setConversations] = React.useState(null);

  const altAvatarSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/c449c761188f38db922c89455e070256b822a267e33f51baa6901c76b73a4e78?apiKey=d66532d056b14640a799069157705b77&";

  useEffect(() => {
    // Fetch the XSRF token from cookies and set it in Axios headers
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

    // Fetch the user ID
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${appUrl}/api/user-id`);
            const fetchedUser = response.data.user;
            setUser(fetchedUser); // Update user state

            // Check if fetchedUser exists and has an id before accessing it
            if (fetchedUser && fetchedUser.id) {
                const userId = fetchedUser.id;

                // Fetch notifications/messages for the user
                const notificationsResponse = await axios.get(
                    `${appUrl}/api/v1/messages/${userId}`
                );
                console.log(notificationsResponse.data);
                setConversations(notificationsResponse.data.conversations);
            } else {
                console.error("User data not found in response");
            }
        } catch (error) {
            console.error("Error fetching user and notifications:", error);
        }
    };

    fetchUser();
}, []);


const markMessageAsRead = async (messageId, conversationId) => {
    try {
      await axios.patch(`${appUrl}/api/v1/messages/${messageId}/mark-as-read`);
      console.log(`Message ${messageId} marked as read`);

      // Update the state instantly
      setConversations(prevConversations =>
        prevConversations.map(conversation => {
          if (conversation.id === conversationId) {
            return {
              ...conversation,
              messages: conversation.messages.map(message => {
                if (message.id === messageId) {
                  return { ...message, viewed: 1 };
                }
                return message;
              })
            };
          }
          return conversation;
        })
      );

      // Optionally, refetch conversations to get updated data
      // refetchConversations();
    } catch (error) {
      console.error(`Error marking message ${messageId} as read:`, error);
    }
  };

const handleMarkAsRead = (messageId) => {
    markMessageAsRead(messageId);

};

const handleRedirect = () => {
    window.location.href = '/student/messages';
  };


  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    setIsNotificationModalOpen(false);
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  const toggleNotificationModal = (e) => {
    e.stopPropagation();
    setIsNotificationModalOpen(!isNotificationModalOpen);
    setIsProfileModalOpen(false);
    setIsExpanded(!isExpanded); // Toggle expanded state
  };

  const hasUnreadMessages =
    conversations &&
    conversations.some((conversation) =>
      conversation.messages.some((message) => !message.viewed)
    );

  return (
    <header>
      <HeaderContainer>
        <Title>{header}</Title>
        <UserProfile>

          <NotificationIcon onClick={toggleNotificationModal}
            hasUnreadMessages={hasUnreadMessages}><FontAwesomeIcon icon={faBell} />


            </NotificationIcon>
           <UserDetails onClick={toggleProfileModal}>
            {user && user.profile_image ? (
              <Avatar
                src={user.profile_image}
                alt="User Avatar"
                loading="lazy"
              />
            ) : (
              <Avatar
                src={altAvatarSrc}
                alt="Default Avatar"
                loading="lazy"
              />
            )}
            <ExpandIcon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"
              alt="Expand"
              loading="lazy"
              isOpen={isExpanded}
            />
          </UserDetails>
        </UserProfile>
        <Modal isOpen={isProfileModalOpen}>
          <ModalContent>
            <ModalItem>Profile</ModalItem>
            <ModalItem>Settings</ModalItem>
            <ModalItem>Logout</ModalItem>
          </ModalContent>
        </Modal>
        <NotificationModal isOpen={isNotificationModalOpen} conversations={conversations} handleMarkAsRead={handleMarkAsRead} handleRedirect={handleRedirect} currentUser={user}>
          <ModalContent>
            <ModalItem>Notification 1</ModalItem>
            <ModalItem>Notification 2</ModalItem>
            <ModalItem>Notification 3</ModalItem>
          </ModalContent>
        </NotificationModal>
      </HeaderContainer>
    </header>
  );
}

function MainContent({ header, children }) {
  return (
    <Main>
      <ContentContainer>
        <Header header={header} />
        {children}
      </ContentContainer>
    </Main>
  );
}

function NavBar({ header, children }) {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent header={header}>{children}</MainContent>
    </AppContainer>
  );
}

export default NavBar;

const AppContainer = styled.div`
  background-color: var(--Schemes-Background, #fff7ff);
  display: flex;
  gap: 0px;
  height: 100vh; /* Ensure it takes the full viewport height */
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const NavContainer = styled.nav`
  align-items: center;
  border: 1px solid rgba(123, 117, 127, 1);
  background-color: var(--White, #fff);
  display: flex;
  flex-direction: column;
  width: 90px;
  padding: 30px 20px 20px;
  border-radius: 0 10px 10px 0;
  height: 100vh;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Logo = styled.img`
  aspect-ratio: 1.25;
  object-fit: auto;
  width: 50px;
`;

const Divider = styled.hr`
  border: 1px solid #000;
  margin-top: 29px;
  align-self: stretch;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-radius: 10px;
  border: none;
  margin-top: 30px;
  cursor: pointer;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 30px;
`;

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #000;
  font: 600 36px/122% Poppins, sans-serif;
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  position: relative;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #EDDCFF;
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  /* Icon styling */
  svg {
    color: white;
    font-size: 20px; /* Adjust icon size */
  }

  /* Indicator for unread messages */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    display: ${(props) => (props.hasUnreadMessages ? "block" : "none")};
  }
`;

const NotificationBadge = styled.div`
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  margin-right: 5px;
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 2px solid rgba(0, 0, 0, 1);
  background-color: var(--Schemes-Primary-Container, #eddcff);
  padding: 5px 10px;
  margin-top: 7px;
`;

const Avatar = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 30px;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 50%;
`;

const ExpandIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  width: 24px;
  margin: auto 0;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) =>
    isOpen ? "rotate(-360deg)" : "rotate(-270deg)"}; // Adjusted rotation here
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto; /* Ensure it scrolls if content overflows */
`;

const Modal = styled.div`
  position: absolute;
  top: 60px; /* Adjust according to your header height */
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 02px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;

const NotificationModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 60px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  max-height: 80vh;
  overflow-y: auto;
`;

const NotificationModalContent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 20px;
`;

const Conversation = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fafafa;
`;

const ConversationInfo = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: #555;
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;

`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

   &:not(:last-child) {
    margin-right: 1vw;
  }
`;

function NotificationModal({ isOpen, conversations, handleMarkAsRead, handleRedirect, currentUser }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <NotificationModalContainer isOpen={isOpen}>
      {isOpen && (
        <NotificationModalContent>
          {conversations === null || conversations.length === 0 ? (
            <NoNotificationsMessage>No new notifications</NoNotificationsMessage>
          ) : (
            conversations.map((conversation) => {
              const otherUser = conversation.users.find(user => user.id !== currentUser?.id);

              return (
                <Conversation key={conversation.id}>
                  <ConversationInfo>
                    <div>From: {otherUser ? otherUser.name : 'Unknown'}</div>
                  </ConversationInfo>
                  <MessagesList>
                    {conversation.messages.map((message) => (
                      <Message key={message.id}>
                        <div>Message: {message.content}</div>
                        <div>Received: {formatDate(message.created_at)}</div>
                        <Button onClick={() => handleMarkAsRead(message.id)}>
                          Mark as Read
                        </Button>
                        <Button onClick={handleRedirect}>
                          Go to Messages
                        </Button>
                      </Message>
                    ))}
                  </MessagesList>
                </Conversation>
              );
            })
          )}
        </NotificationModalContent>
      )}
    </NotificationModalContainer>
  );
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 80vh;
`;

const ModalItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(237, 220, 255);
  }
`;

const NoNotificationsMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #666;
`;


