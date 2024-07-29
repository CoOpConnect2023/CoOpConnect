import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJob,
    getSingleJobDetails,
    patchUserJob,
} from "@/Features/userJobs/userJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const AcceptInterview = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const dispatch = useDispatch();
    const job = useSelector(selectJob);

    const { props } = usePage();
    const { userJobsId } = props;

    useEffect(() => {
        dispatch(
            getSingleJobDetails({
                userJobsId: userJobsId,
            })
        );
    }, [dispatch, userJobsId]);

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
    };

    const handleSubmit = () => {
        // Handle submission logic
        if (selectedSlot) {
            dispatch(
                patchUserJob({
                    userJobsId: userJobsId,
                    timeSlots: [selectedSlot],
                    status: "Scheduled",
                })
            );
        } else {
            alert("Please select a time slot.");
        }
        window.location.href = `/student/viewapplications`;
    };

    const handleDecline = () => {
        if (
            window.confirm("Are you sure you want to decline this application?")
        ) {
            dispatch(
                patchUserJob({
                    userJobsId: userJobsId,
                    status: "Declined",
                })
            );
        }
        window.location.href = `/student/viewapplications`;
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

    return (
        <NavBar header={"Accept Interview"}>
            <Container>
                {job && (
                    <>
                        <JobInfo>
                            <h2>{job.title}</h2>
                            <h3>{job.company}</h3>
                            <p>{job.description}</p>
                        </JobInfo>
                        <EmployerMessage>
                            <p>{job.message}</p>
                        </EmployerMessage>
                        <TimeSlots>
                            <h4>Select a Time Slot</h4>
                            {job.timeSlots.map((slot, index) => (
                                <TimeSlot key={index}>
                                    <input
                                        type="radio"
                                        id={`slot-${index}`}
                                        name="timeSlot"
                                        value={slot}
                                        onChange={() => handleSelectSlot(slot)}
                                    />
                                    <label htmlFor={`slot-${index}`}>
                                        {formatDate(slot)}
                                    </label>
                                </TimeSlot>
                            ))}
                        </TimeSlots>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <DeclineButton onClick={handleDecline}>
                            Decline
                        </DeclineButton>
                    </>
                )}
            </Container>
        </NavBar>
    );
};

export default AcceptInterview;

const Container = styled.div`
    padding: 20px;
`;

const JobInfo = styled.div`
    margin-bottom: 20px;
`;

const EmployerMessage = styled.div`
    margin-bottom: 20px;
`;

const TimeSlots = styled.div`
    margin-bottom: 20px;
`;

const TimeSlot = styled.div`
    margin-bottom: 10px;
`;

const Button = styled.button`
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const DeclineButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;
