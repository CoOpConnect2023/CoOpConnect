import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import JobModal from "../Profile/Partials/ViewJobModal";
import { useSelector, useDispatch } from "react-redux";
import {
    selectJobs,
    selectJobsStatus,
    searchJobsbySkill,
} from "@/Features/jobs/jobsSlice";
import {
    MainContainer,
    SearchSection,
    SearchTitle,
    Tagline,
    Description,
    Button,
    JobsSection,
    JobsHeader,
    JobsSubHeader,
    JobListings,
    JobCardContainer,
    JobTitle,
    CompanyName,
    Location,
    SkillsList,
    SkillBadge,
    JobDescription,
    Divider,
    JobButton,
    EmptyMessage,
} from "./Styling/Home.styles";

const appUrl = import.meta.env.VITE_APP_URL;

function Home() {
    const dispatch = useDispatch();

    const jobs = useSelector(selectJobs) || [];
    const jobsStatus = useSelector(selectJobsStatus);

    useEffect(() => {
        dispatch(
            searchJobsbySkill({
                skills: [],
            })
        );
    }, [dispatch]);

    const JobCard = ({ job }) => {
        return (
            <JobCardContainer>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>{job.company}</CompanyName>
                <Location>{job.location}</Location>
                <SkillsList>
                    {job.skills.map((tag, index) => (
                        <SkillBadge key={index}>{tag}</SkillBadge>
                    ))}
                </SkillsList>
                <JobDescription>{job.description}</JobDescription>
                <Divider />
                <Link href={`/student/viewpost/${job.id}`}>
                    <JobButton>VIEW POSTING</JobButton>
                </Link>
            </JobCardContainer>
        );
    };

    return (
        <NavBar>
            <MainContainer>
                <SearchSection>
                    <SearchTitle>Search for Job Postings</SearchTitle>
                    <Tagline>
                        Get amazing through jobs at CO-OP Connect!
                    </Tagline>
                    <Description>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it t
                    </Description>
                    <Link href="/student/jobs">
                        <Button>View Jobs</Button>
                    </Link>
                </SearchSection>
                <JobsSection>
                    <JobsHeader>Recommended Jobs</JobsHeader>
                    <JobsSubHeader>
                        <u>View</u> some of these recommended jobs!
                    </JobsSubHeader>
                    <JobListings>
                        {jobsStatus === "loading" ? (
                            <EmptyMessage>Loading...</EmptyMessage>
                        ) : jobs.length === 0 ? (
                            <EmptyMessage>
                                Add some skills to your profile to see some jobs
                                to apply for
                            </EmptyMessage>
                        ) : (
                            jobs.map((job, index) => (
                                <JobCard key={index} job={job} />
                            ))
                        )}
                    </JobListings>
                </JobsSection>
            </MainContainer>
        </NavBar>
    );
}

export default Home;
