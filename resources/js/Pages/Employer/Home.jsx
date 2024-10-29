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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

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
        <NavBar darkMode={darkMode} fontSize={fontSize}  header={"Job Postings"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize} >
                <CreateJobSection darkMode={darkMode} fontSize={fontSize} >
                    <JobTitle darkMode={darkMode} fontSize={fontSize} >Create a New Job Posting</JobTitle>
                    <JobSubtitle darkMode={darkMode} fontSize={fontSize} >
                        Hire amazing students through CO-OP Connect!
                    </JobSubtitle>
                    <JobDescription darkMode={darkMode} fontSize={fontSize} >
                        Post a job on our platform using the below button. You can view and edit previously posted jobs below by clicking the respective links. Applicants are listed within the view section.
                    </JobDescription>
                    <Link  darkMode={darkMode} fontSize={fontSize} href="/employer/post1">
                        <PostJobButton darkMode={darkMode} fontSize={fontSize} >Post a Job</PostJobButton>
                    </Link>
                </CreateJobSection>
                <CurrentPostingsSection darkMode={darkMode} fontSize={fontSize} >
                    <SectionTitle darkMode={darkMode} fontSize={fontSize} >Current Postings</SectionTitle>
                    <EditingInstructions darkMode={darkMode} fontSize={fontSize} >
                        View or edit your current job postings.
                    </EditingInstructions>
                    {jobsStatus === "loading" && <p>Loading...</p>}
                    {jobs.length > 0 && (
                        <PostingsGrid darkMode={darkMode} fontSize={fontSize} >
                            {jobs.map((post, i) => (
                                <JobPosting darkMode={darkMode} fontSize={fontSize} key={i} post={post} />
                            ))}
                        </PostingsGrid>
                    )}
                </CurrentPostingsSection>
            </MainContainer>
        </NavBar>
    );
};

const JobPosting = ({ post, darkMode, fontSize }) => {

    console.log(post)
    return (
        <JobCard darkMode={darkMode} fontSize={fontSize} data-test-id={`job-card-${post.id}`}>
            <JobCardTitle darkMode={darkMode} fontSize={fontSize}>{post.title}</JobCardTitle>
            <CompanyName darkMode={darkMode} fontSize={fontSize}>{post.company.name}</CompanyName>
            <Location darkMode={darkMode} fontSize={fontSize}>{post.location}</Location>
            { post?.skills &&
            <SkillsList darkMode={darkMode} fontSize={fontSize}>
                {post?.skills?.map((tag, index) => (
                    <SkillBadge darkMode={darkMode} fontSize={fontSize} key={index}>{tag}</SkillBadge>
                ))}
            </SkillsList>
}
            <JobDescriptionText
                darkMode={darkMode}
                fontSize={fontSize}
                dangerouslySetInnerHTML={{ __html: post.description }}/>
            <Divider  darkMode={darkMode} fontSize={fontSize}/>
            <CardButtons darkMode={darkMode} fontSize={fontSize}>
                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/viewpost/${post.id}`}>
                    <ViewPostingButton darkMode={darkMode} fontSize={fontSize} data-test-id={`view-posting-${post.id}`}>VIEW POSTING</ViewPostingButton>
                </Link>
                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/editpost1/${post.id}`}>
                    <EditPostingButton darkMode={darkMode} fontSize={fontSize}>EDIT POSTING</EditPostingButton>
                </Link>
            </CardButtons>
        </JobCard>
    );
  };

export default Home;
