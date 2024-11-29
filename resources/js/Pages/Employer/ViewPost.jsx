import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    deleteJob,
    selectJob,
    selectSingleJob,
    selectJobsStatus,
} from "@/Features/jobs/jobsSlice";
import { selectQuestions, getQuestionsWithAnswersAndResponsesByJobId } from "@/Features/questions/questionsSlice";
import {
    MainContainer,
    Container,
    Title,
    JobPostingCard,
    JobInfo,
    JobInfoLeft,
    CompanyName,
    JobDescription,
    StatusIcon,
    JobInfoRight,
    StatusTag,
    JobTypeTag,
    LocationTag,
    JobDetails,
    JobTitle,
    ActionButtons,
    ActionButton,
     JobDates
} from "./Styling/ViewPost.styles";

import { useDispatch, useSelector } from "react-redux";
import { usePage, Link } from "@inertiajs/react";

function ViewPost() {
    const { props } = usePage();
    const { jobId } = props;
    const questions = useSelector(selectQuestions);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    const dispatch = useDispatch();
    const job = useSelector(selectSingleJob);

    console.log(job)

    useEffect(() => {
        dispatch(selectJob({ jobId: jobId }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getQuestionsWithAnswersAndResponsesByJobId(jobId));
    }, [dispatch, jobId]);

    // State for handling modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedResponses, setSelectedResponses] = useState([]);

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteJob({ jobId: jobId }));
        setDeleteModalOpen(false); // Close the modal after deletion
    };

    // Function to open modal and show responses
    const openModal = (responses) => {
        setSelectedResponses(responses);
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedResponses([]);
    };

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize}>
                <Container darkMode={darkMode} fontSize={fontSize}>

                        <JobInfo darkMode={darkMode} fontSize={fontSize}>
                            <JobInfoLeft darkMode={darkMode} fontSize={fontSize}>
                                <JobDetails darkMode={darkMode} fontSize={fontSize}>
                                    <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>
                                    <CompanyName darkMode={darkMode} fontSize={fontSize}>{job?.company?.name}</CompanyName>
                                    <JobDates darkMode={darkMode} fontSize={fontSize}>
                                        <p><strong>Start Date:</strong> {job.startDate || 'N/A'}</p>
                                        <p><strong>End Date:</strong> {job.endDate || 'N/A'}</p>
                                    </JobDates>
                                    <JobDescription darkMode={darkMode} fontSize={fontSize} dangerouslySetInnerHTML={{ __html: job.description }} />
                                </JobDetails>
                            </JobInfoLeft>
                            <JobInfoRight darkMode={darkMode} fontSize={fontSize}>
                                {/* Job status details */}
                            </JobInfoRight>

                            <QuestionsContainer>
                            <JobTitle darkMode={darkMode} fontSize={fontSize}>Applicant Qualification Questions</JobTitle>
                                {questions.map((question) => (
                                    <QuestionComponent darkMode={darkMode} fontSize={fontSize} key={question.id} question={question} openModal={openModal} />
                                ))}
                            </QuestionsContainer>

                            <ActionButtons darkMode={darkMode} fontSize={fontSize}>


                                    <ActionButton darkMode={darkMode} fontSize={fontSize}  onClick={openDeleteModal}>
                                        Delete Job Posting
                                    </ActionButton>

                                <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/viewapplicants/${jobId}`}>
                                    <ActionButton darkMode={darkMode} fontSize={fontSize}>View Applicants</ActionButton>
                                </Link>
                            </ActionButtons>
                        </JobInfo>


                    {/* Modal for viewing responses */}
                    {isModalOpen && (
    <Modal darkMode={darkMode} onClick={closeModal}> {/* Add onClick to the modal background */}
        <ModalContent darkMode={darkMode} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside the modal */}
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>Responses</h2>
            {selectedResponses.length > 0 ? (
                selectedResponses.map((response, index) => (
                    <div key={index}>
                        <p><strong>Email:</strong> {response.user?.email || 'No email available'}</p> {/* User email */}

                    </div>
                ))
            ) : (
                <p>No responses available.</p>
            )}
        </ModalContent>
    </Modal>
)}

{isDeleteModalOpen && (
                <ModalOverlay darkMode={darkMode} onClick={closeDeleteModal}>
                    <ModalContent
                        darkMode={darkMode}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <ModalHeader darkMode={darkMode} fontSize={fontSize}>
                            Confirm Delete
                            <CloseButton onClick={closeDeleteModal}>&times;</CloseButton>
                        </ModalHeader>
                        <ModalBody darkMode={darkMode} fontSize={fontSize}>
                            Are you sure you want to delete this job posting? This action cannot be undone.
                        </ModalBody>
                        <ModalFooter darkMode={darkMode} fontSize={fontSize}>
                            <ActionButton
                                darkMode={darkMode}
                                fontSize={fontSize}
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </ActionButton>
                            <Link darkMode={darkMode} fontSize={fontSize} href={`/employer/home`}>
                            <ActionButton
                                darkMode={darkMode}
                                fontSize={fontSize}
                                onClick={handleDeleteConfirm}
                                style={{ backgroundColor: "red" }}
                            >
                                Confirm
                            </ActionButton></Link>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            )}

                </Container>
            </MainContainer>
        </NavBar>
    );
}

// Question Component
const QuestionComponent = ({ question, darkMode, fontSize, openModal }) => {
    return (
        <QuestionCard darkMode={darkMode} fontSize={fontSize}>
            <QuestionText darkMode={darkMode}>{question.question_text}</QuestionText>
            {question.question_type === 'multipleChoice' ? (
                <AnswersContainer>
                    {question.answers.length > 0 ? (
                        question.answers.map((answer) => (
                            <AnswerComponent
                                key={answer.id}
                                answer={answer}
                                responses={answer.responses}
                                darkMode={darkMode}
                                openModal={openModal}
                            />
                        ))
                    ) : (
                        <NoDataText darkMode={darkMode}>No answers available for this question.</NoDataText>
                    )}
                </AnswersContainer>
            ) : (
                <ResponsesContainer>
                    {question.responses.length > 0 ? (
                        question.responses.map((response, index) => (
                            <ResponseText key={index} darkMode={darkMode}>
                                {response.response_text} - {response.user?.email || 'No email available'}
                            </ResponseText>
                        ))
                    ) : (
                        <NoDataText darkMode={darkMode}>No responses submitted yet.</NoDataText>
                    )}
                </ResponsesContainer>
            )}
        </QuestionCard>
    );
};

// Answer Component with click to open modal
const AnswerComponent = ({ answer, responses, darkMode, openModal }) => {
    return (
        <AnswerCard isCorrect={answer.is_correct} darkMode={darkMode} onClick={() => openModal(responses)}>
            <AnswerText isCorrect={answer.is_correct} darkMode={darkMode}>
                {answer.answer_text}
                {answer.is_correct && <CorrectIndicator>(Correct)</CorrectIndicator>}
            </AnswerText>
            <ResponseCount darkMode={darkMode}>
                {responses.length} {responses.length === 1 ? 'response' : 'responses'}
            </ResponseCount>
            {/* Display response email if question type is etext */}
            {responses.length > 0 && (
                responses.map((response, index) => (
                    <ResponseText key={index} darkMode={darkMode}>
                        {response.response_text} - {response.user?.email || 'No email available'}
                    </ResponseText>
                ))
            )}
        </AnswerCard>
    );
};

const Modal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#000')};
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
    font-size: 20px; /* Slightly larger font for headings */
    font-weight: bold;
    margin-bottom: 15px; /* More spacing below question text */
    color: ${({ darkMode }) => (darkMode ? '#ffffff' : '#333')}; /* Slightly softer black for light mode */
`;

const AnswersContainer = styled.div`
    margin-top: 15px;
    max-height: 300px; /* Limit answer container height */
    overflow-y: auto;
    padding-right: 15px; /* Padding to avoid text overlap with scrollbar */
    padding-left: 5px; /* Symmetrical padding */
    scrollbar-width: thin; /* Thin scrollbar */
    scrollbar-color: ${({ darkMode }) => (darkMode ? '#555' : '#ccc')} transparent; /* Custom scrollbar color */
`;

const AnswerCard = styled.div`
    background-color: ${({ isCorrect, darkMode }) =>
        isCorrect ? (darkMode ? '#155724' : '#d4edda') : (darkMode ? '#3a3a3a' : '#fafafa')}; /* Slightly darker light mode and lighter dark mode */
    padding: 15px; /* More padding for clarity */
    border-radius: 8px; /* Slightly rounder corners */
    margin-bottom: 12px;
    border: 1px solid ${({ isCorrect, darkMode }) =>
        isCorrect ? (darkMode ? '#28a745' : '#28a745') : (darkMode ? '#666' : '#ddd')}; /* Softer border for non-correct answers */
    transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transitions */
`;

const AnswerText = styled.p`
    font-weight: ${({ isCorrect }) => (isCorrect ? 'bold' : 'normal')};
    color: ${({ isCorrect, darkMode }) =>
        isCorrect ? (darkMode ? '#28a745' : '#28a745') : (darkMode ? '#ffffff' : '#333')}; /* Softer contrast for readability */
    font-size: 16px; /* Slightly larger font for readability */
`;

const CorrectIndicator = styled.span`
    color: #28a745;
    margin-left: 8px;
    font-weight: bold;
`;

const ResponseCount = styled.p`
    font-size: 14px; /* Slightly larger for readability */
    color: ${({ darkMode }) => (darkMode ? '#bbb' : '#777')}; /* Softer gray for better contrast */
    margin-top: 5px; /* Add a little space between response count and answer text */
`;

const ResponsesContainer = styled.div`
    margin-top: 15px;
`;

const ResponseText = styled.p`
    background-color: ${({ darkMode }) => (darkMode ? '#444' : '#f9f9f9')}; /* Softer background in light mode */
    color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')}; /* Text color */
    padding: 12px; /* Adjusted padding */
    border-radius: 8px; /* Softer corners */
    margin-bottom: 12px;
    border: 1px solid ${({ darkMode }) => (darkMode ? '#555' : '#ddd')}; /* Border for response text */
`;

const NoDataText = styled.p`
    font-size: 16px;
    color: ${({ darkMode }) => (darkMode ? '#aaa' : '#999')}; /* Softer color for no data message */
    margin: 15px 0;
    text-align: center; /* Center align the message */
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Ensure the modal is above other elements */
  display: flex;
  justify-content: center;
  align-items: center;
`;



// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: ${({ fontSize }) => fontSize || "1.2em"};
  font-weight: bold;
`;

// Modal body
export const ModalBody = styled.div`
  margin-bottom: 20px;
  line-height: 1.5;
`;

// Modal footer
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

// Close button

// Button for actions like cancel and confirm
export const Button = styled.button`
  background-color: ${({ color }) => color || "#6c757d"}; /* Default color */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || "1em"};
  flex: 1; /* Ensures equal button sizes in ModalFooter */

  &:hover {
    background-color: ${({ color }) => (color === "red" ? "#c0392b" : color === "green" ? "#27ae60" : "#5a6268")};
  }
`;




export default ViewPost;
