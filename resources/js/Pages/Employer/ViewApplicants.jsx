import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    patchUserJob,
    selectApplicants,
    getUserDetails,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage, Link } from "@inertiajs/react";
import { selectJob, selectSingleJob } from "@/Features/jobs/jobsSlice";

// Decline Modal Component
const DeclineModal = ({ applicant, onClose, onSubmit }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        onSubmit(message);
        onClose();
    };

    return (
        <Modal>
            <ModalContent>
                <h2>Reject {applicant.name}</h2>
                <FormGroup>
                    <Label>Message</Label>
                    <TextArea
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here (optional)"
                    />
                </FormGroup>
                <Actions>
                    <Button color="gray" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleSubmit}>
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

    const dispatch = useDispatch();
    const applicants = useSelector(selectApplicants);
    const job = useSelector(selectSingleJob);

    useEffect(() => {
        dispatch(getUserDetails({ jobsId: jobId }));
        dispatch(
            selectJob({
                jobId: jobId,
            })
        );
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
        console.log(
            `Declined ${selectedApplicant.name} with message: ${message}`
        );
    };

    const handleAccept = (applicant) => {
        window.location.href = `/employer/accept-applicant/${applicant.id}`;
    };

    const renderApplicants = () => {
        return applicants
            .filter((applicant) => applicant.status === activeTab)
            .map((applicant) => (
                <TableRow key={applicant.id}>
                    <TableData>{applicant.name}</TableData>
                    <TableData>{applicant.email}</TableData>
                    <TableData>
                        <ResumeLink
                            href={applicant.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Resume
                        </ResumeLink>
                    </TableData>

                    {applicant.status === "Pending" && (
                        <TableData>
                            <Button
                                color="green"
                                onClick={() => handleAccept(applicant)}
                            >
                                Accept
                            </Button>
                            <Button
                                color="red"
                                onClick={() => handleDecline(applicant)}
                            >
                                Reject
                            </Button>
                        </TableData>
                    )}
                </TableRow>
            ));
    };

    return (
        <NavBar header={"View Applicants"}>
            {job && (
                <>
                    <p>
                        <b>Position:</b> {job.title}
                    </p>
                    <p>
                        <b>Company:</b> {job.company}
                    </p>
                    <p>
                        <b>Location:</b> {job.location}
                    </p>
                    <p>
                        <b>Description:</b> {job.description}
                    </p>
                    <Container>
                        <Tabs>
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab}
                                    $active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </Tabs>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Email</TableHeader>
                                    <TableHeader>Resume</TableHeader>

                                    {activeTab === "Pending" && (
                                        <TableHeader>Actions</TableHeader>
                                    )}
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {applicants.length > 0 ? (
                                    renderApplicants()
                                ) : (
                                    <TableRow>
                                        <TableData colSpan="5">
                                            No applicants found.
                                        </TableData>
                                    </TableRow>
                                )}
                            </tbody>
                        </Table>
                    </Container>

                    {isDeclineModalOpen && (
                        <DeclineModal
                            applicant={selectedApplicant}
                            onClose={() => setIsDeclineModalOpen(false)}
                            onSubmit={handleDeclineSubmit}
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
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.div`
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    background: ${({ $active }) => ($active ? "#007BFF" : "#E0E0E0")};
    color: ${({ $active }) => ($active ? "#FFF" : "#000")};
    border-radius: 5px;
    user-select: none;

    &:hover {
        background: ${({ $active }) => ($active ? "#0056b3" : "#c7c7c7")};
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
`;

const TableHead = styled.thead`
    background-color: #f1f1f1;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableHeader = styled.th`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
`;

const TableData = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
`;

const ResumeLink = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Button = styled.button`
    margin: 5px;
    padding: 10px 15px;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.color};
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    max-width: 90%;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    resize: none;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
`;
