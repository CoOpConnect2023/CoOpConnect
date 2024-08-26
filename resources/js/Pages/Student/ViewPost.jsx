import React, { useState, useEffect } from "react";
import { keyframes, styled } from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJob,
    selectSingleJob,
    selectJobsStatus,
} from "@/Features/jobs/jobsSlice";
import {
    postUserJob,
    checkUserJob,
    selectCheckUserJobs,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage, Link } from "@inertiajs/react";

const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number

    if (emValue === '1em') {
        return `${basePixelSize * em}px`;
    }

    if (emValue === '1.07em') {
        return `${basePixelSize * em * 1.3}px`;
    }

    if (emValue === '1.12em') {
        return `${basePixelSize * em * 1.7}px`;
    }

    return `${basePixelSize * em * factor}px`;
};

function ViewPost() {
    const { props } = usePage();
    const { jobId, userId } = props;

    const dispatch = useDispatch();
    const job = useSelector(selectSingleJob);
    const jobStatus = useSelector(selectJobsStatus);
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const darkMode = useSelector((state) => state.accessibility.darkMode);

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

        setIsModalOpen(false);
    };

    return (
        <NavBar fontSize={fontSize} darkMode={darkMode} header={"Job Posting View"}>
            <MainContainer fontSize={fontSize} darkMode={darkMode}>
                <Container fontSize={fontSize} darkMode={darkMode}>
                    <JobPostingCard fontSize={fontSize} darkMode={darkMode}>
                        <JobInfo fontSize={fontSize} darkMode={darkMode}>
                            <JobInfoLeft fontSize={fontSize} darkMode={darkMode}>
                                <CompanyLogo
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c18c37d4baea2f5cbd4d392adacf6fa12686c4c99b1f2a12d132c4a3ef4a5899?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="Company Logo"
                                />
                                <JobDetails fontSize={fontSize} darkMode={darkMode}>
                                    <JobTitle fontSize={fontSize} darkMode={darkMode}>{job.title}</JobTitle>
                                    <CompanyName fontSize={fontSize} darkMode={darkMode}>{job.company}</CompanyName>
                                    <JobDescription fontSize={fontSize} darkMode={darkMode}>
                                        {job.description}
                                    </JobDescription>
                                </JobDetails>
                            </JobInfoLeft>
                            <JobInfoRight fontSize={fontSize} darkMode={darkMode}>
                                <StatusTag fontSize={fontSize} darkMode={darkMode}>
                                    Posting Status: {job.postingStatus}
                                </StatusTag>
                                <JobTypeTag fontSize={fontSize} darkMode={darkMode}>Job Type: {job.jobType}</JobTypeTag>
                                <LocationTag fontSize={fontSize} darkMode={darkMode}>
                                    Work Location: {job.location}
                                </LocationTag>
                            </JobInfoRight>
                            <ActionButtons fontSize={fontSize} darkMode={darkMode}>
                                <ActionButton fontSize={fontSize} darkMode={darkMode}
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
                <ModalBackdrop fontSize={fontSize} darkMode={darkMode}>
                    <ModalContent fontSize={fontSize} darkMode={darkMode}>
                        <ModalHeader fontSize={fontSize} darkMode={darkMode}>Apply for Job </ModalHeader>
                        <ModalBody fontSize={fontSize} darkMode={darkMode}>
                            <LabelWithSpace fontSize={fontSize} darkMode={darkMode} data-test-id="resume-link-label">
                                Resume Link:
                                <SpacedInput
                                    type="text"
                                    value={resumeLink}
                                    onChange={(e) => setResumeLink(e.target.value)}
                                    data-test-id="resume-link-input"
                                    fontSize={fontSize}
                                    darkMode={darkMode}
                                />
                            </LabelWithSpace>
                        </ModalBody>
                        <ModalFooter fontSize={fontSize} darkMode={darkMode}>
                            <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </ModalButton>
                            <ModalButton fontSize={fontSize} darkMode={darkMode} onClick={handleApplyNow}>
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
    border-radius: 10px;
    width: 100%;
    flex:1;
    transition: background-color 0.5s ease, color 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Container = styled.section`
    align-self: center;
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
    width: 788px;
    max-width: 100%;
    flex-direction: column;
    padding: 10px 10px 0;
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const JobPostingCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background-color 0.5s ease, color 0.5s ease;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    padding: 20px;
    margin-top: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobInfo = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    font-weight: 400;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const JobInfoLeft = styled.div`
    display: flex;
    gap: 20px;
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#260e44')};
    font-weight: 400;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const CompanyLogo = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 100px;
    border: 2px solid ${({ darkMode }) => (darkMode ? '#555' : 'rgba(45, 54, 72, 1)')};
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
    font-size: ${({ fontSize }) => calculateFontSize(32, fontSize)};
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const CompanyName = styled.h4`
    color: ${({ darkMode }) => (darkMode ? '#6c538c' : '#6c538c')};
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(22, fontSize)};
    font-weight: 500;
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
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    line-height: 24px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobInfoRight = styled.div`
    justify-content: center;
    border-bottom: 1px solid black;
    display: flex;
    margin-bottom: 0.5vh;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#fff')};
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
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const JobTypeTag = styled.span`
    font-family: Poppins, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: var(--Palettes-Primary-40, #773dc3);
    justify-content: center;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const LocationTag = styled.span`
    font-family: Poppins, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    background-color: var(--Palettes-Primary-40, #773dc3);
    justify-content: center;
    padding: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 0.5vh;
    gap: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
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
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const slideUp = keyframes`
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); /* Darker backdrop for better focus */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${fadeIn} 0.3s ease-in-out;

`;

const ModalContent = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : 'white')};
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Stronger shadow for better elevation */
    width: 500px;
    max-width: 90%;
    animation: ${slideUp} 0.4s ease-in-out;
    position: relative; /* For positioning the close button */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ModalHeader = styled.h3`
    margin: 0;
    margin-bottom: 20px; /* Increased spacing for better visual separation */
    font-size: ${({ fontSize }) => calculateFontSize(26, fontSize)};
    text-align: center;
    font-weight: 600; /* Slightly bolder font for emphasis */
    color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
`;

const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-height: 60vh; /* Limit height to prevent overflow */
    overflow-y: auto; /* Scroll if content overflows */
    color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px; /* Increased margin for better separation */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const ModalButton = styled.button`
    font-family: Poppins, sans-serif;
    background-color: #773dc3;
    color: white;
    padding: 12px 24px; /* Larger padding for bigger buttons */
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, transform 0.2s;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    &:hover {
        background-color: #542a93;
        transform: translateY(-2px); /* Slight lift effect */
    }

    &:active {
        background-color: #3b2071; /* Darker shade for active state */
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')};
    transition: color 0.2s;

    &:hover {
        color: ${({ darkMode }) => (darkMode ? '#ccc' : '#000')};
    }
`;

const LabelWithSpace = styled.label`
    display: flex;
    flex-direction: column;
    gap: 10px; /* Space between text and input */
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const SpacedInput = styled.input`
    margin-top: 8px; /* Space between label text and input field */
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: ${({ darkMode }) => (darkMode ? 'black' : 'black')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export default ViewPost;
