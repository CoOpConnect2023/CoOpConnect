import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJobs,
    getJobsDetails,
    patchUserJob,
    selectJob,
    getSingleJobDetails
} from "@/Features/userJobs/userJobsSlice";
import { selectUser } from "@/Features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { postEmailDeclineNotification } from "@/Features/notifications/notificationsSlice";

const ViewApplications = () => {
    const [activeTab, setActiveTab] = useState("Pending");
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const user = useSelector(selectUser);
    const job = useSelector(selectJob);
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);
    const userJobsId = jobs?.id
    useEffect(() => {
        dispatch(getJobsDetails());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSingleJobDetails({ userJobsId }));
    }, [dispatch, userJobsId]);

    const tabs = ["Pending", "Interview", "Scheduled", "Declined", "Rejected"];

    const handleAccept = (id) => {
        // Handle the accept action
        console.log(`Accepted application with id: ${id}`);
        window.location.href = `/student/accept-interview/${id}`;
    };

    const handleDecline = async (id) => {
        if (window.confirm("Are you sure you want to decline this application?")) {
            try {

                await dispatch(
                    patchUserJob({
                        userJobsId: id,
                        status: "Declined",
                    })
                ).unwrap();


                await dispatch(
                    postEmailDeclineNotification({
                        email: job.userEmail,
                        user_id: user.id,
                        student_id: 456,
                        job_title: job.title,

                    })
                ).unwrap();


                alert("Application declined and notification sent.");
            } catch (error) {
                console.error("Error during decline process:", error);
                alert("An error occurred while declining the application. Please try again.");
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZoneName: "short",
        }).format(date);
    };

    const renderApplications = () => {
        return jobs
            .filter((app) => app.status === activeTab)
            .map((app) => (
                <ApplicationCard fontSize={fontSize} darkMode={darkMode} key={app.id}>
                    <h3>
                        <b>Position:</b> {app.title}
                    </h3>
                    <p>
                        <b>Company:</b> {app.company}
                    </p>
                    <p>
                        <b>Location:</b> {app.location}
                    </p>
                    <p>
                        <b>Description:</b> {app.description}
                    </p>
                    {app.status === "Interview" && (
                        <ButtonGroup fontSize={fontSize} darkMode={darkMode}>
                            <ActionButton fontSize={fontSize} darkMode={darkMode}onClick={() => handleAccept(app.id)}>
                                Accept
                            </ActionButton>
                            <ActionButton fontSize={fontSize} darkMode={darkMode} onClick={() => handleDecline(app.id)}>
                                Decline
                            </ActionButton>
                        </ButtonGroup>
                    )}
                    {app.status === "Scheduled" && (
                        <p>
                            <b>Date:</b> {formatDate(app.timeSlots)}
                        </p>
                    )}
                </ApplicationCard>
            ));
    };

    return (
        <NavBar header={"View Applications"}>
            <Container fontSize={fontSize} darkMode={darkMode}>
                <Tabs fontSize={fontSize} darkMode={darkMode}>
                    {tabs.map((tab) => (
                        <Tab fontSize={fontSize} darkMode={darkMode}
                            key={tab}
                            $active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tabs>
                {jobs.length > 0 ? (
                    <ApplicationsContainer fontSize={fontSize} darkMode={darkMode}>
                        {console.log(jobs)}
                        {renderApplications()}
                    </ApplicationsContainer>
                ) : (
                    <ApplicationsContainer fontSize={fontSize} darkMode={darkMode}>
                        No applications found
                    </ApplicationsContainer>
                )}
            </Container>
        </NavBar>
    );
};


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number

    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }

    return `${basePixelSize * em * factor}px`;
};

// Base pixel size for font calculations
const BASE_PIXEL_SIZE = 16;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#FFF7FF')};
    color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#2C2C2C')};
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    @media (max-width: 768px) {
        padding: 10px;
        height: 100vh;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#FFF7FF9')};
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    @media (max-width: 768px) {
        margin-bottom: 10px;

    }
`;

const Tab = styled.div`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: ${({ $active, darkMode }) => ($active ? (darkMode ? '#6c4bcf' : '#B7A1E5') : (darkMode ? '#333' : '#E0E0E0'))};
    color: ${({ $active, darkMode }) => ($active ? (darkMode ? '#FFF' : '#FFF') : (darkMode ? '#ccc' : '#000'))};
    border-radius: 5px;
    user-select: none;
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};
    border: 2px solid ${({ $active, darkMode }) => ($active ? (darkMode ? '#4a3ba3' : '#0056b3') : (darkMode ? '#555' : '#ccc'))}; /* Added border */

    &:hover {
        background: ${({ $active, darkMode }) => ($active ? (darkMode ? '#4a3ba3' : '#0056b3') : (darkMode ? '#444' : '#c7c7c7'))};
    }

    @media (max-width: 768px) {
        padding: 5px 10px;
        margin: 5px;
    }
`;


const ApplicationsContainer = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 10px;
    }
`;

const ApplicationCard = styled.div`
    background: ${({ darkMode }) => (darkMode ? '#1f1f1f' : '#fff')};
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    @media (max-width: 768px) {
        padding: 10px;
        margin-bottom: 10px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ActionButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: ${({ darkMode }) => (darkMode ? '#6c4bcf' : '#B7A1E5')};
    color: #fff;
    border: none;
    border-radius: 5px;
    user-select: none;
    font-size: ${({ fontSize = '1em' }) => calculateFontSize(BASE_PIXEL_SIZE, fontSize)};

    &:hover {
        background: ${({ darkMode }) => (darkMode ? '#4a3ba3' : '#0056b3')};
    }

    @media (max-width: 768px) {
        padding: 5px 10px;
        margin: 5px 0;
        width: 100%;
    }
`;

export default ViewApplications;
