import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJob,
    selectJobs,
    selectJobsStatus,
} from "@/Features/jobs/jobsSlice";
import {
    postUserJob,
    checkUserJob,
    selectCheckUserJobs,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage, Link } from "@inertiajs/react";

function ViewPost() {
    const { props } = usePage();
    const { jobId, userId } = props;

    const dispatch = useDispatch();
    const job = useSelector(selectJobs);
    const jobStatus = useSelector(selectJobsStatus);

    const applied = useSelector(selectCheckUserJobs);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumeLink, setResumeLink] = useState("");

    useEffect(() => {
        dispatch(selectJob({ jobId: jobId }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(checkUserJob({ userId: userId, jobsId: jobId }));
    }, [dispatch, job]);

    const handleApply = () => {
        setIsModalOpen(true);
    };

    const handleApplyNow = () => {
        dispatch(
            postUserJob({
                jobsId: Number(jobId),
                userId: userId,
                resume: resumeLink,
            })
        ).then((response) => {
            dispatch(checkUserJob({ userId: userId, jobsId: jobId }));
        });
        console.log("Resume Link:", resumeLink);
        setIsModalOpen(false);
    };

    return (
        <NavBar header={"Job Posting"}>
            <MainContainer>
                <Container>
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
                            </JobInfoLeft>
                            <JobInfoRight>
                                <StatusTag>
                                    Posting Status: {job.postingStatus}
                                </StatusTag>
                                <JobTypeTag>Job Type: {job.jobType}</JobTypeTag>
                                <LocationTag>
                                    Work Location: {job.location}
                                </LocationTag>
                            </JobInfoRight>
                            <ActionButtons>
                                <ActionButton
                                    onClick={handleApply}
                                    disabled={applied}
                                >
                                    {applied ? "Applied" : "Apply"}
                                </ActionButton>
                            </ActionButtons>
                        </JobInfo>
                    </JobPostingCard>
                </Container>
            </MainContainer>
            {isModalOpen && (
                <ModalBackdrop>
                    <ModalContent>
                        <ModalHeader>Apply for Job</ModalHeader>
                        <ModalBody>
                            <label>
                                Resume Link:
                                <input
                                    type="text"
                                    value={resumeLink}
                                    onChange={(e) =>
                                        setResumeLink(e.target.value)
                                    }
                                />
                            </label>
                        </ModalBody>
                        <ModalFooter>
                            <ModalButton onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </ModalButton>
                            <ModalButton onClick={handleApplyNow}>
                                Apply Now
                            </ModalButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </NavBar>
    );
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
    width: 100%;
    min-height: 100vh;
`;

const Container = styled.section`
    align-self: center;
    display: flex;
    width: 788px;
    max-width: 100%;
    flex-direction: column;
    padding: 10px 10px 0;
`;

const JobPostingCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: var(--Schemes-Primary-Container, #eddcff);
    padding: 20px;
    margin-top: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobInfo = styled.section`
    display: flex;
    flex-direction: column; /* Changed from row to column */
    gap: 20px;
    color: var(--Schemes-On-Primary-Container, #260e44);
    font-weight: 400;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const JobInfoLeft = styled.div`
    display: flex;
    gap: 20px;
    color: var(--Schemes-On-Primary-Container, #260e44);
    font-weight: 400;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const CompanyLogo = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 100px;
    border: 2px solid rgba(45, 54, 72, 1);
    max-width: 100%;
    margin: auto 0;
`;

const JobDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobTitle = styled.h3`
    font: 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const CompanyName = styled.h4`
    color: var(--Schemes-Secondary, #6c538c);
    margin-top: 10px;
    font: 500 22px/127% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    letter-spacing: 0.5px;
    margin-top: 10px;
    font: 16px/24px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobInfoRight = styled.div`
    justify-content: center;
    border-bottom: 1px solid black;
    display: flex;
    gap: 10px;
    font-size: 16px;
    color: var(--Schemes-On-Primary, #fff);
    font-weight: 500;
    letter-spacing: 0.15px;
    line-height: 150%;
    padding: 10px 20px;
    @media (max-width: 991px) {
        flex-wrap: wrap;
        padding: 0 20px;
    }
`;

const StatusTag = styled.span`
    font-family: Poppins, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: var(--Palettes-Primary-40, #773dc3);
    justify-content: center;
    padding: 10px;
`;

const JobTypeTag = styled.span`
    font-family: Poppins, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: var(--Palettes-Primary-40, #773dc3);
    justify-content: center;
    padding: 10px;
`;

const LocationTag = styled.span`
    font-family: Poppins, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: var(--Palettes-Primary-40, #773dc3);
    justify-content: center;
    padding: 10px;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
`;

const ActionButton = styled.button`
    font-family: Poppins, sans-serif;
    background-color: ${(props) =>
        props.applied
            ? "rgba(119, 61, 195, 0.5)"
            : "var(--Palettes-Primary-40, #773dc3)"};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: ${(props) => (props.applied ? "not-allowed" : "pointer")};
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.applied
                ? "rgba(119, 61, 195, 0.5)"
                : "var(--Palettes-Primary-30, #542a93)"};
    }

    &:disabled {
        background-color: rgba(119, 61, 195, 0.5);
        cursor: not-allowed;
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 100%;
`;

const ModalHeader = styled.h3`
    margin: 0;
    margin-bottom: 10px;
    font-size: 24px;
    text-align: center;
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ModalButton = styled.button`
    font-family: Poppins, sans-serif;
    background-color: var(--Palettes-Primary-40, #773dc3);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--Palettes-Primary-30, #542a93);
    }
`;

export default ViewPost;
