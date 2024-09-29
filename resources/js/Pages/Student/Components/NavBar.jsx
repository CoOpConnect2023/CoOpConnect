import React, { useState, useEffect } from "react";
import { updateUserPreferences } from "@/Features/users/userSlice";
import styled from "styled-components";
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
    RightAlignedItems,
    LoadingContainer,
    LoadingDot,
    ScrollToTopButton,
    Footer,
    IconContainer,
    CloseButton,
    FontSizer
} from "../Styling/NavBar.styles";
import logo from "@/Pages/Images/puzzle.svg";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import whitelogo from "@/Pages/Images/whitepuzzle.svg";
import whitebriefcase from "@/Pages/Images/whitebriefcase.svg";
import whitemessage from "@/Pages/Images/whitemessage-square.svg";
import whitecalendar from "@/Pages/Images/whitecalendar-days.svg";
import whiteuser from "@/Pages/Images/whiteuser.svg";
import whitesettings from "@/Pages/Images/whitesettings.svg";
import { useForm } from '@inertiajs/react';
import settings from "@/Pages/Images/settings.svg";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMap, faTimes, faList, faSun, faMoon, faPlus, faMinus, faTextHeight, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, setTextSize, increaseFontSize, decreaseFontSize } from "@/Features/accessibility/accessibilitySlice";
import { getMyNotifications, patchNotification } from "@/Features/notifications/notificationsSlice";

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

function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollPosition;
}


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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [previousDarkMode, setPreviousDarkMode] = useState(darkMode);
    const [previousFontSize, setPreviousFontSize] = useState(fontSize);
    const [activeTab, setActiveTab] = useState("/");
    useEffect(() => {
        const path = window.location.pathname;



        const segments = path.split('/');
        const specificSegment = segments[segments.length - 1];

        setActiveTab(path)
      }, []);

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

    const [footerVisible, setFooterVisible] = useState(false);

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
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="home-link" href="/student/home" onClick={() => handleTabClick("/student/home")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/home"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitebriefcase : briefcase} alt="Icon 1" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="viewapplications-link" href="/student/viewapplications" onClick={() => handleTabClick("/student/viewapplications")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/viewapplications"}>
                    <FontAwesomeIcon
  fontSize={fontSize}
  icon={faList}
  style={{
    fontSize: '1.5rem',
    color: darkMode ? 'white' : 'black'
  }}
/>
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="messages-link" href="/student/messages" onClick={() => handleTabClick("/student/messages")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/messages"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitemessage : message} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="interviews-link" href="/student/interviews" onClick={() => handleTabClick("/student/interviews")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/interviews"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitecalendar : calendar} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} href="/student/profile" onClick={() => handleTabClick("/student/profile")} data-test-id="profile-link">
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/profile"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whiteuser : user} alt="" loading="lazy" />
                    </IconButton>
                </Link>
                <Link fontSize={fontSize} darkMode={darkMode} data-test-id="settings-link" href="/student/settings" onClick={() => handleTabClick("/student/settings")}>
                    <IconButton fontSize={fontSize} darkMode={darkMode} active={activeTab === "/student/settings"}>
                    <Icon fontSize={fontSize} darkMode={darkMode} src={darkMode ? whitesettings : settings} alt="" loading="lazy" />
                    </IconButton>
                </Link>

                <IconContainer fontSize={fontSize} darkMode={darkMode} data-test-id="map-link" onClick={toggleFooterVisibility}>
                    <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode} icon={faMap} className="fa-icon"  />
                </IconContainer>
            </NavContainer>
            <Footer fontSize={fontSize} darkMode={darkMode} isVisible={footerVisible}>
        <CloseButton fontSize={fontSize} darkMode={darkMode} onClick={closeFooter}>
          <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode} icon={faTimes} />
        </CloseButton>
        <p>HTML Sitemap: <a href="/">Home</a> | <a href="/about">About</a> | <a href="/student/home">Student Home</a> | <a href="/student/home">Student Home</a> | <a href="/student/messages">Student Messages</a> | <a href="/student/interviews">Student Schedule</a> | <a href="/student/profile">Student Profile</a> | <a href="/student/settings">Student Settings</a> | <a href="/student/documents">Student Documents</a> | <a href="/student/reflections">Student Reflections</a> | <a href="/student/viewapplications">Student Applications</a> </p>
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
                        <Link fontSize={fontSize} darkMode={darkMode} href="/student/profile">
                            <ModalItem fontSize={fontSize} darkMode={darkMode}>Profile</ModalItem>
                        </Link>
                        <Link fontSize={fontSize} darkMode={darkMode} href="/student/settings">
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

    return (
        <AppContainer fontSize={fontSize} darkMode={darkMode}>
            <Sidebar />
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
            <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode}
                onClick={() => { decreaseFont(); }}
                icon={faMinus}
            />
            <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode}
                icon={faTextHeight}
            />
            <FontAwesomeIcon fontSize={fontSize} darkMode={darkMode}
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
};






