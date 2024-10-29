import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from '@inertiajs/react';
import { useTheme } from "@/ThemeContext";
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
    CloseButton,
    FontSizer,
    NavContainerAbsolute
} from "../Styling/NavBar.styles";
import logo from "@/Pages/Images/puzzle.svg";
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
import { getMyNotifications, patchNotification } from "@/Features/notifications/notificationsSlice";
import { updateUserPreferences } from "@/Features/users/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMap, faTimes, faList, faSun, faMoon, faPlus, faMinus, faTextHeight, faChevronDown, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, setTextSize, increaseFontSize, decreaseFontSize } from "@/Features/accessibility/accessibilitySlice";
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
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("/");
    const [footerVisible, setFooterVisible] = useState(false);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [previousDarkMode, setPreviousDarkMode] = useState(darkMode);
    const [previousFontSize, setPreviousFontSize] = useState(fontSize);
    const { theme } = useTheme();


    const convertFontSizeToString = (fontSize) => {
        if (fontSize === "1em") {
            return "small";
        } else if (fontSize === "1.07em") {
            return "medium";
        } else if (fontSize === "1.12em") {
            return "large";
        } else {
            return "unknown"; // Optional: Handle unexpected font sizes
        }
    };


    const handleTabClick = (path) => {
        // Check if darkMode or fontSize has changed
        if (darkMode !== previousDarkMode || fontSize !== previousFontSize) {
            const fontSizeString = convertFontSizeToString(fontSize);
            dispatch(updateUserPreferences({
                darkMode: darkMode,
                fontSize: fontSizeString,
            }));

            // Update the previous darkMode and fontSize to the current ones
            setPreviousDarkMode(darkMode);
            setPreviousFontSize(fontSize);
        }

        // Set active tab
        setActiveTab(path);
    };

    useEffect(() => {
        const path = window.location.pathname;



        const segments = path.split('/');
        const specificSegment = segments[segments.length - 1];

        setActiveTab(path);
    }, []);



    const toggleFooterVisibility = () => {
        setFooterVisible(!footerVisible);
    };

    const closeFooter = () => {
        setFooterVisible(false);
    };


    return (
        <aside>
            <NavContainerAbsolute fontSize={fontSize} darkMode={darkMode} theme={theme}>


<Link theme={theme} fontSize={fontSize} darkMode={darkMode} href="/" onClick={() => handleTabClick("/")}>
    <Logo theme={theme}
        fontSize={fontSize}
        darkMode={darkMode}
        src={darkMode ? whitelogo : logo}
        alt="Logo"
        loading="lazy"
        active={activeTab === "/"}
    />
</Link>
<Divider theme={theme} fontSize={fontSize} darkMode={darkMode} />

<Link theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="home-link" href="/employer/home" >
    <IconButton theme={theme} onClick={() => handleTabClick("/employer/home")} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/home"}>
        <Icon theme={theme} fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitebriefcase : briefcase} alt="Icon 1" loading="lazy" />
    </IconButton>
</Link>

<Link theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="home-link" href="/employer/hiredstudents" onClick={() => handleTabClick("/employer/hiredstudents")}>
    <IconButton theme={theme} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/hiredstudents"}>
        <FontAwesomeIcon theme={theme}
            icon={faUserCheck}
            style={{ fontSize: `calc(${fontSize} + 0.4em)` }}  // Slightly larger than fontSize
            color={darkMode ? '#ffffff' : '#000000'}
            alt="User Check Icon"
        />
    </IconButton>
</Link>

<Link theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="messages-link" href="/employer/messages" onClick={() => handleTabClick("/employer/messages")}>
    <IconButton theme={theme} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/messages"}>
        <Icon theme={theme} fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitemessage : message} alt="" loading="lazy" />
    </IconButton>
</Link>
<Link theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="interviews-link" href="/employer/interviews" onClick={() => handleTabClick("/employer/interviews")} >
    <IconButton theme={theme} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/interviews"}>
        <Icon theme={theme} fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitecalendar : calendar} alt="" loading="lazy" />
    </IconButton>
</Link>
<Link theme={theme} fontSize={fontSize} darkMode={darkMode} href="/employer/profile" onClick={() => handleTabClick("/employer/profile")} data-test-id="profile-link">
    <IconButton theme={theme} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/profile"}>
        <Icon theme={theme} fontSize={fontSize} darkMode={darkMode} src={darkMode ? whiteuser : user} alt="" loading="lazy" />
    </IconButton>
</Link>
<Link theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="settings-link" href="/employer/settings" onClick={() => handleTabClick("/employer/settings")}>
    <IconButton theme={theme} fontSize={fontSize} darkMode={darkMode} active={activeTab === "/employer/settings"}>
        <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitesettings : settings} alt="" loading="lazy" />
    </IconButton>
</Link>

<IconContainer theme={theme} fontSize={fontSize} darkMode={darkMode} data-test-id="map-link" onClick={toggleFooterVisibility}>
    <FontAwesomeIcon theme={theme} fontSize={fontSize} darkMode={darkMode} icon={faMap} className="fa-icon" />
</IconContainer>
</NavContainerAbsolute>

            <NavContainer fontSize={fontSize} darkMode={darkMode} theme={theme}>



            </NavContainer>
            <Footer theme={theme} fontSize={fontSize} darkMode={darkMode} isVisible={footerVisible}>
                <CloseButton theme={theme} fontSize={fontSize} darkMode={darkMode} onClick={closeFooter}>
                    <FontAwesomeIcon theme={theme} fontSize={fontSize} darkMode={darkMode} icon={faTimes} />
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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const windowSize = useWindowSize();
    const isMobile = windowSize.width <= 991;
    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = React.useState(false);
    const [animate, setAnimate] = useState(true);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const { post } = useForm();
    const { theme } = useTheme();
    const altAvatarSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/c449c761188f38db922c89455e070256b822a267e33f51baa6901c76b73a4e78?apiKey=d66532d056b14640a799069157705b77&";

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(false); // Disable animation after it has been played once
        }, 500); // Match the duration of the animation

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

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
    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());

    };

    if (!user || !conversations) {
        return LoadingDot;
    }

    const firstName = user.name.split(' ')[0];
    const possessiveName = firstName.endsWith('s') ? `${firstName}'` : `${firstName}s`;

    return (
        <header>
            <HeaderContainer fontSize={fontSize} darkMode={darkMode}>
            {!isMobile && (
                    <Title fontSize={fontSize} darkMode={darkMode}>
                        {possessiveName} {header}
                    </Title>
                )}
                <UserProfile fontSize={fontSize} darkMode={darkMode}>

                    <NotificationIcon fontSize={fontSize} darkMode={darkMode} onClick={handleDarkModeToggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDarkModeToggle()}
                        tabIndex="0"
                        aria-label="Toggle dark mode"
                    >{darkMode ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}


                    </NotificationIcon>
                    <NotificationIcon fontSize={fontSize} darkMode={darkMode} onClick={toggleNotificationModal}
                        hasUnreadMessages={hasUnreadMessages} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleNotificationModal(e)}
                        tabIndex="0"
                        aria-label="View notifications"><FontAwesomeIcon icon={faBell} />


                    </NotificationIcon>
                    <FontToggler />
                    <UserDetails fontSize={fontSize} darkMode={darkMode} onClick={toggleProfileModal}  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleProfileModal()}
                        tabIndex="0"
                        aria-label="User menu">
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
                        <Link fontSize={fontSize} darkMode={darkMode} href="/employer/profile">
                            <ModalItem fontSize={fontSize} darkMode={darkMode}>Profile</ModalItem>
                        </Link>
                        <Link fontSize={fontSize} darkMode={darkMode} href="/employer/settings">
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
                <Header header={header} />

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
    const { theme } = useTheme();

    return (
        <AppContainer theme={theme} fontSize={fontSize} darkMode={darkMode}>
            <Sidebar />
            <MainContent theme={theme} header={header}>{children}</MainContent>
        </AppContainer>
    );
}

export default NavBar;

const FontToggler = () => {
    const dispatch = useDispatch();
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const darkMode = useSelector((state) => state.accessibility.darkMode);

    const increaseFont = () => {
        if (fontSize !== '1.12em') {
            dispatch(increaseFontSize());
        }
    };

    const decreaseFont = () => {
        if (fontSize !== '1em') {
            dispatch(decreaseFontSize());
        }
    };

    const handleKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevents page scrolling when space is pressed
            action();
        }
    };

    return (
        <FontSizer fontSize={fontSize} darkMode={darkMode}>
            <FontAwesomeIcon
                onClick={decreaseFont}
                onKeyDown={(e) => handleKeyDown(e, decreaseFont)}
                tabIndex="0"
                icon={faMinus}
                aria-label="Decrease font size"
                role="button"
            />
            <FontAwesomeIcon
                icon={faTextHeight}
                aria-hidden="true" // Decorative, so it doesn’t need to be focusable
            />
            <FontAwesomeIcon
                onClick={increaseFont}
                onKeyDown={(e) => handleKeyDown(e, increaseFont)}
                tabIndex="0"
                icon={faPlus}
                aria-label="Increase font size"
                role="button"
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
    const { theme } = useTheme();
    const notifications = useSelector((state) => state.notifications.myNotifications);




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

        dispatch(patchNotification({
            notificationId,
            viewed: true,  // Only updating the 'viewed' field
        }));
    };


    return (
        <NotificationModalContainer theme={theme} fontSize={fontSize} darkMode={darkMode} isOpen={isOpen}>
            {(conversations === null || conversations.length === 0) && (notifications === null || notifications.length === 0) ? (
                <NoNotificationsMessage theme={theme} fontSize={fontSize} darkMode={darkMode}>
                    No new notifications
                </NoNotificationsMessage>
            ) : (
                <>
                    {/* Display Conversations */}
                    {conversations && conversations.length > 0 && conversations.map((conversation) => {
                        const otherUser = conversation.users.find(user => user.id !== currentUser?.id);

                        return (
                            <Conversation theme={theme} fontSize={fontSize} darkMode={darkMode} key={conversation.id}>
                                <ConversationInfo theme={theme} fontSize={fontSize} darkMode={darkMode}>
                                    <div>From: {otherUser ? otherUser.name : 'Unknown'}</div>
                                </ConversationInfo>
                                <MessagesList theme={theme} fontSize={fontSize} darkMode={darkMode}>
                                    {conversation.messages.map((message) => (
                                        <Message theme={theme} fontSize={fontSize} darkMode={darkMode} key={message.id}>
                                            <div>Message: {message.content}</div>
                                            <div>Received: {formatDate(message.created_at)}</div>
                                            <Button theme={theme} fontSize={fontSize} darkMode={darkMode} onClick={() => handleMarkAsRead(message.id, conversation.id)}>
                                                Mark as Read
                                            </Button>
                                            <Button theme={theme} fontSize={fontSize} darkMode={darkMode} onClick={handleRedirect}>
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
                            <Conversation theme={theme} fontSize={fontSize} darkMode={darkMode} key={notification.id}>
                                <ConversationInfo theme={theme} fontSize={fontSize} darkMode={darkMode}>
                                    <MessagesList theme={theme} fontSize={fontSize} darkMode={darkMode}>
                                        <Message theme={theme} fontSize={fontSize} darkMode={darkMode}>
                                            <div>{notification.content}</div>
                                            <div>Received: {formatDate(notification.created_at)}</div>
                                            {notification.interview_date && (
                                                <div>Interview Date: {formatDate(notification.interview_date)}</div>
                                            )}
                                            {!notification.viewed && (
                                                <Button theme={theme}
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





