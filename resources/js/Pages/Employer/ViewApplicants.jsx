import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";

// Mock data for applicants
const mockApplicants = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        resume: "Resume Link 1",
        status: "Pending",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        resume: "Resume Link 2",
        status: "Reviewed",
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice@example.com",
        resume: "Resume Link 3",
        status: "Interviewed",
    },
];

// Styled Components
const Container = styled.div`
    padding: 20px;
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

const Link = styled.a`
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
                <h2>Decline {applicant.name}</h2>
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
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    useEffect(() => {
        // Simulate fetching data
        setApplicants(mockApplicants);
    }, []);

    const handleDecline = (applicant) => {
        setSelectedApplicant(applicant);
        setIsDeclineModalOpen(true);
    };

    const handleDeclineSubmit = (message) => {
        // Handle decline logic here (e.g., send message to API)
        console.log(
            `Declined ${selectedApplicant.name} with message: ${message}`
        );
    };

    const handleAccept = (applicant) => {
        // Redirect to accept page logic here
        window.location.href = `/employer/accept-applicant/${applicant.id}`;
    };

    return (
        <NavBar header={"View Applicants"}>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Resume</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {applicants.length > 0 ? (
                            applicants.map((applicant) => (
                                <TableRow key={applicant.id}>
                                    <TableData>{applicant.name}</TableData>
                                    <TableData>{applicant.email}</TableData>
                                    <TableData>
                                        <Link
                                            href={applicant.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Resume
                                        </Link>
                                    </TableData>
                                    <TableData>{applicant.status}</TableData>
                                    <TableData>
                                        <Button
                                            color="green"
                                            onClick={() =>
                                                handleAccept(applicant)
                                            }
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            color="red"
                                            onClick={() =>
                                                handleDecline(applicant)
                                            }
                                        >
                                            Decline
                                        </Button>
                                    </TableData>
                                </TableRow>
                            ))
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
        </NavBar>
    );
};

export default ViewApplicants;
