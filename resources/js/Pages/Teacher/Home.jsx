import * as React from "react";
import styled from "styled-components";
import AddDocuments from "./Components/AddDocuments";
import StudentsSection from "./Components/StudentsSection";
import StudentStatus from "./Components/StudentStatus";
import AdminPanel from "./Components/AdminPanel";
import ReflectionDocuments from "./Components/ReflectionDocuments";
import NavBar from "./Components/NavBar";
import {
    MainContainer,
    TopContainer,
    BottomContainer,
    StudentsSectionContainer,
    AdminPanelContainer,
} from "./Styling/Home.styles";


export default function Home() {
    return (
        <>
            <NavBar header={"Home"}>
                <MainContainer>
                    <TopContainer>
                        <StudentsSectionContainer>
                            <StudentsSection />
                        </StudentsSectionContainer>

                        <StudentStatus />
                    </TopContainer>
                    <BottomContainer>
                        <ReflectionDocuments />

                        <AdminPanelContainer>
                            <AdminPanel />
                        </AdminPanelContainer>
                    </BottomContainer>
                </MainContainer>
            </NavBar>
        </>
    );
}
