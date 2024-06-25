import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JobModal from "../../Profile/Partials/ViewJobModal";

const appUrl = import.meta.env.VITE_APP_URL;
import { useSelector, useDispatch } from "react-redux";
import {
    searchJobsbySkill,
    selectJobsStatus,
    selectJobs,
} from "@/Features/jobs/jobsSlice";

const JobContainer = styled.section`
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    padding: 40px 30px;
`;

const Title = styled.h2`
    color: var(--Schemes-Primary, #6b538c);
    text-decoration: underline;
    align-self: center;
    font: 600 32px Poppins, sans-serif;
`;

const Subtitle = styled.p`
    color: var(--Schemes-Outline, #7b757f);
    margin-top: 10px;
    font: 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobList = styled.div`
    display: flex;
    align-items: center;
    margin-top: 40px;
    flex-direction: column;
    font-size: 16px;
    color: var(--Schemes-On-Primary-Container, #260e44);
    line-height: 150%;
    padding: 0 60px 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

const JobCard = styled.article`
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 10px;
    margin-top: ${(props) => (props.hasMargin ? "10px" : "0")};
`;

const JobTitle = styled.h3`
    color: var(--Schemes-On-Primary-Container, #260e44);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
`;

const JobDetails = styled.section`
    align-self: center;
    display: flex;
    margin-top: 15px;
    gap: 15px;
    letter-spacing: 0.15px;
`;

const CompanyInfo = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: auto 0;
    padding: 3px 0;
`;

const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
`;

const Location = styled.p`
    font-family: Poppins, sans-serif;
`;

const Divider = styled.hr`
    border: 1px solid rgba(38, 14, 68, 1);
    background-color: var(--Schemes-On-Primary-Container, #260e44);
    margin-top: 14px;
`;

const ViewButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: var(--Schemes-Primary, #6b538c);
    align-self: center;
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    cursor: pointer;
`;

function Matches() {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);
    const jobsStatus = useSelector(selectJobsStatus);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        dispatch(
            searchJobsbySkill({
                skills: [],
            })
        );
    }, [dispatch]);

    const displayedJobs = jobs.slice(0, 3);

    const handleViewJob = (job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    return (
        <JobContainer>
            <Title>Matches</Title>
            <Subtitle>Some recommended jobs for you to check out!</Subtitle>
            <JobList>
                {displayedJobs.map((job, index) => (
                    <JobCard key={index} hasMargin={index !== 0}>
                        <JobTitle>{job.title}</JobTitle>
                        <JobDetails>
                            <img
                                loading="lazy"
                                src={job.imgSrc}
                                alt={job.imgAlt}
                            />
                            <CompanyInfo>
                                <CompanyName>{job.company}</CompanyName>
                                <Location>{job.location}</Location>
                            </CompanyInfo>
                        </JobDetails>
                        <Divider />
                        <ViewButton onClick={() => handleViewJob(job)}>VIEW JOB</ViewButton>
                    </JobCard>
                ))}
            </JobList>
            {selectedJob && (
                <JobModal job={selectedJob} onClose={handleCloseModal} />
            )}
        </JobContainer>
    );
}

export default Matches;
