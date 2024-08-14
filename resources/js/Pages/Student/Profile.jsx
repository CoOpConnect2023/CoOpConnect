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
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {

    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    return (
        <NavBar header="My Profile">
            <MainContainer fontSize={fontSize} darkMode={darkMode}>
                <ProfileContainer fontSize={fontSize} darkMode={darkMode}>
                    <ProfileForm fontSize={fontSize} darkMode={darkMode} />
                </ProfileContainer>
                <RightContainer fontSize={fontSize} darkMode={darkMode}>
                    <Matches fontSize={fontSize} darkMode={darkMode} />
                    <ReflectionDocuments fontSize={fontSize} darkMode={darkMode} />
                </RightContainer>
            </MainContainer>
        </NavBar>
    );
}
