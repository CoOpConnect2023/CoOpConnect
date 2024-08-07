import * as React from "react";
import styled from "styled-components";
import NavBar from "../Employer/Components/NavBar";
import Chat from "./Components/Chat";

export default function Messages() {
    return (
        <NavBar header={"Messages"}>
            <Chat />
        </NavBar>
    );
}
