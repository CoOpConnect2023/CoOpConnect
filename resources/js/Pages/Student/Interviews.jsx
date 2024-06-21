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
} from "@/Features/interviews/interviewsSlice";
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
            console.log("True Check", transformedInterviews(data.postInterview));
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

        // Create newEvent object with formatted dates

        dispatch(
            postInterview({
                title: "test",
                startDate: "2024-06-18 23:15:47",
                endDate: "2024-06-19 00:15:47",
                status: "scheduled",
                description: "test",
                intervieweeId: userId,
                interviewerId: 2,
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
const MainContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex: 1 0 0;
    align-self: stretch;
    background-color: var(--Schemes-Background, #fff7ff);
`;

const Container = styled.div`
    align-items: center;
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 782px;
    max-width: 100%;
    flex-direction: column;
`;

const Header = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    text-decoration-line: underline;
    align-self: center;
    font: 600 32px Poppins, sans-serif;
`;

const CalendarDiv = styled.div`
    background-color: #ffffff;
height: 80vh;
margin-bottom: 3vh;
margin-top: 3vh;
    }
`;

const CalendarHeader = styled.div`
    justify-content: space-between;
    display: flex;
    width: 100%;
    gap: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

const Month = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    margin: auto 0;
    font: 900 24px Inter, sans-serif;
`;

const NavIcons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 16px;
`;

const Icon = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 30px;
    cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
    filter: ${({ isDisabled }) =>
        isDisabled ? "grayscale(100%) brightness(150%)" : "none"};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

const DaysOfWeek = styled.div`
    display: flex;
    margin-top: 12px;
    gap: -1px;
    font-size: 14px;
    color: #000;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    justify-content: space-between;
    padding: 40px 80px 40px 0;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
        padding-right: 20px;
        white-space: initial;
    }
`;

const Day = styled.div`
    display: flex;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
`;

const DatesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: -1px;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    justify-content: space-between;
    @media (max-width: 991px) {
        flex-wrap: wrap;
        white-space: initial;
    }
`;

const DateCell = styled.div`
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
    justify-content: center;
    border-color: rgba(213, 212, 223, 1);
    border-style: solid;
    border-width: 1px;
    padding: 40px;
    @media (max-width: 991px) {
        white-space: initial;
        padding: 0 20px;
    }
`;

const InactiveDateCell = styled(DateCell)`
    background-color: var(--Inactive, #f2f3f7);
`;

const TodayDateCell = styled(DateCell)`
    border: 1px solid var(--Stroke, #d5d4df);
    background: var(--Schemes-Primary, #6b538c);
    color: #fff; // Ensures the text is readable
`;

export default Interviews;
