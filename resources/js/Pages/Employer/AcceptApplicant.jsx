import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { usePage } from "@inertiajs/react";

// Styled Components
const Container = styled.div`
    padding: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
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

const AcceptApplicant = () => {
    const [message, setMessage] = useState("");
    const [timeSlots, setTimeSlots] = useState([""]);

    const handleTimeSlotChange = (index, value) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index] = value;
        setTimeSlots(newTimeSlots);
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, ""]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to the server)
        console.log({
            message,
            timeSlots,
        });
    };

    const { props } = usePage();
    const { applicantId } = props;

    return (
        <NavBar header={"Accept Applicant"}>
            <Container>
                <p>Applicant ID: {applicantId}</p>
                <h2>Send Interview Details</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Message</Label>
                        <TextArea
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message here"
                        />
                    </FormGroup>
                    {timeSlots.map((slot, index) => (
                        <FormGroup key={index}>
                            <Label>Time Slot {index + 1}</Label>
                            <Input
                                type="text"
                                value={slot}
                                onChange={(e) =>
                                    handleTimeSlotChange(index, e.target.value)
                                }
                                placeholder="Enter a time slot"
                            />
                        </FormGroup>
                    ))}
                    <Button type="button" color="blue" onClick={addTimeSlot}>
                        Add Time Slot
                    </Button>
                    <Button type="submit" color="green">
                        Send Details
                    </Button>
                </Form>
            </Container>
        </NavBar>
    );
};

export default AcceptApplicant;
