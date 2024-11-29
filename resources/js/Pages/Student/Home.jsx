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
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);



    useEffect(() => {
        dispatch(
            searchJobsbySkill({
                skills: [],
            })
        );
    }, [dispatch]);

    const JobCard = ({ job }) => {
        return (
            <JobCardContainer darkMode={darkMode} fontSize={fontSize}>
                <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>


                <CompanyName darkMode={darkMode} fontSize={fontSize}  >{job.company.name}</CompanyName>

                <Location darkMode={darkMode} fontSize={fontSize} >{job.location}</Location>
{ job.skills &&
                <SkillsList darkMode={darkMode} fontSize={fontSize} >
                    {job.skills.map((tag, index) => (
                        <SkillBadge darkMode={darkMode} fontSize={fontSize}   key={index}>{tag}</SkillBadge>
                    ))}
                </SkillsList>}
                <JobDescription dangerouslySetInnerHTML={{ __html: job.description }} darkMode={darkMode} fontSize={fontSize}/>
                <Divider darkMode={darkMode} fontSize={fontSize} />
                <Link darkMode={darkMode} fontSize={fontSize} href={`/student/viewpost/${job.id}`}>
                    <JobButton darkMode={darkMode} fontSize={fontSize}>VIEW POSTING</JobButton>
                </Link>
            </JobCardContainer>
        );
    };

    return (
        <NavBar header={"Job List"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize} >
                <SearchSection darkMode={darkMode} fontSize={fontSize}>
                    <SearchTitle darkMode={darkMode} fontSize={fontSize}>Search for Job Postings</SearchTitle>

                    <Description darkMode={darkMode} fontSize={fontSize}>
                        To search for new opportunities, select View Jobs below.
                    </Description>
                    <Link darkMode={darkMode} fontSize={fontSize} href="/student/jobs">
                        <Button darkMode={darkMode} fontSize={fontSize}>View Jobs</Button>
                    </Link>
                </SearchSection>
                <JobsSection darkMode={darkMode} fontSize={fontSize}>
                    <JobsHeader darkMode={darkMode} fontSize={fontSize}>Recommended Jobs</JobsHeader>
                    <JobsSubHeader darkMode={darkMode} fontSize={fontSize}>
    <u>View</u> some of these recommended jobs! Update your skills on your <Link href="/student/profile" style={{ color: darkMode ? '#EDDCFF' : '#8A76BD' }}>profile</Link> to see more suggestions.
</JobsSubHeader>

                    <JobListings darkMode={darkMode} fontSize={fontSize}>
                        {jobsStatus === "loading" ? (
                            <EmptyMessage darkMode={darkMode} fontSize={fontSize}>Loading...</EmptyMessage>
                        ) : jobs.length === 0 ? (
                            <EmptyMessage darkMode={darkMode} fontSize={fontSize}>
    Add some skills to your <Link href="/student/profile" style={{ color: darkMode ? '#fff' : '#000' }}>profile</Link> to see some jobs to apply for.
</EmptyMessage>
                        ) : (
                            jobs.map((job, index) => (
                                <JobCard  key={index} job={job} />
                            ))
                        )}
                    </JobListings>
                </JobsSection>
            </MainContainer>
        </NavBar>
    );
}

export default Home;
