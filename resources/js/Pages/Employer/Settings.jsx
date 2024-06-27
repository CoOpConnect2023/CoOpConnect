import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import SettingsPanel from "./Components/SettingsPage";
import QuickLinks from "./Components/QuickLinks";
import { MainContainer } from "./Styling/Settings.styles";

export default function Settings() {
    return (
        <NavBar header={"Settings"}>
            <MainContainer>
                <SettingsPanel />
                <QuickLinks />
            </MainContainer>
        </NavBar>
    );
}
