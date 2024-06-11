import * as React from "react";
import styled from "styled-components";
import logo from "@/Pages/Images/puzzle.svg";
import briefcase from "@/Pages/Images/briefcase.svg";
import message from "@/Pages/Images/message-square.svg";
import calendar from "@/Pages/Images/calendar-days.svg";
import user from "@/Pages/Images/user.svg";
import settings from "@/Pages/Images/settings.svg";
function Sidebar() {
    return (
        <aside>
            <NavContainer>
                <Logo src={logo} alt="Logo" loading="lazy" />
                <Divider />
                <IconButton>
                    <Icon src={briefcase} alt="Icon 1" loading="lazy" />
                </IconButton>
                <IconButton>
                    <Icon src={message} alt="" loading="lazy" />
                </IconButton>
                <IconButton>
                    <Icon src={calendar} alt="" loading="lazy" />
                </IconButton>
                <IconButton>
                    <Icon src={user} alt="" loading="lazy" />
                </IconButton>
                <IconButton>
                    <Icon src={settings} alt="" loading="lazy" />
                </IconButton>
            </NavContainer>
        </aside>
    );
}

function Header({ header }) {
    return (
        <header>
            <HeaderContainer>
                <Title>{header}</Title>
                <UserProfile>
                    <ProfileImage
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/abace578b51f3c9457a40eb525610751844e11d28da3970b407be86705a69459?apiKey=d66532d056b14640a799069157705b77&"
                        alt="User"
                        loading="lazy"
                    />
                    <UserDetails>
                        <Avatar
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c449c761188f38db922c89455e070256b822a267e33f51baa6901c76b73a4e78?apiKey=d66532d056b14640a799069157705b77&"
                            alt="Avatar"
                            loading="lazy"
                        />
                        <NotificationIcon
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7749e10a4cb727e5ce0c7fd48d44fb683bf93b2fa7c59643148748496b286b0?apiKey=d66532d056b14640a799069157705b77&"
                            alt="Notification"
                            loading="lazy"
                        />
                    </UserDetails>
                </UserProfile>
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
    gap: 20px;
`;

const ProfileImage = styled.img`
    aspect-ratio: 0.85;
    object-fit: auto;
    width: 40px;
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

const NotificationIcon = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    width: 24px;
    margin: auto 0;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto; /* Ensure it scrolls if content overflows */
`;
