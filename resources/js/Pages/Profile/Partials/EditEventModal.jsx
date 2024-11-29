import React, { useState, useEffect } from "react";
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

const EditModal = ({ onClose, onSubmit, event, darkMode, fontSize }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startDate, setStartDate] = useState(event ? event.startDate.substring(0, 10) : "");
  const [startTime, setStartTime] = useState(event ? event.startDate.substring(11, 16) : "");
  const [initialStartDate, setEndDate] = useState(event ? event.startDate.substring(0, 10) : "");
  const [initialStartTime, setEndTime] = useState(event ? event.startDate.substring(11, 16) : "");


  const handleTimeChange = (e) => {
    const timeValue = e.target.value; // e.g., "14:03"
    const [hours, minutes] = timeValue.split(":").map(Number);

    // Ensure minutes are in 5-minute increments
    if (minutes % 5 !== 0) {
        const adjustedMinutes = Math.round(minutes / 5) * 5; // Round to nearest 5
        const adjustedTime = `${String(hours).padStart(2, "0")}:${String(adjustedMinutes).padStart(2, "0")}`;
        setStartTime(adjustedTime);
    } else {
        setStartTime(timeValue);
    }
};
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartDate(event.startDate.substring(0, 10));
      setStartTime(event.startDate.substring(11, 16));
      setEndDate(event.endDate.substring(0, 10));
      setEndTime(event.endDate.substring(11, 16));
    }
  }, [event]);

  const handleSubmit = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const initialStart = new Date(`${initialStartDate}T${initialStartTime}`);

   
    onSubmit({
      id: event.id, // Include the event ID so it can be updated in the backend
      start,
      interviewee: event.intervieweeId,
      interviewer: event.interviewerId,
      initialStart,
      title: event.title,


    });
    onClose();
  };

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalWrapper darkMode={darkMode}>
        <ModalHeader fontSize={fontSize} darkMode={darkMode}>Request Updated Interview Time</ModalHeader>

        <Label fontSize={fontSize} darkMode={darkMode}>Start Date:</Label>
        <Input  min={new Date().toISOString().split("T")[0]} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fontSize={fontSize} darkMode={darkMode} />
        <Label fontSize={fontSize} darkMode={darkMode}>Start Time:</Label>
        <Input   type="time" value={startTime} onChange={handleTimeChange} fontSize={fontSize} darkMode={darkMode} step="300" />


        <ButtonContainer>
        <Button onClick={onClose} fontSize={fontSize}>Cancel</Button>
          <Button onClick={handleSubmit} fontSize={fontSize}>Send</Button>

        </ButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default EditModal;
