import * as React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import Chat from "./Components/Chat";

export default function Message() {
    return (
        <NavBar header={"Messages"}>
            <Chat />
        </NavBar>
    );
}
