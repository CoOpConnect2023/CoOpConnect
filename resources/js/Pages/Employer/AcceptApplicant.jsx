import React, { useEffect, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import NavBar from "./Components/NavBar";
import { usePage } from "@inertiajs/react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
    getInterviewsForInterviewer,
    postInterview,
    patchInterview,
    selectInterviewsStatus,
    selectInterviews,
    sendInterviewTimeChanged
} from "@/Features/interviews/interviewsSlice";
import {
    selectApplicant,
    patchUserJob,
    getUserJob,
    selectUserJob,
    getSingleUserDetails,
    selectApplicants,
    getUserDetails
} from "@/Features/userJobs/userJobsSlice";
import { getJobsforEmployer, selectJobs, getJobsforUser, getAllJobsForEmployer, selectAllUserJobs } from "@/Features/jobs/jobsSlice";
import { postNotification, postEmailNotification } from "@/Features/notifications/notificationsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Inertia } from "@inertiajs/inertia";
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
// Styled Components

const AcceptApplicant = () => {
    const [message, setMessage] = useState("");
    const [timeSlots, setTimeSlots] = useState([""]);
    const darkMode = useSelector((state) => state.accessibility.darkMode);
    const fontSize = useSelector((state) => state.accessibility.textSize);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const applicants = useSelector(selectApplicants);
    const jobs = useSelector(selectJobs);
    const allUserJobs = useSelector(selectAllUserJobs)
    const applicant = useSelector(selectApplicant);
    const userJob = useSelector(selectUserJob);
    const data = useSelector(selectInterviews);

    const { props } = usePage();
    const { applicantId } = props;
    console.log(userJob)

    useEffect(() => {
        dispatch(getSingleUserDetails({ userJobsId: applicantId }));
        dispatch(getUserJob({ userJobId: applicantId }));

    }, [dispatch, applicantId]);

    useEffect(() => {
        if (userJob && userJob.jobsId) {
            dispatch(getUserDetails({ jobsId: userJob.jobsId }));
            dispatch(getJobsforEmployer({ userId: user?.id }));
        }
    }, [dispatch, userJob]);

    useEffect(() => {
        if (jobs && jobs.length > 0) {
            const jobIds = jobs.map((job) => job.id);

            // Log jobIds to the console
            console.log("Extracted Job IDs:", jobIds);

            // Dispatch action with jobIds
            dispatch(getAllJobsForEmployer({ jobIds }));
            dispatch(
                getInterviewsForInterviewer({
                    interviewerId: user.id,
                })
            );
        }
    }, [dispatch, jobs]);




    console.log(jobs, allUserJobs, data)

    const availableTimeSlots = allUserJobs
    .filter((item) => Array.isArray(item.time_slots) && item.time_slots.length > 0 && item.status !== "Rejected")
    .flatMap((item) => item.time_slots); // Flatten directly here

// Create events for the calendar based on the time slots
const events = [
    // Process time slots from allUserJobs
    ...allUserJobs
        .filter((item) => Array.isArray(item.time_slots) && item.time_slots.length > 0 && item.status !== "Rejected")
        .flatMap((item) =>
            item.time_slots.map((slot) => {
                const start = new Date(slot);
                if (isNaN(start)) {
                    console.warn(`Invalid date encountered: ${slot}`);
                    return null; // Skip invalid dates
                }
                const end = new Date(start.getTime() + 60 * 60 * 1000); // 1-hour duration

                // Set the title based on the job status and format the date
                const statusText = item.status === "Pending" ? "Pending Confirmation" : "Interview Booked";
                const formattedDate = moment(start).format("hh:mm A, MMM Do YYYY");

                return {
                    id: `${item.id}-${slot}`, // Unique ID based on job ID and time slot
                    title: `${statusText} - ${formattedDate}`,
                    start,
                    end,
                };
            })
        )
        .filter(event => event !== null), // Remove any null events caused by invalid dates

    // Process startDate from data.interviews
    ...data.interviews
        .map((interview) => {
            const start = new Date(interview.startDate);
            if (isNaN(start)) {
                console.warn(`Invalid interview startDate encountered: ${interview.startDate}`);
                return null; // Skip invalid dates
            }
            const end = new Date(start.getTime() + 60 * 60 * 1000); // 1-hour duration

            // Create a formatted title for the interview start date
            const formattedDate = moment(start).format("hh:mm A, MMM Do YYYY");
            return {
                id: `interview-${interview.startDate}`, // Unique ID based on the interview date
                title: `Interview Scheduled - ${formattedDate}`,
                start,
                end,
            };
        })
        .filter(event => event !== null) // Remove any null events caused by invalid dates
];

console.log("Extracted Events:", events);

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
            alert(
                "An error occurred while processing the application. Please try again."
            );
        }
    };

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const calculatedFontSize = calculateFontSize(14, fontSize);
        let backgroundColor = '#6B538C';
        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            fontSize: calculatedFontSize
        };
        return {
            style: style
        };
    };



    return (
        <NavBar header={"Accept Applicant"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <p>Name: {applicant.name}</p>
                <p>Email: {applicant.email}</p>

                <h2>Send Interview Details</h2>
                <Form darkMode={darkMode} fontSize={fontSize} onSubmit={handleSubmit}>
                    <FormGroup darkMode={darkMode} fontSize={fontSize}>
                        <Label darkMode={darkMode} fontSize={fontSize}>
                            Message
                        </Label>
                        <TextArea
                            darkMode={darkMode}
                            fontSize={fontSize}
                            rows="1"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message here"
                        />
                    </FormGroup>
                    {timeSlots.map((slot, index) => (
                        <FormGroup
                            darkMode={darkMode}
                            fontSize={fontSize}
                            key={index}
                        >
                            <Label darkMode={darkMode} fontSize={fontSize}>
                                Time Slot {index + 1}
                            </Label>
                            <StyledDatetime
                                darkMode={darkMode}
                                fontSize={fontSize}
                                value={slot}
                                onChange={(value) =>
                                    handleTimeSlotChange(index, value)
                                }
                                inputProps={{
                                    placeholder: "Select a time slot",
                                }}
                            />
                            <RemoveButton
                                darkMode={darkMode}
                                fontSize={fontSize}
                                type="button"
                                onClick={() => removeTimeSlot(index)}
                            >
                                Remove
                            </RemoveButton>
                        </FormGroup>
                    ))}
                     <ButtonContainer>
                    <Button
                        darkMode={darkMode}
                        fontSize={fontSize}
                        type="button"
                        color="blue"
                        onClick={addTimeSlot}
                    >
                        Add Time Slot
                    </Button>
                    <Button
                        darkMode={darkMode}
                        fontSize={fontSize}
                        type="submit"
                        color="green"
                    >
                        Send Details
                    </Button>
                    </ButtonContainer>
                    {/* Calendar Section */}
                    <Wrapper darkMode={darkMode} fontSize={fontSize}>
                        <CalendarDiv darkMode={darkMode} fontSize={fontSize}>
                            <DndProvider backend={HTML5Backend}>
                                <DnDCalendar
                                    defaultDate={new Date(getTodayDate())}
                                    defaultView="month"
                                    events={events}
                                    localizer={localizer}

                                    resizable

                                    style={{ height: "100%" }}
                                    selectable

                                    startAccessor="start"
                                    endAccessor="end"
                                    eventPropGetter={eventStyleGetter}
                                />
                            </DndProvider>
                        </CalendarDiv>
                    </Wrapper>

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
    width: 100%;

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
    width: 100%; /* Change width to reduce size */
    padding: 8px; /* Reduce padding */
    border-radius: 6px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#e2e8f0")};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#ffffff")};
    color: ${({ darkMode }) => (darkMode ? "#f1f1f1" : "#333")};
    resize: none;
    font-size: ${({ fontSize }) => calculateFontSize(15, fontSize)};
    transition: border-color 0.3s ease, background-color 0.3s ease;
    height: auto;

    &:hover {
        border-color: ${({ darkMode }) => (darkMode ? "#9f7aea" : "#6b538c")};
        background-color: ${({ darkMode }) => (darkMode ? "#3a3a3a" : "#f3e8ff")};
    }

    @media (max-width: 768px) {
        width: 80%; /* Adjust width for smaller screens */
    }
`;


export const StyledDatetime = styled(Datetime)`
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#666" : "#e2e8f0")};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#ffffff")};
    color: ${({ darkMode }) => (darkMode ? "#333" : "#333")};
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

export const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`
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

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex:1;
    padding: 10px;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    min-height: 500px;
      @media (max-width: 991px) {
        padding: 0px;
        height:100%; /* Adjust height for smaller screens */
        flex-direction: column;
        min-height: 400px;
        width: 100%;
    }

     @media (min-width: 992px) {
        min-height: 80vh; /* Ensure it stretches to 80% of the viewport height */
        align-items: stretch; /* Ensure content inside stretches vertically */
        justify-content: flex-start; /* Align content to the top */
    }
`;
export const CalendarDiv = styled.div`
    width: 100%;
    align-items: center;
    flex: 1; /* Make sure it grows to fill available space */


    overflow: auto; /* Enable vertical scrolling if needed */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: ${({ darkMode }) => (darkMode ? "#444444" : "rgba(123, 117, 127, 1)")};
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};

    @media (max-width: 991px) {
    padding: 0px;
        min-height: 400px;
        max-height: 80vh; /* Limit maximum height for mobile */
        height: 60vh;
        width: 100%;
        flex: none;
    }
`;


export const GlobalStyles = createGlobalStyle`
  /* Style for the calendar toolbar buttons */
  .rbc-btn-group button {
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Adjust the font size */
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#6B538C")}; /* Change the text color */
    transition: color 0.3s, background-color 0.3s;
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#FFF")}; /* Button background color */
    border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ddd")}; /* Border color */
    padding: 8px 16px;
    border-radius: 4px;
  }

  /* Hover state for buttons */
  .rbc-btn-group button:hover {
    color: ${({ darkMode }) => (darkMode ? "#FFFFFF" : "#543b6f")}; /* Change text color on hover */
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#f3e8ff")}; /* Background color on hover */
  }

  /* Active button state */
  .rbc-btn-group .rbc-active {
    background-color: ${({ darkMode }) => (darkMode ? "#6B538C" : "#6B538C")}; /* Active background color */
    color: #FFFFFF; /* Active text color */
  }

  /* Style for the calendar toolbar label (e.g., the current month) */
  .rbc-toolbar-label {
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")}; /* Toolbar label text color */
    transition: color 0.3s;
    font-weight: bold;
  }

  /* Style for calendar event titles */
  .rbc-event {
    background-color: ${({ darkMode }) => (darkMode ? "#6B538C" : "#FFF")}; /* Event background */
    border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ddd")}; /* Border color */
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#333")}; /* Text color */
    padding: 2px 4px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  /* Hover state for events */
  .rbc-event:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#543b6f" : "#f3e8ff")}; /* Event hover background */
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#543b6f")}; /* Event hover text color */
  }

  /* Style for the calendar day headings (e.g., Monday, Tuesday, etc.) */
  .rbc-header {
    font-size: ${({ fontSize }) => calculateFontSize(16, fontSize)};
    background-color: ${({ darkMode }) => (darkMode ? "#444" : "#FFF")}; /* Background color for day headings */
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")}; /* Text color */
    padding: 8px;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ddd")}; /* Bottom border */
  }

  /* Style for the calendar grid cells */
  .rbc-day-bg {
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#FFF")}; /* Background for day cells */
    border: 1px solid ${({ darkMode }) => (darkMode ? "#444" : "#ddd")}; /* Border for day cells */
  }

  /* Style for current day */
  .rbc-today {
    background-color: ${({ darkMode }) => (darkMode ? "#6B538C" : "#e6f7ff")}; /* Current day background */
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#6B538C")}; /* Current day text */
    font-weight: bold;
  }

  /* Adjust the calendar's overall layout */
  .rbc-calendar {
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#FFF")}; /* Background for the entire calendar */
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#333")}; /* Text color */
    transition: background-color 0.3s, color 0.3s;
  }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0; /* Adjust background color as needed */
    color: #333; /* Adjust text color as needed */
`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db; /* Adjust loading spinner color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite; /* Apply the spin animation */
`;
