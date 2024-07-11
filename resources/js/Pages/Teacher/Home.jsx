import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import styled, { keyframes } from "styled-components";
import { getUser, selectUser, selectUserStatus } from "@/Features/users/userSlice";
import { getStudents, getPercentages, selectPercentages, selectStudents, selectStudentsStatus } from "@/Features/schools/schoolsSlice";



export default function Home() {



    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const students = useSelector(selectStudents);
    const percentages = useSelector(selectPercentages);

    useEffect(() => {

        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user?.id) {
            dispatch(getStudents(user.id));
            dispatch(getPercentages(user.id));
        }
    }, [user, dispatch]);


    if (!user) {
        return <LoadingScreen><Spinner /></LoadingScreen>;;
    }


    return (
        <>
            <NavBar header={"Home"}>
                <MainContainer>
                    <TopContainer>

                        {students && (
                            <StudentsSectionContainer>
                                <StudentsSection students={students} />
                            </StudentsSectionContainer>
                        )}
                        {percentages && (
                            <StudentStatus percentages={percentages} />)}
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


const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333;
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;
