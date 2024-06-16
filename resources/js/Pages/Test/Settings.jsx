import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import SettingsPanel from "./Components/SettingsPage";
import QuickLinks from "./Components/QuickLinks";

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

const MainContainer = styled.div`
    display: flex;
    gap: 20px;
    flex: 1 0 0;
    justify-content: center;
`;
