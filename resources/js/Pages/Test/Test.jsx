import * as React from "react";
import StudentSearch from "./StudentSearch";
import ScheduleInterviews from "./ScheduleInterviews";
import NavBar from "./NavBar";
import NewPosting from "./NewPosting";
import NewPostingA from "./NewPostingA";
import EditPost from "./EditPost";
import EditPostA from "./EditPostA";
import ScheduleClasses from "./ScheduleClasses";
import DocumentList from "./DocumentList";
import DocumentUpload from "./DocumentUpload";
import TeacherDashboard from "./TeacherDashboard";
import EmployerProfile from "./EmployerProfile";
import TeacherProfile from "./TeacherProfile";
import StudentProfile from "./StudentProfile";
import ReflectionsForum from "./ReflectionsForum";
import Settings from "./Settings";
import Message from "./Message";
import TestData from "./TestData";
import { useState, useEffect } from "react";

export default function Test() {
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/usersindex`
                );
               
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    return <TestData />;
}
