import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJob,
    getSingleJobDetails,
    patchUserJob,
} from "@/Features/userJobs/userJobsSlice";
import {
    getInterviewsForInterviewer,
    postInterview,
    selectInterviewsStatus,
    selectInterviews,
} from "@/Features/interviews/interviewsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const AcceptInterview = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const job = useSelector(selectJob);

    const { props } = usePage();
    const { userJobsId } = props;
console.log(job, user)
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

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

    const handleSubmit = async () => {
        // Handle submission logic
        if (selectedSlot) {
            const formatDateTime = (date) => {
                const pad = (n) => (n < 10 ? '0' + n : n);
                const year = date.getFullYear();
                const month = pad(date.getMonth() + 1);
                const day = pad(date.getDate());
                const hours = pad(date.getHours());
                const minutes = pad(date.getMinutes());
                const seconds = pad(date.getSeconds());
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            const formattedStart = formatDateTime(new Date(selectedSlot));
            const endDate = new Date(selectedSlot);
            endDate.setHours(endDate.getHours() + 1);
            const formattedEnd = formatDateTime(endDate);

            try {

                await dispatch(
                    postInterview({
                        title: `Interview with ${user.name} for ${job.title}`,
                        startDate: formattedStart,
                        endDate: formattedEnd,
                        status: "scheduled",
                        description: `Interview with ${user.name}`,
                        intervieweeId: user.id,
                        interviewerId: job.userId
                    })
                ).unwrap();


                await dispatch(
                    patchUserJob({
                        userJobsId: userJobsId,
                        timeSlots: [selectedSlot],
                        status: "Scheduled",
                    })
                ).unwrap();


                window.location.href = `/student/viewapplications`;

            } catch (error) {

                console.error('Error during submission:', error);
                alert('An error occurred while scheduling the interview. Please try again.');
            }
        } else {
            alert("Please select a time slot.");
        }
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
