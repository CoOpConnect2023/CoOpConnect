import * as React from "react";
import styled from "styled-components";
import ProfileForm from "./Components/ProfileForm";
import Matches from "./Components/Matches";
import ReflectionDocuments from "./Components/ReflectionDocuments";
import NavBar from "./Components/NavBar";
import {
    MainContainer,
    ProfileContainer,
    RightContainer,
} from "./Styling/Profile.styles";

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
