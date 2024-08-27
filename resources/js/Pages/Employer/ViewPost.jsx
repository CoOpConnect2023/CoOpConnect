import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    deleteJob,
    selectJob,
    selectSingleJob,
    selectJobsStatus,
} from "@/Features/jobs/jobsSlice";
import { MainContainer, Container, Title, JobPostingCard, JobInfo, JobInfoLeft, CompanyLogo, CompanyName, JobDescription, StatusIcon, JobInfoRight, StatusTag, JobTypeTag, LocationTag, ApplicantSection, ApplicantTitle, Applicants, ApplicantCard, ApplicantInfo, ApplicantImage, ApplicantDetails, ApplicantName, SchoolInfo, Location, ApplicantDescription, ViewButton, JobDetails,JobTitle, ActionButtons, ActionButton } from "./Styling/ViewPost.styles";
import { useDispatch, useSelector } from "react-redux";
import { usePage, Link } from "@inertiajs/react";

function ViewPost() {
    const { props } = usePage();
    const { jobId } = props;
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    const dispatch = useDispatch();
    const job = useSelector(selectSingleJob);
    const jobStatus = useSelector(selectJobsStatus);

    useEffect(() => {
        dispatch(selectJob({ jobId: jobId }));
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteJob({ jobId: jobId }));

    };

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize} >
                <Container darkMode={darkMode} fontSize={fontSize}>
                    <Title darkMode={darkMode} fontSize={fontSize}>Current Company Postings</Title>
                    <JobPostingCard darkMode={darkMode} fontSize={fontSize}>
                        <JobInfo darkMode={darkMode} fontSize={fontSize}>
                            <JobInfoLeft darkMode={darkMode} fontSize={fontSize}>
                                {/* <CompanyLogo darkMode={darkMode} fontSize={fontSize}
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18c37d4baea2f5cbd4d392adacf6fa12686c4c99b1f2a12d132c4a3ef4a5899?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="Company Logo"
                                /> */}
                                <JobDetails darkMode={darkMode} fontSize={fontSize}>
                                    <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>
                                    <CompanyName darkMode={darkMode} fontSize={fontSize}>{job.company}</CompanyName>
                                    <JobDescription darkMode={darkMode} fontSize={fontSize}>
                                        {job.description}
                                    </JobDescription>
                                </JobDetails>
                                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/editpost1/${jobId}`}>
                                    <StatusIcon darkMode={darkMode} fontSize={fontSize}
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f00bd98ccee0cca896d493616005574e2e5aaa7076659900adbd3e310f5af87?apiKey=d66532d056b14640a799069157705b77&"
                                        alt="Status Icon"
                                    />
                                </Link>
                            </JobInfoLeft>
                            <JobInfoRight darkMode={darkMode} fontSize={fontSize}>
                                <StatusTag darkMode={darkMode} fontSize={fontSize}>
                                    Posting Status: {job.postingStatus}
                                </StatusTag>
                                <JobTypeTag darkMode={darkMode} fontSize={fontSize}>Job Type: {job.jobType}</JobTypeTag>
                                <LocationTag darkMode={darkMode} fontSize={fontSize}>
                                    Work Location: {job.location}
                                </LocationTag>
                            </JobInfoRight>
                            <ActionButtons darkMode={darkMode} fontSize={fontSize}>
                                <Link darkMode={darkMode} fontSize={fontSize}
                                    href={`/employer/viewapplicants/${jobId}`}
                                >
                                    <ActionButton darkMode={darkMode} fontSize={fontSize}>View Applicants</ActionButton>
                                </Link>
                                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/home`}>
                                    <ActionButton  darkMode={darkMode} fontSize={fontSize} onClick={handleDelete}>
                                        Delete Job Posting
                                    </ActionButton>
                                </Link>
                            </ActionButtons>
                        </JobInfo>
                    </JobPostingCard>
                </Container>
            </MainContainer>
        </NavBar>
    );
}



export default ViewPost;


