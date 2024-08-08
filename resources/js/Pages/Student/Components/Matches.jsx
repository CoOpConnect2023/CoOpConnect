import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import JobModal from "../../Profile/Partials/ViewJobModal";
import { Link } from "@inertiajs/react";

const appUrl = import.meta.env.VITE_APP_URL;
import { useSelector, useDispatch } from "react-redux";
import {
    searchJobsbySkill,
    selectJobsStatus,
    selectJobs,
} from "@/Features/jobs/jobsSlice";

const appearFromTop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const JobContainer = styled.section`
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    padding: 40px 30px;


    @media (max-width: 991px) {
        padding: 20px;
    }
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
        padding: 0 20px;
    }
`;

const JobCard = styled.article`
    max-width: 100%;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    margin-top: ${(props) => (props.hasMargin ? "10px" : "0")};
    animation: ${appearFromTop} 0.8s ease forwards;
    animation-delay: ${(props) => props.index * 0.1}s;
    opacity: 0; /* Start hidden */
    transition: transform 0.7s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 1001px) {
        font-size: 16px;
    }
`;

const JobTitle = styled.h3`
    color: var(--Schemes-On-Primary-Container, #260e44);
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px; /* 133.333% */
`;

const JobDetails = styled.section`
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    letter-spacing: 0.15px;
    margin-top: 15px;

    @media (max-width: 991px) {
        flex-direction: column;
    }
`;

const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
    padding: 3px 0;
    flex-wrap: wrap;
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
    justify-content: center;
    align-self: center;
    border-radius: 12px;
    background-color: var(--Schemes-Primary, #6b538c);
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #543b6f;
        transform: scale(1.05);
    }
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

                        <ViewButton><Link href={`/student/viewpost/${job.id}`}>VIEW JOB</Link></ViewButton>
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
