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
    LoadingDot,
    IconContainer,
    Footer,
    CloseButton,
    FontSizer
} from "../Styling/NavBar.styles";
import logo from "@/Pages/Images/puzzle.svg";
import { NavBarModal } from "./NavBarModal";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import settings from "@/Pages/Images/settings.svg";
import whitelogo from "@/Pages/Images/whitepuzzle.svg";
import whitebriefcase from "@/Pages/Images/whitebriefcase.svg";
import whitemessage from "@/Pages/Images/whitemessage-square.svg";
import whitecalendar from "@/Pages/Images/whitecalendar-days.svg";
import whiteuser from "@/Pages/Images/whiteuser.svg";
import whitesettings from "@/Pages/Images/whitesettings.svg";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMap, faTimes, faSun, faMoon, faPlus, faMinus, faTextHeight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { toggleDarkMode, setTextSize, increaseFontSize, decreaseFontSize } from "@/Features/accessibility/accessibilitySlice";
import { getMyNotifications, patchNotification } from "@/Features/notifications/notificationsSlice";

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
    const [footerVisible, setFooterVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("/");
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    useEffect(() => {
        const path = window.location.pathname;
        console.log('Full Path:', path);


        const segments = path.split('/');
        const specificSegment = segments[segments.length - 1];
        console.log('Specific Segment:', specificSegment);
        setActiveTab(path);
    }, []);

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    const toggleFooterVisibility = () => {
        setFooterVisible(!footerVisible);
    };

    const closeFooter = () => {
        setFooterVisible(false);
    };
    return (
        <aside>
            <NavContainer fontSize={fontSize} darkMode={darkMode}>
            <Link fontSize={fontSize} darkMode={darkMode} href="/" onClick={() => handleTabClick("/")}>
          <Logo
    fontSize={fontSize}
    darkMode={darkMode}
    src={darkMode ? whitelogo : logo}
    alt="Logo"
    loading="lazy"
    active={activeTab === "/"}
  />
</Link>
                <Divider fontSize={fontSize} darkMode={darkMode} />

                <Link fontSize={fontSize} darkMode={darkMode} href="/teacher/home" onClick={() => handleTabClick("/teacher/home")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/teacher/home"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitebriefcase : briefcase} alt="Icon 1" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="messages-link" href="/teacher/messages" onClick={() => handleTabClick("/teacher/messages")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/teacher/messages"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitemessage : message} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="interviews-link" href="/teacher/scheduling" onClick={() => handleTabClick("/teacher/scheduling")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/teacher/scheduling"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitecalendar : calendar} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="profile-link" href="/teacher/profile" onClick={() => handleTabClick("/teacher/profile")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/teacher/profile"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whiteuser : user} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} href="/teacher/settings" onClick={() => handleTabClick("/teacher/settings")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/teacher/settings"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitesettings : settings} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <IconContainer fontSize={fontSize} darkMode={darkMode} onClick={toggleFooterVisibility}>
                    <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode} icon={faMap} className="fa-icon" />
                </IconContainer>
            </NavContainer>
            <Footer fontSize={fontSize} darkMode={darkMode} isVisible={footerVisible}>
                <CloseButton fontSize={fontSize} darkMode={darkMode} onClick={closeFooter}>
                    <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode} icon={faTimes} />
                </CloseButton>
                <p>HTML Sitemap: <a href="/">Home</a> | <a href="/about">About</a> | <a href="/teacher/home">Teacher Home</a> | <a href="/teacher/students">Teacher Manage Students</a> | <a href="/teacher/classes">Teacher Manage Classes</a> | <a href="/teacher/messages">Teacher Messages</a> | <a href="/teacher/scheduling">Teacher Schedule</a> | <a href="/teacher/profile">Teacher Profile</a> | <a href="/teacher/settings">Teacher Settings</a> | <a href="/teacher/documents">Teacher Documents</a> </p>
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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    console.log(fontSize);



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
const otherNotifications = useSelector((state) => state.notifications.myNotifications);

const hasUnreadMessages =
    (conversations && conversations.some((conversation) =>
        conversation.messages.some((message) => !message.viewed)
    )) ||
    (otherNotifications && otherNotifications.some((notification) => !notification.viewed));



    const handleMarkAsRead = (messageId, conversationId) => {
        const dummyUserID = user.id;
        dispatch(markMessageAsRead({ messageId, conversationId }));
        dispatch(getNotifications(dummyUserID));
    };

    const handleRedirect = () => {
        window.location.href = '/teacher/messages';
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

    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
        console.log(darkMode);
    };
    const handleTextSizeChange = (size) => {
        dispatch(setTextSize(size));
        console.log(fontSize);
    };



    if (!user || !conversations) {
        return LoadingDot;
    }

    return (
        <header>
            <HeaderContainer fontSize={fontSize} darkMode={darkMode}>
                <Title fontSize={fontSize} darkMode={darkMode}>{header}</Title>
                <UserProfile fontSize={fontSize} darkMode={darkMode}>

                    <NotificationIcon fontSize={fontSize} darkMode={darkMode} onClick={handleDarkModeToggle}
                    >{darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}


                    </NotificationIcon>
                    <NotificationIcon fontSize={fontSize} darkMode={darkMode} onClick={toggleNotificationModal}
                        hasUnreadMessages={hasUnreadMessages}><FontAwesomeIcon icon={faBell} />


                    </NotificationIcon>
                    <FontToggler />
                    <UserDetails fontSize={fontSize} darkMode={darkMode} onClick={toggleProfileModal}>
                        {user && user.profile_image ? (
                            <Avatar fontSize={fontSize} darkMode={darkMode}
                                src={user.profile_image}
                                alt="User Avatar"
                                loading="lazy"
                            />
                        ) : (
                            <Avatar fontSize={fontSize} darkMode={darkMode}
                                src={altAvatarSrc}
                                alt="Default Avatar"
                                loading="lazy"
                            />
                        )}
                        <ExpandIcon
                            icon={faChevronDown}
                            isOpen={isExpanded}
                            fontSize={fontSize}
                            darkMode={darkMode}
                        />
                    </UserDetails>
                </UserProfile>
                <Modal fontSize={fontSize} darkMode={darkMode} isOpen={isProfileModalOpen}>
                    <ModalContent fontSize={fontSize} darkMode={darkMode}>
                        <Link fontSize={fontSize} darkMode={darkMode} href="/teacher/profile">
                            <ModalItem fontSize={fontSize} darkMode={darkMode}>Profile</ModalItem>
                        </Link>
                        <Link fontSize={fontSize} darkMode={darkMode} href="/teacher/settings">
                            <ModalItem fontSize={fontSize} darkMode={darkMode}>Settings</ModalItem>
                        </Link>
                        <ModalItem fontSize={fontSize} darkMode={darkMode} as="button" onClick={handleLogout}>Logout</ModalItem>
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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    return (
        <AppContainer fontSize={fontSize} darkMode={darkMode} >
            {isMobile ? null : <Sidebar />}
            <MainContent header={header}>{children}</MainContent>

        </AppContainer>
    );
}

export default NavBar;


const FontToggler = () => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const darkMode = useSelector((state) => state.accessibility.darkMode);

    const increaseFont = () => {
        if (fontSize !== '1.12em') { // Compare against 'large' instead of "1.12em"
            dispatch(increaseFontSize());
        }
    };

    const decreaseFont = () => {
        if (fontSize !== '1em') { // Compare against 'small' instead of "1em"
            dispatch(decreaseFontSize());
        }
    };

    return (
        <FontSizer fontSize={fontSize} darkMode={darkMode}>
            <FontAwesomeIcon
                onClick={() => { decreaseFont(); }}
                icon={faMinus}
            />
            <FontAwesomeIcon
                icon={faTextHeight}
            />
            <FontAwesomeIcon
                onClick={() => { increaseFont(); }}
                icon={faPlus}
            />
        </FontSizer>
    );
};




function NotificationModal({
    isOpen,
    conversations,
    handleRedirect,
    handleMarkAsRead,
    currentUser,
    notificationsStatus,
    markMessageStatus
}) {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.accessibility.darkMode);
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const notifications = useSelector((state) => state.notifications.myNotifications);

    // Log notifications whenever they change
    useEffect(() => {
        if (notifications) {
            console.log("Notifications:", notifications);
        }
    }, [notifications]);

    // Fetch notifications only on component mount
    useEffect(() => {
        dispatch(getMyNotifications());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const markAsRead = (notificationId) => {
        console.log("firing",)
        dispatch(patchNotification({
            notificationId,
            viewed: true,  // Only updating the 'viewed' field
        }));
    };


    return (
        <NotificationModalContainer fontSize={fontSize} darkMode={darkMode} isOpen={isOpen}>
            {(conversations === null || conversations.length === 0) && (notifications === null || notifications.length === 0) ? (
                <NoNotificationsMessage fontSize={fontSize} darkMode={darkMode}>
                    No new notifications
                </NoNotificationsMessage>
            ) : (
                <>
                    {/* Display Conversations */}
                    {conversations && conversations.length > 0 && conversations.map((conversation) => {
                        const otherUser = conversation.users.find(user => user.id !== currentUser?.id);

                        return (
                            <Conversation fontSize={fontSize} darkMode={darkMode} key={conversation.id}>
                                <ConversationInfo fontSize={fontSize} darkMode={darkMode}>
                                    <div>From: {otherUser ? otherUser.name : 'Unknown'}</div>
                                </ConversationInfo>
                                <MessagesList fontSize={fontSize} darkMode={darkMode}>
                                    {conversation.messages.map((message) => (
                                        <Message fontSize={fontSize} darkMode={darkMode} key={message.id}>
                                            <div>Message: {message.content}</div>
                                            <div>Received: {formatDate(message.created_at)}</div>
                                            <Button fontSize={fontSize} darkMode={darkMode} onClick={() => handleMarkAsRead(message.id, conversation.id)}>
                                                Mark as Read
                                            </Button>
                                            <Button fontSize={fontSize} darkMode={darkMode} onClick={handleRedirect}>
                                                Go to Messages
                                            </Button>
                                        </Message>
                                    ))}
                                </MessagesList>
                            </Conversation>
                        );
                    })}

{notifications && notifications.length > 0 && notifications
    .filter(notification => !notification.viewed)  // Filter for notifications that have been viewed
    .map((notification) => (
        <Conversation fontSize={fontSize} darkMode={darkMode} key={notification.id}>
            <ConversationInfo fontSize={fontSize} darkMode={darkMode}>
                <MessagesList fontSize={fontSize} darkMode={darkMode}>
                    <Message fontSize={fontSize} darkMode={darkMode}>
                        <div>{notification.content}</div>
                        <div>Received: {formatDate(notification.created_at)}</div>
                        {notification.interview_date && (
                            <div>Interview Date: {formatDate(notification.interview_date)}</div>
                        )}
                        {!notification.viewed && (
                            <Button
                                fontSize={fontSize}
                                darkMode={darkMode}
                                onClick={() => markAsRead(notification.id)}
                            >
                                Mark as Read
                            </Button>
                        )}
                    </Message>
                </MessagesList>
            </ConversationInfo>
        </Conversation>
    ))}
                </>
            )}
        </NotificationModalContainer>
    );
}












