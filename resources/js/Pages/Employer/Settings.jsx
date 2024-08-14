import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import SettingsPanel from "./Components/SettingsPage";
import QuickLinks from "./Components/QuickLinks";
import { MainContainer } from "./Styling/Settings.styles";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {

    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    return (
        <NavBar header={"Settings"}>
            <MainContainer  fontSize={fontSize} darkMode={darkMode}>
                <SettingsPanel fontSize={fontSize} darkMode={darkMode} />
                <QuickLinks darkMode={darkMode} fontSize={fontSize}  />
            </MainContainer>
        </NavBar>
    );
}
