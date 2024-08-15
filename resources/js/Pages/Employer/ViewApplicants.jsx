import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { patchUserJob, selectApplicants, getUserDetails } from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";
import { selectJob, selectSingleJob } from "@/Features/jobs/jobsSlice";

// Decline Modal Component
const DeclineModal = ({ applicant, onClose, onSubmit, darkMode, fontSize }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        onSubmit(message);
        onClose();
    };

    return (
        <Modal darkMode={darkMode} fontSize={fontSize}>
            <ModalContent darkMode={darkMode} fontSize={fontSize}>
                <h2 style={{ fontSize: fontSize, color: darkMode ? "#fff" : "#000" }}>
                    Reject {applicant.name}
                </h2>
                <FormGroup darkMode={darkMode} fontSize={fontSize}>
                    <Label darkMode={darkMode} fontSize={fontSize}>Message</Label>
                    <TextArea
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here"
                        darkMode={darkMode}
                        fontSize={fontSize}
                    />
                </FormGroup>
                <Actions darkMode={darkMode} fontSize={fontSize}>
                    <Button color="gray" onClick={onClose} darkMode={darkMode} fontSize={fontSize}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleSubmit} darkMode={darkMode} fontSize={fontSize}>
                        Send
                    </Button>
                </Actions>
            </ModalContent>
        </Modal>
    );
};

// ViewApplicants Component
const ViewApplicants = () => {
    const { props } = usePage();
    const { jobId } = props;
    const [activeTab, setActiveTab] = useState("Pending");
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const dispatch = useDispatch();
    const applicants = useSelector(selectApplicants);
    const job = useSelector(selectSingleJob);

    useEffect(() => {
        dispatch(getUserDetails({ jobsId: jobId }));
        dispatch(selectJob({ jobId }));
    }, [dispatch, jobId]);

    const tabs = ["Pending", "Interview", "Scheduled", "Declined", "Rejected"];

    const handleDecline = (applicant) => {
        setSelectedApplicant(applicant);
        setIsDeclineModalOpen(true);
    };

    const handleDeclineSubmit = (message) => {
        dispatch(
            patchUserJob({
                userJobsId: selectedApplicant.id,
                status: "Rejected",
                message: message,
                timeSlots: [""],
            })
        );
    };

    const handleAccept = (applicant) => {
        window.location.href = `/employer/accept-applicant/${applicant.id}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZoneName: "short",
        }).format(date);
    };

    const renderApplicants = () => {
        return applicants
            .filter((applicant) => applicant.status === activeTab)
            .map((applicant) => (
                <TableRow key={applicant.id} darkMode={darkMode} fontSize={fontSize}>
                    <TableData darkMode={darkMode} fontSize={fontSize}>{applicant.name}</TableData>
                    <TableData darkMode={darkMode} fontSize={fontSize}>{applicant.userId}</TableData>
                    <TableData darkMode={darkMode} fontSize={fontSize}>{applicant.email}</TableData>
                    <TableData>
                        <ResumeLink
                            href={applicant.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            darkMode={darkMode} fontSize={fontSize}
                        >
                            View Resume
                        </ResumeLink>
                    </TableData>

                    {applicant.status === "Pending" && (
                        <TableData darkMode={darkMode} fontSize={fontSize}>
                            <Button color="green" onClick={() => handleAccept(applicant)} darkMode={darkMode} fontSize={fontSize}>
                                Accept
                            </Button>
                            <Button color="red" onClick={() => handleDecline(applicant)} darkMode={darkMode} fontSize={fontSize}>
                                Reject
                            </Button>
                        </TableData>
                    )}
                    {applicant.status === "Scheduled" && (
                        <TableData darkMode={darkMode} fontSize={fontSize}>{formatDate(applicant.timeSlots)}</TableData>
                    )}
                </TableRow>
            ));
    };

    return (
        <NavBar header={"View Applicants"}>
            {job && (
                <>
                    <JobDetails darkMode={darkMode} fontSize={fontSize}>
                        <p><b>Position:</b> {job.title}</p>
                        <p><b>Company:</b> {job.company}</p>
                        <p><b>Location:</b> {job.location}</p>
                        <p><b>Description:</b> {job.description}</p>
                    </JobDetails>
                    <Container darkMode={darkMode} fontSize={fontSize}>
                        <Tabs darkMode={darkMode} fontSize={fontSize}>
                            {tabs.map((tab) => (
                                <Tab
                                    darkMode={darkMode}
                                    fontSize={fontSize}
                                    key={tab}
                                    $active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tabs>
                        <TableContainer darkMode={darkMode} fontSize={fontSize}>
                            <Table darkMode={darkMode} fontSize={fontSize}>
                                <TableHead>
                                    <TableRow darkMode={darkMode} fontSize={fontSize}>
                                        <TableHeader darkMode={darkMode} fontSize={fontSize}>Name</TableHeader>
                                        <TableHeader darkMode={darkMode} fontSize={fontSize}>Student ID</TableHeader>
                                        <TableHeader darkMode={darkMode} fontSize={fontSize}>Email</TableHeader>
                                        <TableHeader darkMode={darkMode} fontSize={fontSize}>Resume</TableHeader>
                                        {activeTab === "Pending" && (
                                            <TableHeader darkMode={darkMode} fontSize={fontSize}>Actions</TableHeader>
                                        )}
                                        {activeTab === "Scheduled" && (
                                            <TableHeader darkMode={darkMode} fontSize={fontSize}>Date</TableHeader>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                    {applicants.length > 0 ? (
                                        renderApplicants()
                                    ) : (
                                        <TableRow darkMode={darkMode} fontSize={fontSize}>
                                            <TableData colSpan="5" darkMode={darkMode} fontSize={fontSize}>
                                                No applicants found.
                                            </TableData>
                                        </TableRow>
                                    )}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </Container>

                    {isDeclineModalOpen && (
                        <DeclineModal
                            applicant={selectedApplicant}
                            onClose={() => setIsDeclineModalOpen(false)}
                            onSubmit={handleDeclineSubmit}
                            darkMode={darkMode}
                            fontSize={fontSize}
                        />
                    )}
                </>
            )}
        </NavBar>
    );
};

export default ViewApplicants;

// Styled Components
const Container = styled.div`
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    transition: background-color 0.5s ease, color 0.5s ease;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const Tab = styled.div`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: ${({ $active, darkMode }) => ($active ? "#6c4bcf" : darkMode ? "#B7A1E5" : "#6c4bcf")};
    color: ${({ $active, darkMode }) => ($active ? "#FFF" : darkMode ? "#FFF" : "#FFF")};
    border-radius: 5px;
    user-select: none;
    font-size: ${({ fontSize }) => fontSize};

    &:hover {
        background: ${({ $active, darkMode }) => ($active ? (darkMode ? "#0056b3" : "#0056b3") : darkMode ? "#4a4a4a" : "#c7c7c7")};
    }

    @media (max-width: 768px) {
        padding: 5px 10px;
        margin: 5px;
    }
`;

const JobDetails = styled.div`
    margin-bottom: 20px;
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#000")};
    font-size: ${({ fontSize }) => fontSize};

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const TableContainer = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#f9f9f9")};
    color: ${({ darkMode }) => (darkMode ? "#000" : "#000")};
    font-size: ${({ fontSize }) => fontSize};

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const TableHead = styled.thead`
    background-color: ${({ darkMode }) => (darkMode ? "#555" : "#f1f1f1")};
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: ${({ darkMode }) => (darkMode ? "#3a3a3a" : "#f9f9f9")};
    }
`;

const TableHeader = styled.th`
    padding: 12px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#ddd")};
    text-align: left;

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const TableData = styled.td`
    padding: 12px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#ddd")};
    text-align: left;
    color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const ResumeLink = styled.a`
    color: ${({ darkMode }) => (darkMode ? "#7ca1f2" : "#007bff")};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    margin: 5px;
    padding: 10px 15px;
    font-size: ${({ fontSize }) => fontSize};
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.color};

    @media (max-width: 768px) {
        padding: 8px 12px;
        margin: 5px 2px;
        font-size: 0.9em;
    }
`;
