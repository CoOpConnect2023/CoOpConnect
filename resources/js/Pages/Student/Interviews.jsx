import * as React from "react";
const appUrl = import.meta.env.VITE_APP_URL;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import Modal from "../Profile/Partials/AddEventModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
    getInterviewsForInterviewee,
    postInterview,
    selectInterviewsStatus,
    selectInterviews,
    deleteInterview,
} from "@/Features/interviews/interviewsSlice";
import { getUser, selectUser } from "@/Features/users/userSlice";
import {
    MainContainer,
    Container,
    Wrapper,
    Header,
    CalendarDiv,
    CalendarHeader,
    Month,
    NavIcons,
    Icon,
    DaysOfWeek,
    Day,
    DatesGrid,
    DateCell,
    EventsContainer,
    EventsHeader,
    Event,
    NoEventsMessage,
    DeleteButton
} from "./Styling/Interviews.styles";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Interviews = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const user = useSelector(selectUser);
    const userId = user?.id;
    const [events, setEvents] = useState([]);
    const data = useSelector(selectInterviews);
    const interviews = data.interviews;
    const interviewsStatus = useSelector(selectInterviewsStatus);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getInterviewsForInterviewee({
                intervieweeId: userId,
            })
        );
    }, [userId]);

    function transformedInterviews(interviews) {
        const result = interviews.map((interview) => ({
            ...interview,
            start: new Date(interview.startDate),
            end: new Date(interview.endDate),
        }));
        return result;
    }

    useEffect(() => {
        setEvents(transformedInterviews(interviews));
    }, [interviews]);

    useEffect(() => {
        if (interviewsStatus.postInterview == "succeeded") {

            setEvents(...events, transformedInterviews(data.postInterview));
        }
    }, [interviews.postInterview]);



    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

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

    const openModal = (day) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setShowModal(false);
    };

    const handleAddEvent = (title, description, start, end) => {



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



        dispatch(
            postInterview({
                title,
                startDate: formattedStart,
                endDate: formattedEnd,
                status: "scheduled",
                description,
                intervieweeId: userId,
                interviewerId: userId,
            })
        ).then(() => {
            dispatch(getInterviewsForInterviewee({
                intervieweeId: userId,
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

    return (
        <NavBar header={"Interviews"}>
            <MainContainer>
                <Container>
                    <Wrapper>
                        <Header>Schedule your Interviews</Header>
                        <CalendarDiv>
                            <DndProvider backend={HTML5Backend}>
                                <DnDCalendar
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
                                />
                            </DndProvider>
                        </CalendarDiv>
                    </Wrapper>
                    <EventsContainer>
                        <EventsHeader>All Events</EventsHeader>
                        {events && events.length > 0 ? (
                            events.map((event) => (
                                <Event key={event.id}>
                                    <DeleteButton onClick={() => handleDeleteClick(event)}>X</DeleteButton>
                                    <div>Title: {event.title}</div>
                                    <div>Description: {event.description}</div>
                                    <div>
                                        Start Date: {moment(event.start).format("YYYY-MM-DD HH:mm:ss")}
                                    </div>
                                    <div>
                                        End Date: {moment(event.end).format("YYYY-MM-DD HH:mm:ss")}
                                    </div>
                                </Event>
                            ))
                        ) : (
                            <NoEventsMessage>No events found</NoEventsMessage>
                        )}
                    </EventsContainer>
                </Container>
            </MainContainer>
            {showModal && (
                <Modal
                    onClose={closeModal}
                    onSubmit={handleAddEvent}
                    defaultDate={new Date(getTodayDate())}
                />
            )}
        </NavBar>
    );
};

export default Interviews;
