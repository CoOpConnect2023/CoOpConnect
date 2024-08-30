import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
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

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

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
  overflow: hidden;

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
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
  padding: 0 60px 10px;
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'var(--Schemes-On-Primary-Container, #260e44)')};
  line-height: 150%;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
  scroll-behavior: smooth;

  ${({ isScrolling }) =>
    isScrolling &&
    css`
      animation: ${scrollAnimation} 15s linear infinite;
    `}

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const JobCard = styled.article`
  flex: 0 0 auto;
  width: 300px; /* Adjust this width as necessary */
  height: 250px; /* Set a fixed height for uniform size */
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${({ darkMode }) => (darkMode ? '#444' : 'var(--Schemes-Primary-Container, #eddcff)')};
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensure even spacing between elements */
  padding: 20px 10px;
  margin-right: 20px; /* Add space between cards */
  transition: transform 0.7s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 991px) {
    height: auto; /* Adjust height on mobile */
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
  }
`;

const JobTitle = styled.h3`
  color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : 'var(--Schemes-On-Primary-Container, #260e44)')};
  text-align: center;
  font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)}; /* Adjust title font size */
  font-weight: 500;
  line-height: 28px; /* Adjust line height */
  margin-bottom: 10px; /* Ensure consistent spacing */

  @media (max-width: 991px) {
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
  }
`;

const JobDetails = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ensure this section takes up remaining space */
  justify-content: center; /* Center the content vertically */
  align-items: center;
  gap: 10px;
  letter-spacing: 0.1px;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
`;

const CompanyName = styled.p`
  font-family: Poppins, sans-serif;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
`;

const Location = styled.p`
  font-family: Poppins, sans-serif;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
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
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
  margin-top: 20px; /* Add space above the button */

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? '#543b6f' : '#543b6f')};
    transform: scale(1.05);
  }
`;
const ScrollButton = styled.button`
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ darkMode }) => (darkMode ? '#6b538c' : 'var(--Schemes-Primary, #6b538c)')};
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: ${({ fontSize }) => calculateFontSize(12, fontSize)};
  margin-top: 20px;

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
    const [isScrolling, setIsScrolling] = useState(false); // State to control animation

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

    const toggleScrolling = () => {
      setIsScrolling(!isScrolling); // Toggle the scrolling animation
    };

    return (
      <JobContainer darkMode={darkMode} fontSize={fontSize}>
        <Title darkMode={darkMode} fontSize={fontSize}>Matches</Title>
        <Subtitle darkMode={darkMode} fontSize={fontSize}>Some recommended jobs for you to check out!</Subtitle>
        <JobList darkMode={darkMode} fontSize={fontSize} isScrolling={isScrolling}>
          {displayedJobs.map((job, index) => (
            <JobCard key={index} hasMargin={index !== 0} index={index} darkMode={darkMode} fontSize={fontSize}>
              <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>
              <JobDetails darkMode={darkMode} fontSize={fontSize}>
                <img loading="lazy" src={job.imgSrc} alt={job.imgAlt} />
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
        {/* <ScrollButton darkMode={darkMode} fontSize={fontSize} onClick={toggleScrolling}>
          {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </ScrollButton> */}
        {selectedJob && <JobModal job={selectedJob} onClose={handleCloseModal} />}
      </JobContainer>
    );
  }

  export default Matches;
