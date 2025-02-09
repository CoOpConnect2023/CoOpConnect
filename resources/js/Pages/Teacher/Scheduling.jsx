import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import {
    MainContainer,
    Container,
    Wrapper,
    Header,
    CalendarWrapper,
    CalendarHeader,
    Month,
    NavIcons,
    Icon,
    DaysOfWeek,
    Day,
    DatesGrid,
    DateCell,
    TodayDateCell,
    InactiveDateCell,
    CalendarDiv,
    EventsContainer,
    EventsHeader,
    Event,
    NoEventsMessage,
    DeleteButton,
    GlobalStyles


} from "./Styling/Scheduling.styles.jsx";
import Modal from "../Profile/Partials/AddEventModal";
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
    selectInterviewsStatus,
    selectInterviews,
} from "@/Features/interviews/interviewsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import { getCourses, selectCourses } from "@/Features/courses/coursesSlice";
import axios from "axios"; // Don't forget to import axios
const appUrl = import.meta.env.VITE_APP_URL;


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Interviews = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [shortlists, setShortlists] = useState([]);
    const userId = user?.id;
    const data = useSelector(selectInterviews);
    const interviews = data.interviews;
    const interviewsStatus = useSelector(selectInterviewsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getInterviewsForInterviewer({
                interviewerId: userId,
            })
        );
    }, [userId]);

    useEffect(() => {
        const fetchShortlists = async (userId) => {
            try {
                const response = await axios.get(
                    `${appUrl}/api/v1/courses/teacher/${userId}`
                );
                setShortlists(response.data.data);

            } catch (error) {
                console.error("Error fetching shortlists:", error);

            }
        };

        if (userId) {
            fetchShortlists(userId);
        }
    }, [userId]);

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

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const openModal = (day) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setShowModal(false);
    };

    const handleEventResize = async ({ event, start, end }) => {

    const formatDateTime = (dateTime) => {
            const year = dateTime.getFullYear();
            const month = String(dateTime.getMonth() + 1).padStart(2, "0");
            const day = String(dateTime.getDate()).padStart(2, "0");
            const hours = String(dateTime.getHours()).padStart(2, "0");
            const minutes = String(dateTime.getMinutes()).padStart(2, "0");
            const seconds = String(dateTime.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        try {

            const payload = {
                title: event.title,
                start_date: formatDateTime(start),
                end_date: formatDateTime(end),
                status: event.status,
                description: event.description,
                interviewee_id: event.intervieweeId,
                interviewer_id: event.interviewerId,
            };


            const response = await axios.put(
                `${appUrl}/api/v1/interviews/${event.id}`,
                payload
            );

    const updatedEvents = events.map((existingEvent) =>
                existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
            );

            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };


    const handleEventDrop = async ({ event, start, end }) => {

        const formatDateTime = (dateTime) => {
            const year = dateTime.getFullYear();
            const month = String(dateTime.getMonth() + 1).padStart(2, "0");
            const day = String(dateTime.getDate()).padStart(2, "0");
            const hours = String(dateTime.getHours()).padStart(2, "0");
            const minutes = String(dateTime.getMinutes()).padStart(2, "0");
            const seconds = String(dateTime.getSeconds()).padStart(2, "0");

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };



        try {
            // Prepare payload with necessary fields, including start_date and end_date
            const payload = {
                title: event.title,
                start_date: formatDateTime(start),
                end_date: formatDateTime(end),
                status: event.status,
                description: event.description,
                interviewee_id: event.intervieweeId,
                interviewer_id: event.interviewerId,
            };


            // Send PUT request to update event
            const response = await axios.put(
                `${appUrl}/api/v1/interviews/${event.id}`,
                payload
            );



            // Update events state with the new position
            const updatedEvents = events.map((existingEvent) =>
                existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
            );

            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };



    const handleAddEvent = (title, description, start, end, selectedApplicant) => {
        // Check if selectedApplicant is defined and not empty
        if (!selectedApplicant) {
            // Handle case where no applicant is selected
            console.error("No applicant selected.");
            // Optionally, show an error message or prevent form submission
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

        // Assuming userId is defined elsewhere in your component
        const interviewerId = userId; // Replace with actual userId value

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
        // Otherwise, apply the amplification factor
        return `${basePixelSize * em * factor}px`;
    };

    const eventStyleGetter = (event, start, end, isSelected) => {

        const calculatedFontSize = calculateFontSize(14, fontSize);
        let backgroundColor = '#6B538C'; // Desired color for the event markers
        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white', // Text color for better contrast
            border: '0px',
            display: 'block',
            fontSize: calculatedFontSize
        };
        return {
            style: style
        };
    };

    const formats = {
        agendaHeaderFormat: ({ start, end }, culture, localizer) =>
          `${localizer.format(start, 'MMMM DD, YYYY', culture)} – ${localizer.format(
            end,
            'MMMM DD, YYYY',
            culture
          )}`,
      };

    return (
        <NavBar header={"Interviews"}>
           <GlobalStyles darkMode={darkMode} fontSize={fontSize} /> <MainContainer fontSize={fontSize} darkMode={darkMode}>
                <Container fontSize={fontSize} darkMode={darkMode}>
                    <Wrapper fontSize={fontSize} darkMode={darkMode}>
                        <Header fontSize={fontSize} darkMode={darkMode}>Schedule your Interviews</Header>
                        <CalendarDiv fontSize={fontSize} darkMode={darkMode}>
                            <DndProvider fontSize={fontSize} darkMode={darkMode} backend={HTML5Backend}>
                                <DnDCalendar fontSize={fontSize} darkMode={darkMode}
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
                                    formats={formats}
                                />
                            </DndProvider>
                        </CalendarDiv>
                    </Wrapper>

                    <EventsContainer fontSize={fontSize} darkMode={darkMode}>
                        <EventsHeader fontSize={fontSize} darkMode={darkMode}>All Events</EventsHeader>
                        {events && events.length > 0 ? (
                            events.map((event) => (
                                <Event fontSize={fontSize} darkMode={darkMode} key={event.id}>
                                    <DeleteButton fontSize={fontSize} darkMode={darkMode} onClick={() => handleDeleteClick(event)}>X</DeleteButton>
                                    <div>Title: {event.title}</div>
                                    <div>Description: {event.description}</div>
                                    <div>
        Start Date: {moment(event.start).format("MMMM D, YYYY HH:mm")}
    </div>
    <div>
        End Date: {moment(event.end).format("MMMM D, YYYY HH:mm")}
    </div>
                                </Event>
                            ))
                        ) : (
                            <NoEventsMessage fontSize={fontSize} darkMode={darkMode}>No events found</NoEventsMessage>
                        )}
                    </EventsContainer>
                </Container>
            </MainContainer>
            {showModal && (
                <Modal darkMode={darkMode} fontSize={fontSize}
                    onClose={closeModal}
                    onSubmit={handleAddEvent}
                    defaultDate={new Date(getTodayDate())}
                    applicants={shortlists.flatMap((shortlist) => shortlist.users)}
                />
            )}
        </NavBar>
    );
};

export default Interviews;
