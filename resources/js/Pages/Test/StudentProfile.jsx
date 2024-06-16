import * as React from "react";
import styled from "styled-components";
import Profile from "./Components/Profile";
import Matches from "./Components/Matches";
import ReflectionDocuments from "./Components/ReflectionDocuments";
import NavBar from "./NavBar";

export default function StudentProfile() {
    return (
        <NavBar header="My Profile">
            <MainContainer>
                <ProfileContainer>
                    <Profile />
                </ProfileContainer>
                <RightContainer>
                    <Matches />
                    <ReflectionDocuments />
                </RightContainer>
            </MainContainer>
        </NavBar>
    );
}

const MainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
`;

const ProfileContainer = styled.div`
    flex: 1;
    min-width: 300px;
`;

const RightContainer = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
