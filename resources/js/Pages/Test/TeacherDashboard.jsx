import * as React from "react";
import styled from "styled-components";
import AddDocuments from "./Components/AddDocuments";
import StudentsSection from "./Components/StudentsSection";
import StudentStatus from "./Components/StudentStatus";
import AdminPanel from "./Components/AdminPanel";
import NavBar from "./NavBar";

export default function TeacherDashboard() {
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
                        <AddDocuments />

                        <AdminPanelContainer>
                            <AdminPanel />
                        </AdminPanelContainer>
                    </BottomContainer>
                </MainContainer>
            </NavBar>
        </>
    );
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    width: 100%; /* Ensure MainContainer takes up full width */
`;

const TopContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    width: 100%; /* Ensure TopContainer takes up full width */
`;

const BottomContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    width: 100%; /* Ensure BottomContainer takes up full width */
`;

const StudentsSectionContainer = styled.div`
    flex: 1; /* Allow StudentsSectionContainer to grow and fill available space */
`;

const AdminPanelContainer = styled.div`
    flex: 1; /* Allow AdminPanelContainer to grow and fill available space */
`;
