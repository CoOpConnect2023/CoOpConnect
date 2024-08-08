import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
import NavBar from "./Components/NavBar";
import SettingsPanel from "./Components/SettingsPage";
import QuickLinks from "./Components/QuickLinks";
import { MainContainer } from "./Styling/Settings.styles";

export default function Settings() {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    return (
        <NavBar header={"Settings"}>
            <MainContainer darkMode={darkMode}>
                <SettingsPanel darkMode={darkMode} />
                <QuickLinks darkMode={darkMode} />
            </MainContainer>
        </NavBar>
    );
}
