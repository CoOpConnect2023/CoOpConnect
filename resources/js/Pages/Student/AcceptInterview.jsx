import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    selectJob,
    getSingleJobDetails,
    patchUserJob,
} from "@/Features/userJobs/userJobsSlice";
import { postInterview } from "@/Features/interviews/interviewsSlice";
import { postNotification, postEmailAcceptNotification } from "@/Features/notifications/notificationsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";

// Helper function to calculate font size based on em value
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);

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

const AcceptInterview = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const user = useSelector(selectUser);
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const darkMode = useSelector((state) => state.accessibility.darkMode);

    const dispatch = useDispatch();
    const job = useSelector(selectJob);


    const { props } = usePage();
    const { userJobsId } = props;

    // Fetch user and job details on component mount
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSingleJobDetails({ userJobsId }));
    }, [dispatch, userJobsId]);

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
    };

    const handleSubmit = async () => {
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
                        interviewerId: job.userId,
                    })
                ).unwrap();


                await dispatch(
                    patchUserJob({
                        userJobsId,
                        timeSlots: [selectedSlot],
                        status: "Scheduled",
                    })
                ).unwrap();


                await dispatch(
                    postNotification({
                        from_user_id: user.id,
                        to_user_id: job.userId,
                        viewed: false,
                        content: `You have a new interview scheduled with ${user.name} for ${job.title}.`,
                        type: "Interview Scheduled",
                        interview_date: formattedStart,
                    })
                ).unwrap();


                await dispatch(
                    postEmailAcceptNotification({
                        user_id: job.userId,
                        student_id: user.id,
                        email: job.userEmail,
                        job_title: job.title,
                        time_slots: [selectedSlot],
                        message: `The student ${user.name} has accepted your interview request. Please connect with the student on the platform. A calendar event has been added to both calendars.`,
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
        if (window.confirm("Are you sure you want to decline this application?")) {
            dispatch(patchUserJob({ userJobsId, status: "Declined" }));
            window.location.href = `/student/viewapplications`;
        }
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
        <NavBar header={"Interviews"} fontSize={fontSize} darkMode={darkMode}>
            <Container fontSize={fontSize} darkMode={darkMode}>
                {job && (
                    <>
                        <JobInfo fontSize={fontSize} darkMode={darkMode}>
    <h2>Job Title: {job.title}</h2>
    <h3>Job Company: {job.company.name}</h3>
    <p>
        Job Description:
        <span dangerouslySetInnerHTML={{ __html: job.description }} />
    </p>
</JobInfo>
                        <EmployerMessage fontSize={fontSize} darkMode={darkMode}>
                            <p>Message from the employer: {job.message}</p>
                        </EmployerMessage>
                        <TimeSlots fontSize={fontSize} darkMode={darkMode}>
                            <h4>Select a Time Slot to be interviewed at:</h4>
                            {job.timeSlots.map((slot, index) => (
                                <TimeSlot key={index} fontSize={fontSize} darkMode={darkMode}>
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
                        <Button onClick={handleSubmit} fontSize={fontSize} darkMode={darkMode}>
                            Submit
                        </Button>
                        <DeclineButton onClick={handleDecline} fontSize={fontSize} darkMode={darkMode}>
                            Decline
                        </DeclineButton>
                    </>
                )}
            </Container>
        </NavBar>
    );
};

export default AcceptInterview;

// Styled Components
const Container = styled.div`
    padding: 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#121212' : '#fff')};
    color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    flex: 1;

     @media (max-width: 991px) {
        padding: 20px;
        min-height: 80vh;
       width: 100%;
    }
`;

const JobInfo = styled.div`
    margin-bottom: 20px;

    h2, h3, p {
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
        margin: 0; /* Ensure no additional margin for consistency */
    }

    h2 {
        font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    }

    h3 {
        font-size: ${({ fontSize }) => calculateFontSize(20, fontSize)};
        margin-top: 10px; /* Slight space after title */
    }

    p {
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
        line-height: 1.5; /* Improve readability */
        margin-top: 10px;
    }
`;

const EmployerMessage = styled.div`
    margin-bottom: 20px;

    p {
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
        margin: 0;
        line-height: 1.5;
    }
`;

const TimeSlots = styled.div`
    margin-bottom: 20px;

    h4 {
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
        font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
        margin-bottom: 10px;
    }
`;

const TimeSlot = styled.div`
    margin-bottom: 10px;

    input {
        margin-right: 10px;
        cursor: pointer;
    }

    label {
        font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
        color: ${({ darkMode }) => (darkMode ? '#f1f1f1' : '#2C2C2C')};
        cursor: pointer;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${({ darkMode }) => (darkMode ? '#6c4bcf' : '#6c4bcf')};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    margin-right: 10px;

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#543a93' : '#0056b3')};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(100, 149, 237, 0.5); /* Visual focus indication */
    }
`;

const DeclineButton = styled(Button)`
    background-color: ${({ darkMode }) => (darkMode ? '#dc3545' : '#dc3545')};

    &:hover {
        background-color: ${({ darkMode }) => (darkMode ? '#b22d3b' : '#c82333')};
    }
`;

