import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 400px;
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalHeader = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    resize: vertical;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    &:hover {
        background-color: #0056b3;
    }
    &:first-child {
        background-color: #6c757d;
        &:hover {
            background-color: #5a6268;
        }
    }
`;

const Select = styled.select`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const Option = styled.option`
    /* Add any specific styles for option if needed */
`;

const Modal = ({ onClose, onSubmit, defaultDate, applicants }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(defaultDate.toISOString().substring(0, 10));
    const [startTime, setStartTime] = useState(defaultDate.toISOString().substring(11, 16));
    const [endDate, setEndDate] = useState(defaultDate.toISOString().substring(0, 10));
    const [endTime, setEndTime] = useState(defaultDate.toISOString().substring(11, 16));
    const [selectedApplicant, setSelectedApplicant] = useState("");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleStartTimeChange = (e) => setStartTime(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);
    const handleEndTimeChange = (e) => setEndTime(e.target.value);
    const handleApplicantChange = (e) => setSelectedApplicant(e.target.value);

    const handleSubmit = () => {
        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);
        
        onSubmit(title, description, start, end, selectedApplicant);
        onClose();
    };

    return (
        <>
            <ModalBackdrop onClick={onClose} />
            <ModalWrapper>
                <ModalHeader>Create Event</ModalHeader>
                <Label>Title:</Label>
                <Input type="text" value={title} onChange={handleTitleChange} />
                <Label>Description:</Label>
                <Textarea value={description} onChange={handleDescriptionChange} />
                <Label>Start Date:</Label>
                <Input type="date" value={startDate} onChange={handleStartDateChange} />
                <Label>Start Time:</Label>
                <Input type="time" value={startTime} onChange={handleStartTimeChange} />
                <Label>End Date:</Label>
                <Input type="date" value={endDate} onChange={handleEndDateChange} />
                <Label>End Time:</Label>
                <Input type="time" value={endTime} onChange={handleEndTimeChange} />

                {applicants && (
                <>
                    <Label>Student:</Label>
                    <Select value={selectedApplicant} onChange={handleApplicantChange}>
                        <Option value="">Select a student</Option>
                        {applicants.map((applicant) => (
                            <option key={applicant.id} value={applicant.id}>
                                {applicant.name} - {applicant.email}
                            </option>
                        ))}
                    </Select>
                </>
            )}
                <ButtonContainer>
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ButtonContainer>
            </ModalWrapper>
        </>
    );
};

export default Modal;
