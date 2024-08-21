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
import { postNotification, postEmailNotification } from "@/Features/notifications/notificationsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Inertia } from "@inertiajs/inertia";

// Styled Components

const AcceptApplicant = () => {
    const [message, setMessage] = useState("");
    const [timeSlots, setTimeSlots] = useState([""]);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const user = useSelector(selectUser);
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        const timeSlotsAsDates = timeSlots.map((slot) => slot.toDate());

        try {
            await dispatch(
                patchUserJob({
                    userJobsId: applicantId,
                    status: "Interview",
                    message: message,
                    timeSlots: timeSlotsAsDates,
                })
            ).unwrap();

            await dispatch(
                postEmailNotification({
                    user_id: userJob.userId,
                    job_title: userJob.jobTitle,
                    time_slots: timeSlotsAsDates,
                    message: message,
                })
            ).unwrap();

            await dispatch(
                postNotification({
                    from_user_id: user.id,
                    to_user_id: userJob.userId,
                    viewed: false,
                    content: `Your job application for ${userJob.jobTitle} has been accepted. Interview times have been sent for your approval.`,
                    type: "Application Accepted",
                    interview_date: null,
                })
            ).unwrap();

            window.location.href = `/employer/viewapplicants/${userJob.jobsId}`;
        } catch (error) {
            console.error("Error in processing submission:", error);
            alert("An error occurred while processing the application. Please try again.");
        }
    };

    return (
        <NavBar header={"Accept Applicant"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <p>Name: {applicant.name}</p>
                <p>Email: {applicant.email}</p>
                <ResumeLink darkMode={darkMode} fontSize={fontSize}
                    href={applicant.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Resume
                </ResumeLink>
                <h2>Send Interview Details</h2>
                <Form darkMode={darkMode} fontSize={fontSize} onSubmit={handleSubmit}>
                    <FormGroup darkMode={darkMode} fontSize={fontSize}>
                        <Label darkMode={darkMode} fontSize={fontSize}>Message</Label>
                        <TextArea darkMode={darkMode} fontSize={fontSize}
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message here"
                        />
                    </FormGroup>
                    {timeSlots.map((slot, index) => (
                        <FormGroup darkMode={darkMode} fontSize={fontSize} key={index}>
                            <Label darkMode={darkMode} fontSize={fontSize}>Time Slot {index + 1}</Label>
                            <StyledDatetime darkMode={darkMode} fontSize={fontSize}
                                value={slot}
                                onChange={(value) =>
                                    handleTimeSlotChange(index, value)
                                }
                                inputProps={{
                                    placeholder: "Select a time slot",
                                }}
                            />
                            <RemoveButton darkMode={darkMode} fontSize={fontSize}
                                type="button"
                                onClick={() => removeTimeSlot(index)}
                            >
                                Remove
                            </RemoveButton>
                        </FormGroup>
                    ))}
                    <Button darkMode={darkMode} fontSize={fontSize} type="button" color="blue" onClick={addTimeSlot}>
                        Add Time Slot
                    </Button>
                    <Button darkMode={darkMode} fontSize={fontSize} type="submit" color="green">
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


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue);
    if (emValue === '1em') return `${basePixelSize * em}px`;
    if (emValue === '1.07em') return `${basePixelSize * em * 1.3}px`;
    if (emValue === '1.12em') return `${basePixelSize * em * 1.7}px`;
    return `${basePixelSize * em * factor}px`;
};



export const Container = styled.div`
    padding: 30px;
    width: 70%;

    flex:1;
    margin: 20px auto;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#ffffff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    animation: ${fadeIn} 0.8s ease-in-out;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};

    @media (max-width: 991px) {
        padding: 20px;
        min-height: 100vh;
       width: 100%;
    }
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const DetailItem = styled.p`
    margin: 0;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 0.5vh;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    @media (max-width: 768px) {

            max-width: 100%;
        }
`;

export const Label = styled.label`
    font-weight: 600;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#334155")};
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#e2e8f0")};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#ffffff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    resize: none;
    font-size: ${({ fontSize }) => calculateFontSize(15, fontSize)};
    transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: ${({ darkMode }) => (darkMode ? "#9f7aea" : "#6b538c")};
        background-color: ${({ darkMode }) => (darkMode ? "#3a3a3a" : "#f3e8ff")};
    }
`;

export const StyledDatetime = styled(Datetime)`
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#e2e8f0")};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#ffffff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    font-size: ${({ fontSize }) => calculateFontSize(15, fontSize)};

    .rdtPicker {
        background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
        color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
        width: 100%;
        max-width: 320px;
        margin: 0 auto;

        @media (max-width: 768px) {
            width: 100%;
            max-width: 100%;
        }
    }

    .rdtPicker td.rdtToday,
    .rdtPicker td.rdtActive {
        background-color: ${({ darkMode }) => (darkMode ? "#9f7aea" : "#007bff")};
        color: #fff;
    }

    .rdtPicker .rdtTimeToggle,
    .rdtPicker .rdtCounters {
        background-color: ${({ darkMode }) => (darkMode ? "#444" : "#fff")};
        color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    }

    .rdtPicker .rdtTime .rdtCount,
    .rdtPicker .rdtTime .rdtBtn {
        background-color: ${({ darkMode }) => (darkMode ? "#555" : "#f9f9f9")};
        color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    }

    @media (max-width: 768px) {
        padding: 10px;
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
        width: 80%;
    }
`;


export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
`;

export const Button = styled.button`
    padding: 12px 24px;
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
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

    @media (max-width: 768px) {
        padding: 10px;
        font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};

    }
`;

export const RemoveButton = styled(Button)`
    background-color: #e53e3e;

    &:hover {
        background-color: #c53030;
    }
`;

export const ResumeLink = styled.a`
    color: ${({ darkMode }) => (darkMode ? "#7ca1f2" : "#007bff")};
    text-decoration: none;
    font-weight: 600;
    margin-bottom: 0.5vh;

    &:hover {
        text-decoration: underline;
    }
`;

