import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import ApplicantModal from "../Profile/Partials/ApplicantModal";
import EditJobModal from "../Profile/Partials/EditJobModal";
import {
    MainContainer,
    Container,
    Title,
    JobPostingCard,
    JobInfo,
    JobInfoLeft,
    CompanyLogo,
    JobDetails,
    JobTitle,
    CompanyName,
    JobDescription,
    StatusIcon,
    JobInfoRight,
    StatusTag,
    JobTypeTag,
    LocationTag,
    ApplicantSection,
    ApplicantTitle,
    Applicants,
    ApplicantCard,
    ApplicantInfo,
    ApplicantImage,
    ApplicantDetails,
    ApplicantName,
    SchoolInfo,
    Location,
    ApplicantDescription,
    ViewButton,
} from "./Styling/ViewPost.styles";

const appUrl = import.meta.env.VITE_APP_URL;
const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

function ViewPost() {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    // Extract job ID from URL using useParams hook
    const jobId = parseInt(window.location.pathname.split("/").pop(), 10);

    useEffect(() => {
        // Fetch job details including applications based on jobId
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${appUrl}/api/v1/jobs/${jobId}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch job details");
                }
                const data = await response.json();
                setJob(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (loading || !job) {
        return <div>Loading...</div>; // You can show a loading indicator here
    }

    console.log("Job from URL:", job);

    // Check if job.applications exists and is an array
    const applicants =
        job.applications && Array.isArray(job.applications)
            ? job.applications.map((app) => app.user)
            : [];

    const openModal = (applicant) => {
        setSelectedApplicant(applicant);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedApplicant(null);
    };

    const openEditModal = () => {
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const handleSave = async (updatedJob) => {
        try {
            const response = await fetch(`${appUrl}/api/jobs/${job.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedJob),
            });

            if (!response.ok) {
                throw new Error("Failed to update job");
            }

            const data = await response.json();
            setJob(data); // Update state with the updated job data
            closeEditModal();
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer>
                <Container>
                    <Title>Current Company Postings</Title>
                    <JobPostingCard>
                        <JobInfo>
                            <JobInfoLeft>
                                <CompanyLogo
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18c37d4baea2f5cbd4d392adacf6fa12686c4c99b1f2a12d132c4a3ef4a5899?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="Company Logo"
                                />
                                <JobDetails>
                                    <JobTitle>{job.title}</JobTitle>
                                    <CompanyName>{job.company}</CompanyName>
                                    <JobDescription>
                                        {job.description}
                                    </JobDescription>
                                </JobDetails>
                                <StatusIcon
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f00bd98ccee0cca896d493616005574e2e5aaa7076659900adbd3e310f5af87?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="Status Icon"
                                    onClick={openEditModal}
                                />
                            </JobInfoLeft>
                            <JobInfoRight>
                                <StatusTag>
                                    Posting Status: {job.postingStatus}
                                </StatusTag>
                                <JobTypeTag>
                                    Job Type: {job.jobType}
                                </JobTypeTag>
                                <LocationTag>
                                    Work Location: {job.location}
                                </LocationTag>
                            </JobInfoRight>
                        </JobInfo>
                        <ApplicantSection>
                            <ApplicantTitle>Applicants</ApplicantTitle>
                            <Applicants>
                                {applicants.map((applicant) => (
                                    <ApplicantCard key={applicant.id}>
                                        <ApplicantInfo>
                                            <ApplicantImage
                                                src={
                                                    applicant.profile_image ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                alt={applicant.name}
                                            />
                                            <ApplicantDetails>
                                                <ApplicantName>
                                                    {applicant.name}
                                                </ApplicantName>
                                                <SchoolInfo>
                                                    {applicant.school || "N/A"}
                                                </SchoolInfo>
                                                <Location>
                                                    {applicant.location}
                                                </Location>
                                            </ApplicantDetails>
                                        </ApplicantInfo>
                                        <ApplicantDescription>
                                            {applicant.description || "N/A"}
                                        </ApplicantDescription>
                                        <ViewButton
                                            onClick={() => openModal(applicant)}
                                        >
                                            View Applicant
                                        </ViewButton>
                                    </ApplicantCard>
                                ))}
                            </Applicants>
                        </ApplicantSection>
                    </JobPostingCard>
                </Container>
            </MainContainer>
            <ApplicantModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                applicant={selectedApplicant}
            />
            <EditJobModal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                job={job}
                onSave={handleSave}
            />
        </NavBar>
    );
}

export default ViewPost;
