import * as React from "react";
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
} from "./Styling/Interviews.styles";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Interviews = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user-id`
                );
                setUserId(response.data.user.id);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };
        fetchUserId();
    }, []);

    const dispatch = useDispatch();

    const data = useSelector(selectInterviews);
    const interviews = data.interviews;
    const interviewsStatus = useSelector(selectInterviewsStatus);

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
            start: interview.startDate,
            end: interview.endDate,
        }));
        return result;
    }

    useEffect(() => {
        setEvents(transformedInterviews(interviews));
    }, [interviews]);

    useEffect(() => {
        if (interviewsStatus.postInterview == "succeeded") {
            console.log(
                "True Check",
                transformedInterviews(data.postInterview)
            );
            setEvents(...events, transformedInterviews(data.postInterview));
        }
    }, [interviews.postInterview]);

    console.log("Fetched User ID:", userId);
    console.log("interviews", events);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const handleEventResize = ({ event, start, end }) => {
        const nextEvents = events.map((existingEvent) => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });

        setEvents(nextEvents);
    };

    const handleEventDrop = ({ event, start, end }) => {
        const nextEvents = events.map((existingEvent) => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });

        setEvents(nextEvents);
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
        // Format start and end dates to ISO 8601 string format
        /*         const formattedStart = start.toISOString(); // Convert Date object to ISO string
        const formattedEnd = end.toISOString(); */
        const formattedStart = `${start.getFullYear()}-${String(
            start.getMonth() + 1
        ).padStart(2, "0")}-${String(start.getDate()).padStart(
            2,
            "0"
        )} ${String(start.getHours()).padStart(2, "0")}:${String(
            start.getMinutes()
        ).padStart(2, "0")}:${String(start.getSeconds()).padStart(2, "0")}`;
        const formattedEnd = `${end.getFullYear()}-${String(
            end.getMonth() + 1
        ).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")} ${String(
            end.getHours()
        ).padStart(2, "0")}:${String(end.getMinutes()).padStart(
            2,
            "0"
        )}:${String(end.getSeconds()).padStart(2, "0")}`;

        // Create newEvent object with formatted dates

        dispatch(
            postInterview({
                title,
                startDate: formattedStart,
                endDate: formattedEnd,
                status: "scheduled",
                description,
                intervieweeId: userId, // Assuming userId is defined
                interviewerId: userId,
            })
        );

        closeModal();
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
                                />
                            </DndProvider>
                        </CalendarDiv>
                    </Wrapper>
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
