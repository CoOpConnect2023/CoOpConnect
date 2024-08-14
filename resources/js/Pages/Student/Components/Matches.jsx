import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import JobModal from "../../Profile/Partials/ViewJobModal";
import { Link } from "@inertiajs/react";
import { useSelector, useDispatch } from "react-redux";
import {
    searchJobsbySkill,
    selectJobsStatus,
    selectJobs,
} from "@/Features/jobs/jobsSlice";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};

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
    background-color: ${({ darkMode }) => (darkMode ? '#1F1F1F' : '#fff')};
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    padding: 40px 30px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 20px;
    }
`;

const Title = styled.h2`
    color: ${({ darkMode }) => (darkMode ? '#EDDCFF' : 'var(--Schemes-Primary, #6b538c)')};
    text-decoration: underline;
    align-self: center;
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    font-weight: 600;
    font-family: Poppins, sans-serif;
`;

const Subtitle = styled.p`
    color: ${({ darkMode }) => (darkMode ? '#CCC' : 'var(--Schemes-Outline, #7b757f)')};
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    line-height: 133%;
    align-self: center;
`;

const JobList = styled.div`
    display: flex;
    align-items: center;
    margin-top: 40px;
    flex-direction: column;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'var(--Schemes-On-Primary-Container, #260e44)')};
    line-height: 150%;
    padding: 0 60px 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const JobCard = styled.article`
    max-width: 100%;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#444' : 'var(--Schemes-Primary-Container, #eddcff)')};
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    margin-top: ${(props) => (props.hasMargin ? "10px" : "0")};
    animation: ${appearFromTop} 0.8s ease forwards;
    animation-delay: ${(props) => props.index * 0.1}s;
    opacity: 0;
    transition: transform 0.7s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 1001px) {
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    }
`;

const JobTitle = styled.h3`
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'var(--Schemes-On-Primary-Container, #260e44)')};
    text-align: center;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    font-weight: 500;
    line-height: 32px;
`;

const JobDetails = styled.section`
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    letter-spacing: 0.15px;
    margin-top: 15px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

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
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Location = styled.p`
    font-family: Poppins, sans-serif;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Divider = styled.hr`
    border: 1px solid ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'rgba(38, 14, 68, 1)')};
    background-color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'var(--Schemes-On-Primary-Container, #260e44)')};
    margin-top: 14px;
`;

const ViewButton = styled.button`
    justify-content: center;
    align-self: center;
    border-radius: 12px;
    background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : 'var(--Schemes-Primary, #6b538c)')};
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#543b6f' : '#543b6f')};
        transform: scale(1.05);
    }
`;

function Matches({ darkMode, fontSize }) {
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
        <JobContainer darkMode={darkMode} fontSize={fontSize}>
            <Title darkMode={darkMode} fontSize={fontSize}>Matches</Title>
            <Subtitle darkMode={darkMode} fontSize={fontSize}>Some recommended jobs for you to check out!</Subtitle>
            <JobList darkMode={darkMode} fontSize={fontSize}>
                {displayedJobs.map((job, index) => (
                    <JobCard key={index} hasMargin={index !== 0} index={index} darkMode={darkMode} fontSize={fontSize}>
                        <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>
                        <JobDetails darkMode={darkMode} fontSize={fontSize}>
                            <img
                                loading="lazy"
                                src={job.imgSrc}
                                alt={job.imgAlt}
                            />
                            <CompanyInfo darkMode={darkMode} fontSize={fontSize}>
                                <CompanyName darkMode={darkMode} fontSize={fontSize}>{job.company}</CompanyName>
                                <Location darkMode={darkMode} fontSize={fontSize}>{job.location}</Location>
                            </CompanyInfo>
                        </JobDetails>
                        <Divider darkMode={darkMode} />
                        <ViewButton darkMode={darkMode} fontSize={fontSize}><Link href={`/student/viewpost/${job.id}`}>VIEW JOB</Link></ViewButton>
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
