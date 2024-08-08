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
    LoadingContainer,
    LoadingDot,
    IconContainer,
    Footer,
    CloseButton
} from "../Styling/NavBar.styles";
import logo from "@/Pages/Images/puzzle.svg";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import settings from "@/Pages/Images/settings.svg";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMap, faTimes, faFile, faList, faClipboard, faFolder, faSearch } from "@fortawesome/free-solid-svg-icons";
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


function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

function Sidebar() {

    const [activeTab, setActiveTab] = useState("/");
    const [footerVisible, setFooterVisible] = useState(false);

    const handleTabClick = (path) => {
      setActiveTab(path);
    };

    useEffect(() => {
        const path = window.location.pathname;
        console.log('Full Path:', path);


        const segments = path.split('/');
        const specificSegment = segments[segments.length - 1];
        console.log('Specific Segment:', specificSegment);
        setActiveTab(path)
      }, []);



      const toggleFooterVisibility = () => {
        setFooterVisible(!footerVisible);
      };

      const closeFooter = () => {
        setFooterVisible(false);
      };


    return (
        <aside>
          <NavContainer>
            <Link href="/" onClick={() => handleTabClick("/")}>
              <Logo src={logo} alt="Logo" loading="lazy" active={activeTab === "/"} />
            </Link>
            <Divider />

              <Link data-test-id="home-link" href="/employer/home" onClick={() => handleTabClick("/employer/home")}>
                <IconButton active={activeTab === "/employer/home"}>
                  <Icon src={briefcase} alt="Icon 1" loading="lazy" />
                </IconButton>
              </Link>

              <Link data-test-id="messages-link" href="/employer/messages" onClick={() => handleTabClick("/employer/messages")}>
                <IconButton active={activeTab === "/employer/messages"}>
                  <Icon src={message} alt="" loading="lazy" />
                </IconButton>
              </Link>
              <Link data-test-id="interviews-link"  href="/employer/interviews" onClick={() => handleTabClick("/employer/interviews")} >
                <IconButton active={activeTab === "/employer/interviews"}>
                  <Icon src={calendar} alt="" loading="lazy" />
                </IconButton>
              </Link>
              <Link  href="/employer/profile" onClick={() => handleTabClick("/employer/profile")} data-test-id="profile-link">
                <IconButton active={activeTab === "/employer/profile"}>
                  <Icon src={user} alt="" loading="lazy" />
                </IconButton>
              </Link>
              <Link data-test-id="settings-link" href="/employer/settings" onClick={() => handleTabClick("/employer/settings")}>
                <IconButton active={activeTab === "/employer/settings"}>
                  <Icon src={settings} alt="" loading="lazy" />
                </IconButton>
              </Link>

              <IconContainer onClick={toggleFooterVisibility}>
                    <FontAwesomeIcon icon={faMap} className="fa-icon" />
                </IconContainer>
            </NavContainer>
            <Footer isVisible={footerVisible}>
        <CloseButton onClick={closeFooter}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <p>HTML Sitemap: <a href="/">Home</a> | <a href="/about">About</a> | <a href="/employer/home">Employer Home</a> | <a href="/employer/messages">Employer Messages</a> | <a href="/employer/interviews">Employer Schedule</a> | <a href="/employer/profile">Employer Profile</a> | <a href="/employer/settings">Employer Settings</a> | <a href="/employer/documents">Employer Documents</a> </p>
      </Footer>
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
        window.location.href = '/employer/messages';
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
        return LoadingDot;
    }

    return (
        <header>
            {user &&
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
                        <Link href="/employer/profile">
                        <ModalItem>Profile</ModalItem>
                        </Link>
                        <Link href="/employer/profile">
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
            }
        </header>
    );
}

function MainContent({ header, children }) {
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 991;

    return (
        <Main>
            <ContentContainer>
                <Header header={header} />{isMobile && <Sidebar />}
                {children}

            </ContentContainer>
        </Main>
    );
}

function NavBar({ header, children }) {
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 991;

    return (
        <AppContainer>
            {isMobile ? null : <Sidebar />}
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





