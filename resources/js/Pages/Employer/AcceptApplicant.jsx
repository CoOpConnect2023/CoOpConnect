import React, { useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

// Styled Components
const Container = styled.div`
    padding: 30px;
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    animation: ${fadeIn} 0.8s ease-in-out;

    @media (max-width: 991px) {
        padding: 20px;
        max-width: 100%;
    }
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DetailItem = styled.p`
    margin: 0;
    font-size: 16px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const Label = styled.label`
    font-weight: 600;
    font-size: 16px;
    color: #334155;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    resize: none;
    font-size: 15px;
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #6b538c;
        background-color: #f3e8ff;
    }
`;

const StyledDatetime = styled(Datetime)`
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    font-size: 15px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    color: white;
    background-color: ${(props) => props.color};
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
        background-color: ${(props) => props.color};
        transform: scale(1.05);
    }
`;

const RemoveButton = styled(Button)`
    background-color: #e53e3e;

    &:hover {
        background-color: #c53030;
    }
`;

const ResumeLink = styled.a`
    color: #007bff;
    text-decoration: none;
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`;
