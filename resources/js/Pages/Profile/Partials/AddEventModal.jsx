import React, { useState } from "react";
import styled from "styled-components";

// Define dark mode background and light mode background colors
const lightBackgroundColor = "#FFFFFF";
const darkBackgroundColor = "#333333";

// Font size calculation function
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ darkMode }) =>
    darkMode ? darkBackgroundColor : lightBackgroundColor};
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#333")};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 400px;
    max-height: 90%;
  }
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
  font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#333")};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  color: ${({ darkMode }) => (darkMode ? "#CCC" : "#555")};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#555" : "#FFF")};
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};

  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  background-color: ${({ darkMode }) => (darkMode ? "#555" : "#FFF")};
  color: ${({ darkMode }) => (darkMode ? "#FFF" : "#000")};
  resize: vertical;

  @media (min-width: 768px) {
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
  cursor: pointer;
  background-color: #8A76BD;
  color: white;
  &:hover {
    background-color: #624E7C;
  }
  &:first-child {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const Modal = ({ onClose, onSubmit, defaultDate, applicants, darkMode, fontSize }) => {
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
      <ModalWrapper darkMode={darkMode}>
        <ModalHeader fontSize={fontSize} darkMode={darkMode}>Create Event</ModalHeader>
        <Label fontSize={fontSize} darkMode={darkMode}>Title:</Label>
        <Input type="text" value={title} onChange={handleTitleChange} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>Description:</Label>
        <Textarea value={description} onChange={handleDescriptionChange} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>Start Date:</Label>
        <Input type="date" value={startDate} onChange={handleStartDateChange} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>Start Time:</Label>
        <Input type="time" value={startTime} onChange={handleStartTimeChange} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>End Date:</Label>
        <Input type="date" value={endDate} onChange={handleEndDateChange} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>End Time:</Label>
        <Input type="time" value={endTime} onChange={handleEndTimeChange} fontSize={fontSize} darkMode={darkMode} />

        {applicants && (
          <>
            <Label fontSize={fontSize} darkMode={darkMode}>Student ID:</Label>
            <Input type="text" value={selectedApplicant} onChange={handleApplicantChange} fontSize={fontSize} darkMode={darkMode} />
          </>
        )}
        <ButtonContainer>
          <Button onClick={handleSubmit} fontSize={fontSize}>Save</Button>
          <Button onClick={onClose} fontSize={fontSize}>Cancel</Button>
        </ButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default Modal;
