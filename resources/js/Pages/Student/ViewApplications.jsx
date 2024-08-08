import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJobs,
    getJobsDetails,
    patchUserJob,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewApplications = () => {
    const [activeTab, setActiveTab] = useState("Pending");

    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);

    useEffect(() => {
        dispatch(getJobsDetails());
    }, [dispatch]);

    const tabs = ["Pending", "Interview", "Scheduled", "Declined", "Rejected"];

    const handleAccept = (id) => {
        // Handle the accept action
        console.log(`Accepted application with id: ${id}`);
        window.location.href = `/student/accept-interview/${id}`;
    };

    const handleDecline = (id) => {
        if (
            window.confirm("Are you sure you want to decline this application?")
        ) {
            dispatch(
                patchUserJob({
                    userJobsId: id,
                    status: "Declined",
                })
            );
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
                <ApplicationCard key={app.id}>
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
                        <ButtonGroup>
                            <ActionButton onClick={() => handleAccept(app.id)}>
                                Accept
                            </ActionButton>
                            <ActionButton onClick={() => handleDecline(app.id)}>
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
            <Container>
                <Tabs>
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            $active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tabs>
                {jobs.length > 0 ? (
                    <ApplicationsContainer>
                        {console.log(jobs)}
                        {renderApplications()}
                    </ApplicationsContainer>
                ) : (
                    <ApplicationsContainer>
                        No applications found
                    </ApplicationsContainer>
                )}
            </Container>
        </NavBar>
    );
};


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const Tab = styled.div`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: ${({ $active }) => ($active ? "#007BFF" : "#E0E0E0")};
    color: ${({ $active }) => ($active ? "#FFF" : "#000")};
    border-radius: 5px;
    user-select: none;

    &:hover {
        background: ${({ $active }) => ($active ? "#0056b3" : "#c7c7c7")};
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

    @media (max-width: 768px) {
        width: 100%;
        padding: 0 10px;
    }
`;

const ApplicationCard = styled.div`
    background: #fff;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;

    @media (max-width: 768px) {
        padding: 10px;
        margin-bottom: 10px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ActionButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    user-select: none;

    &:hover {
        background: #0056b3;
    }

    @media (max-width: 768px) {
        padding: 5px 10px;
        margin: 5px 0;
        width: 100%;
    }
`;

export default ViewApplications;
