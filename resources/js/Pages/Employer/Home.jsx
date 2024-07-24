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
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);

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

    const openEditModal = (job) => {
        setJobToEdit(job);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const handleSave = async (updatedJob) => {
        // Dispatch the patchJob action and wait for it to complete
        dispatch(
            patchJob({
                jobsId: updatedJob.id,
                title: updatedJob.title,
                description: updatedJob.description,
                company: updatedJob.company,
                location: updatedJob.location,
                postingStatus: updatedJob.postingStatus,
                jobType: updatedJob.jobType,
            })
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
                    {jobsStatus === "loading" && <p>Loading...</p>}
                    {jobs.length > 0 && (
                        <PostingsGrid>
                            {jobs.map((post, i) => (
                                <JobPosting
                                    key={i}
                                    post={post}
                                    openEditModal={openEditModal}
                                />
                            ))}
                        </PostingsGrid>
                    )}
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
    const dispatch = useDispatch();

    const handleEditClick = () => {
      openEditModal(post); // Open modal for editing this specific job post
    };

    const handleDeleteClick = (id) => {
      dispatch(deleteJob({ userId: id }));

    };
    console.log(post.id)

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
          <DeletePostingButton onClick={() => handleDeleteClick(post.id)}>
            DELETE POSTING
          </DeletePostingButton>
        </CardButtons>
      </JobCard>
    );
  };

export default Home;
