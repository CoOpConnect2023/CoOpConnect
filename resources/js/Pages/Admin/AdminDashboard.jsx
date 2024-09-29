import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import Section from './Components/Section';
import SchoolSectionComponent from "./Components/SchoolSection";
import CourseSectionComponent from "./Components/CoursesSection";
import JobsSectionComponent from "./Components/JobsSection";
import NavBar from './Components/NavBar';
import { getPercentages, getSchools, selectPercentages, selectPercentagesStatus, deleteSchool } from '@/Features/schools/schoolsSlice';
import { getUser, getAllUsers, selectAllUsers, selectUser, deleteUser } from '@/Features/users/userSlice';
import { getCourses, deleteCourse } from "@/Features/courses/coursesSlice";
import { getJobs, deleteAJob } from "@/Features/jobs/jobsSlice";
import UploadUsers from "./Components/UploadUsers";
import { HomePageContainer, Header, Content } from "./Styling/AdminDashboard.styles";



const AdminDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const users = useSelector(selectAllUsers);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const schoolsList = useSelector(state => state.schools.schoolslist);
    const coursesList = useSelector(state => state.courses.courses);
    const jobsList = useSelector(state => state.jobs.jobs);

    const [categorizedUsers, setCategorizedUsers] = useState({});

    useEffect(() => {

        dispatch(getUser());
        dispatch(getAllUsers());
        dispatch(getSchools());
        dispatch(getCourses());
        dispatch(getJobs());
    }, [dispatch]);

    console.log(jobsList);

    const categorizeUsersByRole = (users) => {
        return users.reduce((acc, user) => {
            const { role } = user;
            if (!acc[role]) {
                acc[role] = [];
            }
            acc[role].push(user);
            return acc;
        }, {});
    };


    useEffect(() => {
        if (users != null) {
            const categorized = categorizeUsersByRole(users);
            setCategorizedUsers(categorized);
        }
    }, [users]);

    const teachers = categorizedUsers?.teacher;
    const students = categorizedUsers?.student;
    const employee = categorizedUsers?.employee;
    const admins = categorizedUsers?.admin;




    if (!user) {
        return <LoadingScreen><Spinner /></LoadingScreen>;;
    }




    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));

    };

    const handleDeleteSchool = (userId) => {
        dispatch(deleteSchool(userId));

    };

    const handleDeleteCourse = (userId) => {
        dispatch(deleteCourse(userId));

    };

    const handleDeleteJob = (jobId) => {
        dispatch(deleteAJob({jobId}));

    };



    return (
        <NavBar>
            <HomePageContainer fontSize={fontSize} darkMode={darkMode}>
                <Header fontSize={fontSize} darkMode={darkMode}></Header>
                {categorizedUsers && (
                    <Content fontSize={fontSize} darkMode={darkMode}>
                        <UploadUsers fontSize={fontSize} darkMode={darkMode} />
                        <Section
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteUser}
                            users={admins}
                            title="Admin Users"
                            type="admin"
                        />
                        <Section
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteUser}
                            users={students}
                            title="Current Students"
                            type="student"
                        />
                        <Section
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteUser}
                            users={employee}
                            title="Current Employers"
                            type="employee"
                        />
                        <Section
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteUser}
                            users={teachers}
                            title="Current Teachers"
                            type="teacher"
                        />
                        <SchoolSectionComponent
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteSchool}
                            users={schoolsList}
                            title="Current Schools"
                            type="school"
                        />
                        <CourseSectionComponent
                            users={coursesList}
                            title="Current Courses"
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteCourse}
                            type="course"
                        />
                        <JobsSectionComponent
                            users={jobsList}
                            title="Current Jobs"
                            fontSize={fontSize}
                            darkMode={darkMode}
                            handleDeleteUser={handleDeleteJob}
                            type="job"
                        />
                    </Content>
                )}
            </HomePageContainer>
        </NavBar>
    );

};


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

export default AdminDashboard;
