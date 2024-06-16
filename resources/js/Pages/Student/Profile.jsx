import * as React from "react";
import styled from "styled-components";
import ProfileForm from "./Components/ProfileForm";
import Matches from "./Components/Matches";
import ReflectionDocuments from "./Components/ReflectionDocuments";
import NavBar from "./Components/NavBar";

export default function Profile() {
    return (
        <NavBar header="My Profile">
            <MainContainer>
                <ProfileContainer>
                    <ProfileForm />
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
