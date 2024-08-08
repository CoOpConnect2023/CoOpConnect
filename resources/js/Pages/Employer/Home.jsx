import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import EditJobModal from "../Profile/Partials/EditJobModal";
EditJobModal;
const appUrl = import.meta.env.VITE_APP_URL;
import {
    getJobsforEmployer,
    patchJob,
    selectJobs,
    selectJobsStatus,
    deleteJob
} from "@/Features/jobs/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    UnderlineText,
    MainContainer,
    CreateJobSection,
    JobTitle,
    JobSubtitle,
    JobDescription,
    PostJobButton,
    CurrentPostingsSection,
    SectionTitle,
    EditingInstructions,
    PostingsGrid,
    JobCard,
    JobCardTitle,
    CompanyName,
    Location,
    Tags,
    Tag,
    JobDescriptionText,
    Divider,
    CardButtons,
    ViewPostingButton,
    EditPostingButton,
    SkillsList,
    SkillBadge,
    DeletePostingButton
} from "./Styling/Home.styles";

const Home = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);
    const jobsStatus = useSelector(selectJobsStatus);

    useEffect(() => {
        const fetchUserAndJobs = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                const userData = response.data.user;
                userData.skills = userData.skills || "[]";

                // Fetch jobs for the user
                dispatch(getJobsforEmployer({ userId: userData.id }));
            } catch (error) {
                console.error("Error fetching user ID or jobs:", error);
            }
        };

        fetchUserAndJobs();
    }, [dispatch]);

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer>
                <CreateJobSection>
                    <JobTitle>Create a New Job Posting</JobTitle>
                    <JobSubtitle>
                        Hire amazing students through CO-OP Connect!
                    </JobSubtitle>
                    <JobDescription>
                        Post a job on our platform using the below button. You can view and edit previously posted jobs below by clicking the respective links. Applicants are listed within the view section.
                    </JobDescription>
                    <Link href="/employer/post1">
                        <PostJobButton>Post a Job</PostJobButton>
                    </Link>
                </CreateJobSection>
                <CurrentPostingsSection>
                    <SectionTitle>Current Company Postings</SectionTitle>
                    <EditingInstructions>
                        View or edit your company's current job postings.
                    </EditingInstructions>
                    {jobsStatus === "loading" && <p>Loading...</p>}
                    {jobs.length > 0 && (
                        <PostingsGrid>
                            {jobs.map((post, i) => (
                                <JobPosting key={i} post={post} />
                            ))}
                        </PostingsGrid>
                    )}
                </CurrentPostingsSection>
            </MainContainer>
        </NavBar>
    );
};

const JobPosting = ({ post }) => {
    return (
        <JobCard data-test-id={`job-card-${post.id}`}>
            <JobCardTitle>{post.title}</JobCardTitle>
            <CompanyName>{post.company}</CompanyName>
            <Location>{post.location}</Location>
            <SkillsList>
                {post.skills.map((tag, index) => (
                    <SkillBadge key={index}>{tag}</SkillBadge>
                ))}
            </SkillsList>
            <JobDescriptionText>{post.description}</JobDescriptionText>
            <Divider />
            <CardButtons>
                <Link href={`/employer/viewpost/${post.id}`}>
                    <ViewPostingButton data-test-id={`view-posting-${post.id}`}>VIEW POSTING</ViewPostingButton>
                </Link>
                <Link href={`/employer/editpost1/${post.id}`}>
                    <EditPostingButton>EDIT POSTING</EditPostingButton>
                </Link>
            </CardButtons>
        </JobCard>
    );
  };

export default Home;
