import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { usePage } from "@inertiajs/react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
    selectApplicant,
    patchUserJob,
    getUserJob,
    selectUserJob,
    getSingleUserDetails,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Inertia } from "@inertiajs/inertia";

// Styled Components

const AcceptApplicant = () => {
    const [message, setMessage] = useState("");
    const [timeSlots, setTimeSlots] = useState([""]);

    const dispatch = useDispatch();

    const applicant = useSelector(selectApplicant);
    const userJob = useSelector(selectUserJob);

    const { props } = usePage();
    const { applicantId } = props;

    const handleTimeSlotChange = (index, value) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index] = value;
        setTimeSlots(newTimeSlots);
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, ""]);
    };

    const removeTimeSlot = (index) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots.splice(index, 1);
        setTimeSlots(newTimeSlots);
    };

    useEffect(() => {
        dispatch(getSingleUserDetails({ userJobsId: applicantId }));
        dispatch(getUserJob({ userJobId: applicantId }));
    }, [dispatch, applicantId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const timeSlotsAsDates = timeSlots.map((slot) => slot.toDate());

        dispatch(
            patchUserJob({
                userJobsId: applicantId,
                status: "Interview",
                message: message,
                timeSlots: timeSlotsAsDates,
            })
        ).then(() => {
            console.log(userJob.jobsId);
            window.location.href = `/employer/viewapplicants/${userJob.jobsId}`;
        });
    };

    return (
        <NavBar header={"Accept Applicant"}>
            <Container>
                <p>Name: {applicant.name}</p>
                <p>Email: {applicant.email}</p>
                <ResumeLink
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Resume
                </ResumeLink>
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
                            <Datetime
                                value={slot}
                                onChange={(value) =>
                                    handleTimeSlotChange(index, value)
                                }
                                inputProps={{
                                    placeholder: "Select a time slot",
                                }}
                            />
                            <RemoveButton
                                type="button"
                                onClick={() => removeTimeSlot(index)}
                            >
                                Remove
                            </RemoveButton>
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
    display: flex;
    align-items: center;
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

const Input = styled(Datetime)`
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

const RemoveButton = styled.button`
    margin-left: 10px;
    padding: 10px;
    font-size: 0.8em;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: red;
`;

const ResumeLink = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
