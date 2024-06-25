import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import EditJobModal from "../Profile/Partials/EditJobModal";
EditJobModal;
const appUrl = import.meta.env.VITE_APP_URL;

const Home = () => {
    const [user, setUser] = useState(null);
    const [jobPostings, setJobPostings] = useState([]);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);

    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

        // Function to fetch the user ID
        const fetchUserAndJobs = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                const userData = response.data.user;
                userData.skills = userData.skills || "[]";
                setUser(userData);

                // Fetch jobs for the user
                const jobsResponse = await axios.get(
                    `${appUrl}/api/jobs/user/${userData.id}`
                );
                setJobPostings(jobsResponse.data);
            } catch (error) {
                console.error("Error fetching user ID or jobs:", error);
            }
        };

        fetchUserAndJobs();
    }, []);

    const openEditModal = (job) => {
        setJobToEdit(job);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const handleSave = (updatedJob) => {
        // Update the job in jobPostings state
        setJobPostings((prevJobs) =>
            prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
        );
        closeEditModal();
    };

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer>
                <CreateJobSection>
                    <JobTitle>Create a New Job Posting</JobTitle>
                    <JobSubtitle>
                        Hire amazing students through CO-OP Connect!
                    </JobSubtitle>
                    <JobDescription>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it t
                    </JobDescription>
                    <Link href="/employer/post1">
                        <PostJobButton>Post a Job</PostJobButton>
                    </Link>
                </CreateJobSection>
                <CurrentPostingsSection>
                    <SectionTitle>Current Company Postings</SectionTitle>
                    <EditingInstructions>
                        <Link href="/employer/viewpost">
                            <UnderlineText>View</UnderlineText>
                        </Link>{" "}
                        or <UnderlineText>edit</UnderlineText> your company’s
                        current job postings.
                    </EditingInstructions>
                    <PostingsGrid>
                        {jobPostings.map((post, i) => (
                            <JobPosting
                                key={i}
                                post={post}
                                openEditModal={openEditModal}
                            />
                        ))}
                    </PostingsGrid>
                </CurrentPostingsSection>
            </MainContainer>
            {editModalIsOpen && (
                <EditJobModal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    job={jobToEdit}
                    onSave={handleSave}
                />
            )}
        </NavBar>
    );
};
// Reusable Components
const JobPosting = ({ post, openEditModal }) => {
    const handleEditClick = () => {
        openEditModal(post); // Open modal for editing this specific job post
    };

    return (
        <JobCard>
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
                    <ViewPostingButton>VIEW POSTING</ViewPostingButton>
                </Link>
                <EditPostingButton onClick={handleEditClick}>
                    EDIT POSTING
                </EditPostingButton>
            </CardButtons>
        </JobCard>
    );
};

// Dummy data
const jobPostings = [
    {
        title: "Front-End Developer",
        companyName: "Company Name",
        location: "Location",
        tags: ["Javascript", "HTML", "Development", "+3"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
        title: "Front-End Developer",
        companyName: "Company Name",
        location: "Location",
        tags: ["Javascript", "HTML", "Development", "+3"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
        title: "Front-End Developer",
        companyName: "Company Name",
        location: "Location",
        tags: ["Javascript", "HTML", "Development", "+3"],
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
];

// Styled Components
const UnderlineText = styled.span`
    text-decoration: underline;
`;

const MainContainer = styled.main`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: var(--Schemes-Background, #fff7ff);
`;

const CreateJobSection = styled.section`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    color: #7b757f;
    padding: 20px 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobTitle = styled.h2`
    color: #6b538c;
    font: 600 32px Poppins, sans-serif;
`;

const JobSubtitle = styled.h3`
    margin-top: 10px;
    font: 500 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobDescription = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    text-align: center;
    margin-top: 30px;
    font: 400 22px/28px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const PostJobButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    margin-top: 30px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font: 700 16px/150% Roboto, sans-serif;
    cursor: pointer;
`;

const CurrentPostingsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 10px;
    margin-top: 40px;

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const SectionTitle = styled.h2`
    color: #6b538c;
    font: 600 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const EditingInstructions = styled.p`
    color: #7b757f;
    margin-top: 10px;
    font: 500 24px/32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const PostingsGrid = styled.div`
    justify-content: center;
    flex-wrap: wrap;
    align-self: stretch;
    margin: 20px 0 30px;
    display: flex;
    gap: 20px;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        max-width: 100%;
    }
`;

const JobCard = styled.article`
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #eddcff;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px 40px;
    @media (max-width: 991px) {
        margin-top: 20px;
        padding: 0 20px;
    }
`;

const JobCardTitle = styled.h3`
    color: #260e44;
    font: 28px/129% Poppins, sans-serif;
    text-align: center;
`;

const CompanyName = styled.h4`
    color: #260e44;
    font-family: Poppins, sans-serif;
    margin-top: 18px;
    letter-spacing: 0.15px;
    text-align: center;
`;

const Location = styled.p`
    color: #260e44;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
    text-align: center;
`;

const Tags = styled.div`
    justify-content: space-between;
    flex-wrap: wrap;
    display: flex;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    font-weight: 400;
    letter-spacing: 0.4px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const Tag = styled.span`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid #773dc3;
    padding: 8px 10px;
    white-space: nowrap;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const JobDescriptionText = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #260e44;
    text-align: center;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font: 400 14px/20px Poppins, sans-serif;
`;

const Divider = styled.div`
    background-color: #260e44;
    align-self: center;
    margin-top: 14px;
    width: 86px;
    height: 1px;
`;

const CardButtons = styled.div`
    justify-content: center;
    display: flex;
    margin-top: 15px;
    gap: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
`;

const ViewPostingButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    color: #fff;
    padding: 8px 16px;
`;

const EditPostingButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    border: 2px solid #6b538c;
    color: #260e44;
    padding: 8px 16px;
`;

const SkillsList = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    letter-spacing: 0.4px;
    line-height: 133%;

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid #773dc3;
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;

    &:nth-child(4) {
        background-color: #773dc3;
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

export default Home;
