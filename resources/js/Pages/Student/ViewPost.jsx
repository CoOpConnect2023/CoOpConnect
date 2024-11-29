import React, { useState, useEffect } from "react";
import { keyframes, styled } from "styled-components";
import NavBar from "./Components/NavBar";
import { storeResponses } from "@/Features/questions/questionsSlice";
import { selectQuestions, getQuestionsWithAnswersAndResponsesByJobId } from "@/Features/questions/questionsSlice";
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

import { getAllUserDocuments, selectDocuments } from "@/Features/documents/documentsSlice";

import { getDocumentsForUserWithUser } from "@/Features/userdocumentsSlice/userDocumentsSlice";
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

const ViewPost = () => {
    const { props } = usePage();
    const { jobId, userId } = props;

    const dispatch = useDispatch();
    const job = useSelector(selectSingleJob);
    const questions = useSelector(selectQuestions);
    const documents = useSelector(selectDocuments);
    const jobStatus = useSelector(selectJobsStatus);
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const darkMode = useSelector((state) => state.accessibility.darkMode);

    const applied = useSelector(selectCheckUserJobs);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resumeLink, setResumeLink] = useState("");
    const [responses, setResponses] = useState({});
    const [resumeLinkOption, setResumeLinkOption] = useState(true);
    const [selectedDocumentId, setSelectedDocumentId] = useState("");

    // Fetch the job details
    useEffect(() => {
        dispatch(selectJob({ jobId }));
    }, [dispatch, jobId]);

    useEffect(() => {
        if (userId) {
            dispatch(getAllUserDocuments({ userId }));
        }
    }, [dispatch, userId]);

    // Check if the user has applied for the job
    useEffect(() => {
        dispatch(checkUserJob({ userId, jobsId: jobId }));
    }, [dispatch, userId, jobId]);

    // Fetch questions, answers, and responses for the job
    useEffect(() => {
        dispatch(getQuestionsWithAnswersAndResponsesByJobId(jobId));
    }, [dispatch, jobId]);

    // Filter user-specific responses
    const userResponses = Object.keys(responses)
        .filter((questionId) => responses[questionId].user_id === userId)
        .reduce((filteredResponses, questionId) => {
            filteredResponses[questionId] = responses[questionId];
            return filteredResponses;
        }, {});

    // Handle response change for text input or answer selection
    const handleResponseChange = (questionId, answerOrResponse) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: answerOrResponse,
        }));
    };

    const handleApply = () => {
        setIsModalOpen(true);
    };

    const handleApplyNow = () => {
        if (!resumeLink && !selectedDocumentId) {
            alert("Please provide either a resume link or select a document.");
            return;
        }

        const applicationData = {
            jobsId: Number(jobId),
            userId,
            resume: resumeLink,
            document_id: selectedDocumentId,
        };

        dispatch(postUserJob(applicationData))
            .then(() => {
                return dispatch(storeResponses({
                    jobId,
                    userId,
                    responses: Object.keys(responses).map((questionId) => ({
                        question_id: questionId,
                        response_text: typeof responses[questionId] === 'string' ? responses[questionId] : null,
                        answer_id: typeof responses[questionId] === 'number' ? responses[questionId] : null
                    }))
                }));
            })
            .then(() => {
                dispatch(checkUserJob({ userId, jobsId: jobId }));
            })
            .catch((error) => {
                console.error("Error applying for the job or submitting responses:", error);
            });

        setIsModalOpen(false);
    };
   

    return (
        <NavBar fontSize={fontSize} darkMode={darkMode} header={"Job Posting View"}>
            <MainContainer fontSize={fontSize} darkMode={darkMode}>
                <Container fontSize={fontSize} darkMode={darkMode}>
                    <JobTitle fontSize={fontSize} darkMode={darkMode}>Review Posting Information</JobTitle>
                    <JobPostingCard fontSize={fontSize} darkMode={darkMode}>

                        <JobInfo fontSize={fontSize} darkMode={darkMode}>
                            <JobInfoLeft fontSize={fontSize} darkMode={darkMode}>
                                <JobDetails fontSize={fontSize} darkMode={darkMode}>
                                    <JobTitle fontSize={fontSize} darkMode={darkMode}>{job.title}</JobTitle>
                                    <CompanyName fontSize={fontSize} darkMode={darkMode}>{job?.user?.company?.name}</CompanyName>
                                    <p><b>Start Date:</b> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A'}</p>
                                    <p><b>End Date:</b> {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A'}</p>
                                    <JobDescription dangerouslySetInnerHTML={{ __html: job.description }}  darkMode={darkMode} />
                                </JobDetails>
                            </JobInfoLeft>
                            <JobInfoRight fontSize={fontSize} darkMode={darkMode}>
                                <StatusTag fontSize={fontSize} darkMode={darkMode}>Posting Status: {job.postingStatus}</StatusTag>
                                <JobTypeTag fontSize={fontSize} darkMode={darkMode}>Job Type: {job.jobType}</JobTypeTag>
                                <LocationTag fontSize={fontSize} darkMode={darkMode}>Work Location: {job.location}</LocationTag>
                            </JobInfoRight>
                            {!applied && job.postingStatus != "Closed" &&
                                <QuestionsContainer fontSize={fontSize} darkMode={darkMode}>
                                    <JobTitle fontSize={fontSize} darkMode={darkMode}>Respond to Employer Questions</JobTitle>
                                    {questions.map((question) => (
                                        <QuestionComponent fontSize={fontSize} darkMode={darkMode}
                                            key={question.id}
                                            question={question}
                                            handleResponseChange={handleResponseChange}
                                            applied={applied}
                                            userResponses={userResponses} // Pass only the user-specific responses
                                        />
                                    ))}
                                </QuestionsContainer>
                            }

                            {applied &&
                            <JobTitle style={{
      marginBottom: "10px",
      color: darkMode ? "#FFF" : "#333",
      textAlign: "center",
    }}  fontSize={fontSize} darkMode={darkMode} >You have already submitted an application for this job.</JobTitle>}
                            {job.postingStatus != "Closed" &&
                                <ActionButtons fontSize={fontSize} darkMode={darkMode}>


                                    <ActionButton
                                        fontSize={fontSize}
                                        darkMode={darkMode}
                                        onClick={handleApply}
                                        disabled={applied}
                                    >
                                        {applied ? "Applied" : "Submit Application"}
                                    </ActionButton>

                                    {applied &&

                                    <Link href="/student/jobs">
                                        <ActionButton
                                            fontSize={fontSize}
                                            darkMode={darkMode}

                                        >
                                            Back to Postings
                                        </ActionButton>
                                    </Link>
                                    }

                                </ActionButtons>
                            }
                        </JobInfo>
                    </JobPostingCard>
                </Container>
            </MainContainer>

            {/* Modal for applying */}
            {isModalOpen && (
                <ModalBackdrop fontSize={fontSize} darkMode={darkMode}>
                    <ModalContent fontSize={fontSize} darkMode={darkMode}>
                        <ModalHeader fontSize={fontSize} darkMode={darkMode}>Apply for Job</ModalHeader>
                        <ModalBody fontSize={fontSize} darkMode={darkMode}>
                            <LabelWithSpace fontSize={fontSize} darkMode={darkMode}>
                                Select Document or Enter Resume Link:
                                <SelectToggle>
                                    <button
                                        onClick={() => setResumeLinkOption(true)}
                                        style={{
                                            backgroundColor: resumeLinkOption ? "#773dc3" : "#ddd",
                                            color: resumeLinkOption ? "#fff" : "#000",
                                            padding: '5px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Enter Resume Link
                                    </button>
                                    <button
                                        onClick={() => setResumeLinkOption(false)}
                                        style={{
                                            backgroundColor: !resumeLinkOption ? "#773dc3" : "#ddd",
                                            color: !resumeLinkOption ? "#fff" : "#000",
                                            padding: '5px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Select from Documents
                                    </button>
                                </SelectToggle>
                            </LabelWithSpace>

                            {resumeLinkOption ? (
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
                            ) : (
                                <LabelWithSpace fontSize={fontSize} darkMode={darkMode}>
                                    Select a Document:
                                    <DocumentSelect
                                        value={selectedDocumentId}
                                        onChange={(e) => setSelectedDocumentId(e.target.value)}
                                        fontSize={fontSize}
                                        darkMode={darkMode}
                                    >
                                        <option value="">Select Document</option>
                                        {documents.map((document) => (
                                            <option key={document.id} value={document.id}>
                                                {document.title}
                                            </option>
                                        ))}
                                    </DocumentSelect>
                                </LabelWithSpace>
                            )}
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
};


const QuestionComponent = ({ question, handleResponseChange, darkMode, fontSize }) => {
    return (
        <QuestionCard fontSize={fontSize} darkMode={darkMode}>
            <QuestionText fontSize={fontSize} darkMode={darkMode}>{question.question_text}</QuestionText>
            {question.question_type === 'multipleChoice' ? (
                <AnswersContainer fontSize={fontSize} darkMode={darkMode}>
                    {question.answers.length > 0 ? (
                        question.answers.map((answer) => (
                            <AnswerComponent fontSize={fontSize} darkMode={darkMode}
                                key={answer.id}
                                answer={answer}
                                questionId={question.id}
                                handleResponseChange={handleResponseChange}
                            />
                        ))
                    ) : (
                        <NoDataText fontSize={fontSize} darkMode={darkMode}>No answers available for this question.</NoDataText>
                    )}
                </AnswersContainer>
            ) : (
                // If it's a text question, display an input field
                <TextInputContainer fontSize={fontSize} darkMode={darkMode}>
                    <TextInput fontSize={fontSize} darkMode={darkMode}
                        type="text"
                        placeholder="Enter your response..."
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                    />
                </TextInputContainer>
            )}
        </QuestionCard>
    );
};

// Component to render individual answers for multiple choice questions
const AnswerComponent = ({ answer, questionId, handleResponseChange, darkMode, fontSize }) => {
    return (
        <AnswerCard fontSize={fontSize} darkMode={darkMode}>
            <label>
                <input
                    type="radio"
                    name={`question-${questionId}`} // Ensure answers are grouped by question
                    value={answer.id}
                    onChange={() => handleResponseChange(questionId, answer.id)} // Call when the answer is selected
                />
                {answer.answer_text}
            </label>
        </AnswerCard>
    );
};


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
    border-radius: 10px;
    width: 100%;
    flex: 1;
    transition: background-color 0.5s ease, color 0.5s ease;
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

const Container = styled.section`
    align-self: center;
    transition: background-color 0.5s ease, color 0.5s ease;
    display: flex;
flex: 1;
    width: 100%;
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
    position: relative;
    transition: background-color 0.5s ease, color 0.5s ease;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: ${({ darkMode }) => (darkMode ? '#2C2C2C' : '#eddcff')};
    padding: 20px;
    flex: 1;
    width: 100%;
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

const JobDescription = styled.div`
    display: block;
    margin-top: 10px;

    /* Only apply styles to container content */
    h1 {
        font-size: 2em;
        font-weight: bold;
        text-decoration: underline;
    }

    p {
        font-size: 1em;
        margin: 0.5em 0;
    }

    strong {
        font-weight: bold;
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
     /* Make the section absolute */
    bottom: 0; /* Stick it to the bottom of the container */
    width: 100%; /* Ensure it spans the full width */
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

const QuestionsContainer = styled.div`
    margin-top: 20px;
    max-height: 50vh; /* Maintain a view height limit for scrolling */
    overflow-y: auto;
    padding-right: 15px; /* Increased padding for better separation from scrollbar */
    padding-left: 10px;
    scrollbar-width: thin; /* Makes the scrollbar thinner */
    scrollbar-color: ${({ darkMode }) => (darkMode ? '#888' : '#ccc')} transparent;
    width: 100%; /* Ensure it takes up full width */
    box-sizing: border-box; /* Include padding within width */
`;

const QuestionCard = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#2b2b2b' : '#f0f0f0')}; /* Softer dark/light background */
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')}; /* Light text on dark, dark text on light */
    padding: 20px; /* Increased padding for spacing */
    border-radius: 10px; /* Slightly larger border radius for smoother appearance */
    margin-bottom: 20px; /* Increased margin for better separation between questions */
    box-shadow: ${({ darkMode }) => (darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)')}; /* Light shadow for better depth */
    transition: background-color 0.3s ease; /* Smooth transition for background color changes */
`;
const QuestionText = styled.h4`
    font-size: 18px;
    font-weight: bold;
`;

const AnswersContainer = styled.div`
    margin-top: 10px;
`;

const AnswerCard = styled.div`
    background-color: ${({ isCorrect }) => (isCorrect ? '#d4edda' : '#f8f9fa')}; // Green background if correct, default otherwise
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid ${({ isCorrect }) => (isCorrect ? '#28a745' : '#ccc')}; // Green border if correct
`;

const AnswerText = styled.p`
    font-weight: ${({ isCorrect }) => (isCorrect ? 'bold' : 'normal')}; // Bold if the answer is correct
    color: ${({ isCorrect }) => (isCorrect ? '#28a745' : '#333')}; // Green color if correct, default color otherwise
`;

const CorrectIndicator = styled.span`
    color: #28a745;
    margin-left: 5px;
    font-weight: bold;
`;

const ResponseCount = styled.p`
    font-size: 12px;
    color: #6c757d;
`;

const ResponsesContainer = styled.div`
    margin-top: 10px;
`;

const ResponseText = styled.p`
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #333;
`;

const NoDataText = styled.p`
    font-size: 16px;
    color: gray;
    margin: 10px 0;
`;

const TextInputContainer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

// Styled component for the text input field
const TextInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({ darkMode }) => (darkMode ? '#2c2c2c' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};

    &:focus {
        outline: none;
        border-color: ${({ darkMode }) => (darkMode ? '#555' : '#007bff')};
    }
`;

const DocumentSelect = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    background-color: ${({ darkMode }) => (darkMode ? '#2c2c2c' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};

    &:focus {
        outline: none;
        border-color: ${({ darkMode }) => (darkMode ? '#555' : '#007bff')};
    }
`;

const SelectToggle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
`;



export default ViewPost;
