import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from '@inertiajs/react';
import {
    AppContainer,
    NavContainer,
    Logo,
    Divider,
    IconButton,
    Icon,
    ContentContainer,
    HeaderContainer,
    Title,
    UserProfile,
    NotificationIcon,
    NotificationBadge,
    UserDetails,
    Avatar,
    ExpandIcon,
    Main,
    Modal,
    NotificationModalContainer,
    NotificationModalContent,
    Conversation,
    ConversationInfo,
    MessagesList,
    Message,
    Button,
    ModalContent,
    ModalItem,
    NoNotificationsMessage,
} from "../Styling/NavBar.styles";
import logo from "@/Pages/Images/puzzle.svg";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import settings from "@/Pages/Images/settings.svg";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {

    selectUserStatus,
    selectUser,
    getUser,
    updateUserProfile,


} from "@/Features/users/userSlice";
import {

    selectMessagesStatus,
    selectMessages,
    selectNotifications,
    selectNotificationsStatus,
    getNotifications,
    markMessageAsRead,
    selectMarkMessageAsReadStatus,


} from "@/Features/messages/messagesSlice";


function Sidebar() {
  return (
    <aside>
      <NavContainer>
        <Link href="/">
          <Logo src={logo} alt="Logo" loading="lazy" />
        </Link>
        <Divider />
        <Link href="/teacher/home">
          <IconButton>
            <Icon src={briefcase} alt="Icon 1" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/teacher/messages">
          <IconButton>
            <Icon src={message} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/teacher/scheduling">
          <IconButton>
            <Icon src={calendar} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/teacher/profile">
          <IconButton>
            <Icon src={user} alt="" loading="lazy" />
          </IconButton>
        </Link>
        <Link href="/teacher/settings">
          <IconButton>
            <Icon src={settings} alt="" loading="lazy" />
          </IconButton>
        </Link>
      </NavContainer>
    </aside>
  );
}

function Header({ header }) {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const notifications = useSelector(selectNotifications);
    const notificationsStatus = useSelector(selectNotificationsStatus);
    const markMessageStatus = useSelector(selectMarkMessageAsReadStatus);

    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const { post } = useForm();

    const altAvatarSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/c449c761188f38db922c89455e070256b822a267e33f51baa6901c76b73a4e78?apiKey=d66532d056b14640a799069157705b77&";



    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user && user.id) {
            const dummyUserID = user.id;
            dispatch(getNotifications(dummyUserID));

        }
    }, [user, dispatch]);

    const conversations = notifications?.conversations;

    const hasUnreadMessages =
        conversations &&
        conversations.some((conversation) =>
            conversation.messages.some((message) => !message.viewed)
        );


    const handleMarkAsRead = (messageId, conversationId) => {
        const dummyUserID = user.id;
        dispatch(markMessageAsRead({ messageId, conversationId }));
        dispatch(getNotifications(dummyUserID));
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

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };



    if (!user || !conversations) {
        return <div>Loading...</div>;
    }

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
                        <Link href="/student/profile">
                        <ModalItem>Profile</ModalItem>
                        </Link>
                        <Link href="/student/profile">
                        <ModalItem>Settings</ModalItem>
                        </Link>
                        <ModalItem as="button" onClick={handleLogout}>Logout</ModalItem>
                    </ModalContent>
                </Modal>
                <NotificationModal isOpen={isNotificationModalOpen} conversations={conversations} handleMarkAsRead={handleMarkAsRead} handleRedirect={handleRedirect} currentUser={user} notificationsStatus={notificationsStatus}>
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



function NotificationModal({ isOpen, conversations, handleMarkAsRead, handleRedirect, currentUser, notificationsStatus, markMessageStatus }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <NotificationModalContainer isOpen={isOpen}>
            {markMessageStatus === 'loading' ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : conversations === null || conversations.length === 0 ? (
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
                                        <Button onClick={() => handleMarkAsRead(message.id, conversation.id)}>
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
        </NotificationModalContainer>
    );
}





