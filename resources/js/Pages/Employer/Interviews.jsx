import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const appUrl = import.meta.env.VITE_APP_URL;
import styled, { keyframes } from "styled-components";
import NavBar from "./Components/NavBar";
import Modal from "../Profile/Partials/AddEventModal";
import ConfirmModal from "../Profile/Partials/ConfirmStudentEventModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
    getInterviewsForInterviewer,
    postInterview,
    patchInterview,
    selectInterviewsStatus,
    selectInterviews,
    sendInterviewTimeChanged
} from "@/Features/interviews/interviewsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import axios from "axios";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
import {
    MainContainer,
    Container,
    Wrapper,
    Header,
    CalendarDiv,
    ShortlistsContainer,
    ShortlistsHeader,
    Shortlist,
    DeleteButton,
    ApplicantList,
    ApplicantItem,
    NoShortlistsMessage,
    NoEventsMessage,
    EventsContainer,
    EventsHeader,
    Event,
    GlobalStyles,
    PurpleButton


} from "./Styling/Interviews.styles";

const Interviews = () => {
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] =useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const user = useSelector(selectUser);
    const [shortlists, setShortlists] = useState([]);
    const dispatch = useDispatch();
    const data = useSelector(selectInterviews);
    const interviews = data.interviews;
    const interviewsStatus = useSelector(selectInterviewsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);


    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    const userId = user?.id;

    useEffect(() => {
        dispatch(
            getInterviewsForInterviewer({
                interviewerId: userId,
            })
        );
    }, [userId]);

    const handlePurpleButtonClick = (event) => {
        setShowConfirmModal(true);
        setSelectedEvent(event);

        // Differentiate the action for the confirmation modal
        setConfirmAction("sendInterviewTimeChanged");
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleConfirm = () => {


        dispatch(sendInterviewTimeChanged({
            studentId: selectedEvent.intervieweeId,
            jobTitle: selectedEvent.title,
            newTime: moment(selectedEvent.start).format("YYYY-MM-DD HH:mm:ss"),
        }))
        .then(response => {
            console.log('Confirmed action and email sent:', response);
            console.log(selectedEvent.intervieweeId, selectedEvent.title, selectedEvent.start)
        })
        .catch(error => {
            console.error("Failed to send email:", error);
        })
        .finally(() => {
            setShowConfirmModal(false);
        });
    };



    const transformedInterviews = (interviews) => {

        if (!Array.isArray(interviews)) {
            console.error('transformedInterviews expected an array, but got:', interviews);
            return [];
        }

        const result = interviews.map((interview) => ({
            ...interview,
            start: new Date(interview.startDate),
            end: new Date(interview.endDate),
        }));
        return result;
    };

    useEffect(() => {
        setEvents(transformedInterviews(interviews));
    }, [interviews]);

    useEffect(() => {
        if (interviewsStatus.postInterview === "succeeded") {
            setEvents((prevEvents) => [
                ...prevEvents,
                ...transformedInterviews(data.postInterview),
            ]);
        }
    }, [interviewsStatus.postInterview, data.postInterview]);



    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const formatDateTime = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, "0");
        const day = String(dateTime.getDate()).padStart(2, "0");
        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");
        const seconds = String(dateTime.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleEventResize = ({ event, start, end }) => {
        // Set the selected event and new proposed time for confirmation
        setSelectedEvent({ ...event, start, end });
        setConfirmAction("updateTime");
        setShowConfirmModal(true);
    };

    const handleEventDrop = ({ event, start, end }) => {
        // Set the selected event and new proposed time for confirmation
        setSelectedEvent({ ...event, start, end });
        setConfirmAction("updateTime");
        setShowConfirmModal(true);
    };

    const handleUpdateWithoutNotification = async () => {
        if (!selectedEvent) return;

        try {
            const payload = {
                title: selectedEvent.title,
                start_date: formatDateTime(selectedEvent.start),
                end_date: formatDateTime(selectedEvent.end),
                status: selectedEvent.status,
                description: selectedEvent.description,
                interviewee_id: selectedEvent.intervieweeId,
                interviewer_id: selectedEvent.interviewerId,
                proposed_time: formatDateTime(selectedEvent.start),
            };

            // Update the interview time in the backend without notification
            await axios.put(`${appUrl}/api/v1/interviews/${selectedEvent.id}`, payload);

            // Update local events state with the new times
            const updatedEvents = events.map((existingEvent) =>
                existingEvent.id === selectedEvent.id ? { ...existingEvent, start: selectedEvent.start, end: selectedEvent.end } : existingEvent
            );
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error updating event without notification:", error);
        } finally {
            setShowConfirmModal(false);
        }
    };

    const handleUpdateTimeConfirm = async () => {
        if (!selectedEvent) return;

        try {
            const payload = {
                title: selectedEvent.title,
                start_date: formatDateTime(selectedEvent.start),
                end_date: formatDateTime(selectedEvent.end),
                status: selectedEvent.status,
                description: selectedEvent.description,
                interviewee_id: selectedEvent.intervieweeId,
                interviewer_id: selectedEvent.interviewerId,
                proposed_time: formatDateTime(selectedEvent.start),
            };

            // Update the interview time in the backend
            await axios.put(`${appUrl}/api/v1/interviews/${selectedEvent.id}`, payload);

            // Dispatch to send notification about the updated interview time
            dispatch(
                sendInterviewTimeChanged({
                    studentId: selectedEvent.intervieweeId,
                    jobTitle: selectedEvent.title,
                    newTime: formatDateTime(selectedEvent.start),
                    endTime: formatDateTime(selectedEvent.end), // Optional end time
                })
            ).then(response => {
                console.log('Interview time updated and email sent:', response);
            }).catch(error => {
                console.error("Failed to send email:", error);
            });

            // Update local events state with the new times
            const updatedEvents = events.map((existingEvent) =>
                existingEvent.id === selectedEvent.id ? { ...existingEvent, start: selectedEvent.start, end: selectedEvent.end } : existingEvent
            );
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error updating event:", error);
        } finally {
            setShowConfirmModal(false);
        }
    };


    const openModal = (day) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setShowModal(false);
    };

    const handleAddEvent = (title, description, start, end, selectedApplicant) => {

        if (!selectedApplicant) {

            console.error("No applicant selected.");

            return;
        }

        const formattedStart = `${start.getFullYear()}-${String(
            start.getMonth() + 1
        ).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")} ${String(
            start.getHours()
        ).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}:${String(
            start.getSeconds()
        ).padStart(2, "0")}`;
        const formattedEnd = `${end.getFullYear()}-${String(
            end.getMonth() + 1
        ).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")} ${String(
            end.getHours()
        ).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}:${String(
            end.getSeconds()
        ).padStart(2, "0")}`;


        const interviewerId = userId;

        dispatch(
            postInterview({
                title,
                startDate: formattedStart,
                endDate: formattedEnd,
                status: "scheduled",
                description,
                intervieweeId: selectedApplicant,
                interviewerId,
            })
        ).then(() => {
            dispatch(getInterviewsForInterviewer({
                interviewerId: userId,
            }));

        });

        closeModal();
    };

    useEffect(() => {
        const fetchShortlists = async (userId) => {
            try {
                const response = await axios.get(
                    `${appUrl}/api/users/${userId}/shortlists`
                );
                setShortlists(response.data.shortlists);

            } catch (error) {
                console.error("Error fetching shortlists:", error);

            }
        };

        if (userId) {
            fetchShortlists(userId);
        }
    }, [userId]);


    const handleDeleteClickShortlist = async (shortlist) => {
        try {
            const response = await axios.delete(
                `${appUrl}/api/jobs/${shortlist.job.id}/shortlist`
            );
            handleShortlistDelete(shortlist.id);
        } catch (error) {
            console.error("Error deleting shortlist:", error);

        }
    };

    const handleShortlistDelete = (shortlistId) => {
        const updatedShortlists = shortlists.filter((shortlist) => shortlist.id !== shortlistId);
        setShortlists(updatedShortlists);
    };

    const handleDeleteClick = async (event) => {
        try {

            const response = await axios.delete(
                `${appUrl}/api/v1/interviews/${event.id}`
            );
            handleEventDelete(event.id);

        } catch (error) {
            console.error("Error deleting event:", error);

        }
    };

    const handleEventDelete = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);

    };



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
    if (!user || !events) {
        return <LoadingScreen><Spinner /></LoadingScreen>;
    }

    console.log(events)

    const handleUpdateToProposedTimeConfirm = () => {
        if (!selectedEvent || !selectedEvent.proposedTime) return;

        const formattedProposedTime = moment(selectedEvent.proposedTime).format("YYYY-MM-DD HH:mm:ss");

        // Add 1 hour to the proposed time for the end date
        const endDate = moment(selectedEvent.proposedTime).add(1, 'hours').format("YYYY-MM-DD HH:mm:ss");

        // Patch interview to set proposed time as the new start time and reset proposedTime to null
        dispatch(
            patchInterview({
                interviewId: selectedEvent.id,
                startDate: formattedProposedTime,
                endDate: endDate, // Added end date with 1 hour added
                proposedTime: null // Reset proposedTime to null
            })
        ).then(() => {
            // Dispatch email notification after the update
            dispatch(
                sendInterviewTimeChanged({
                    studentId: selectedEvent.intervieweeId,
                    jobTitle: selectedEvent.title,
                    newTime: formattedProposedTime,
                    endTime: endDate, // Optionally include the end time in the email
                })
            ).then(response => {
                console.log('Interview time updated and email sent:', response);
            }).catch(error => {
                console.error("Failed to send email:", error);
            });

            // Refresh the interviews after the update
            dispatch(getInterviewsForInterviewer({ interviewerId: userId }));
        }).catch(error => {
            console.error("Error updating interview:", error);
        });

        setShowConfirmModal(false);
    };


    const handleUpdateToProposedTime = (event) => {
        setShowConfirmModal(true);
        setSelectedEvent(event);

        // Differentiate the action for the confirmation modal
        setConfirmAction("updateToProposedTime");
    };


    return (
        <NavBar header={"Interviews"}>
            <GlobalStyles darkMode={darkMode} fontSize={fontSize} />
            <MainContainer darkMode={darkMode} fontSize={fontSize}>
                <Container darkMode={darkMode} fontSize={fontSize}>
                    <Wrapper darkMode={darkMode} fontSize={fontSize}>

                        <CalendarDiv darkMode={darkMode} fontSize={fontSize}>
                            <DndProvider darkMode={darkMode} fontSize={fontSize} backend={HTML5Backend}>
                                <DnDCalendar darkMode={darkMode} fontSize={fontSize}
                                    defaultDate={new Date(getTodayDate())}
                                    defaultView="month"
                                    events={events}
                                    localizer={localizer}
                                    onEventDrop={handleEventDrop}
                                    resizable
                                    onEventResize={handleEventResize}
                                    style={{ height: "100%" }}
                                    selectable
                                    onSelectSlot={openModal}
                                    startAccessor={"start"}
                                    endAccessor="end"
                                    eventPropGetter={eventStyleGetter}
                                />
                            </DndProvider>
                        </CalendarDiv>
                    </Wrapper>
                    {/* <ShortlistsContainer darkMode={darkMode} fontSize={fontSize}>
                        <ShortlistsHeader>Applicant Shortlists</ShortlistsHeader>
                        {shortlists && shortlists.length > 0 ? (
                            shortlists.map((shortlist) => (
                                <Shortlist key={shortlist.id}>
                                    <DeleteButton onClick={() => handleDeleteClickShortlist(shortlist)}>X</DeleteButton>
                                    <div>{shortlist.job.title}</div>
                                    <div>
                                        Applicants:
                                        <ApplicantList>
                                            {shortlist.applicants.map((applicant) => (
                                                <ApplicantItem key={applicant.id}>
                                                    {applicant.name} - {applicant.email}
                                                </ApplicantItem>
                                            ))}
                                        </ApplicantList>
                                    </div>

                                    {/* Add more fields as needed */}
                                {/* </Shortlist>
                            ))
                        ) : (
                            <NoShortlistsMessage>No shortlists found</NoShortlistsMessage>
                        )}
                    </ShortlistsContainer> */}
                    <EventsContainer darkMode={darkMode} fontSize={fontSize}>
    <EventsHeader darkMode={darkMode} fontSize={fontSize}>All Events</EventsHeader>
    {events && events.length > 0 ? (
        events.map((event) => (
            <Event darkMode={darkMode} fontSize={fontSize} key={event.id}>
                <DeleteButton darkMode={darkMode} fontSize={fontSize} onClick={() => handleDeleteClick(event)}>X</DeleteButton>
                <div>Title: {event.title}</div>
                <div>Description: {event.description}</div>
                <div>
                    Start Date: {moment(event.start).format("YYYY-MM-DD HH:mm:ss")}
                </div>
                <div>
                    End Date: {moment(event.end).format("YYYY-MM-DD HH:mm:ss")}
                </div>

                {/* Conditionally render proposed time if it exists */}
                {event.proposedTime !== event.startDate && event.proposedTime != null && (
                    <>
                        <div>
                            <strong>Proposed Time:</strong> {moment(event.proposedTime).format("YYYY-MM-DD HH:mm:ss")}
                        </div>

                        {/* Render 'Update to Proposed Time' button if proposed time is not null */}
                        <PurpleButton fontSize={fontSize} onClick={() => handleUpdateToProposedTime(event)}>
                            Update to Proposed Time
                        </PurpleButton>
                    </>
                )}

                {/* Existing button for sending updated interview time */}
                <PurpleButton fontSize={fontSize} onClick={() => handlePurpleButtonClick(event)}>
                    Send Updated Interview Time
                </PurpleButton>
            </Event>
        ))
    ) : (
        <NoEventsMessage>No events found</NoEventsMessage>
    )}
</EventsContainer>
                </Container>
            </MainContainer>
            {showModal && (
                <Modal darkMode={darkMode} fontSize={fontSize}
                    onClose={closeModal}
                    onSubmit={handleAddEvent}
                    defaultDate={new Date(getTodayDate())}
                    applicants={shortlists.flatMap((shortlist) => shortlist.applicants)}
                />

            )}
{showConfirmModal && (
    <ConfirmModal
        darkMode={darkMode}
        onClose={handleCloseConfirmModal}
        onConfirm={
            confirmAction === "updateTime"
                ? handleUpdateTimeConfirm
                : confirmAction === "updateToProposedTime"
                ? handleUpdateToProposedTimeConfirm
                : handleConfirm
        }
        onUpdateWithoutNotification={handleUpdateWithoutNotification}
        headerText={confirmAction === "updateTime" ? "Confirm Time Update" : "Confirm Update"}
        modalText={
            confirmAction === "updateTime"
                ? "Are you sure you want to update the interview time after resizing or moving?"
                : "Are you sure you want to send the updated interview time to the student?"
        }
    />
)}


        </NavBar>
    );
};

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

// Styled component with a loading animation
const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0; /* Adjust background color as needed */
    color: #333; /* Adjust text color as needed */
`;

// Additional styling for the spinning element
const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db; /* Adjust loading spinner color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite; /* Apply the spin animation */
`;

export default Interviews;
