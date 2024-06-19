import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import Modal from "../Profile/Partials/AddEventModal"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);



const Interviews = () => {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([{
        id: 0,
        title: 'Board Meeting',
        start: new Date(2024, 5, 20, 10, 0), // June 20, 2024, 10:00 AM
        end: new Date(2024, 5, 20, 12, 0),   // June 20, 2024, 12:00 PM
        description: 'Monthly board meeting',
      },
      {
        id: 1,
        title: 'Team Building Event',
        start: new Date(2024, 5, 21, 14, 0), // June 21, 2024, 2:00 PM
        end: new Date(2024, 5, 21, 17, 0),   // June 21, 2024, 5:00 PM
        description: 'Outdoor activities and team exercises',
      },
      {
        id: 2,
        title: 'Project Deadline',
        allDay: true,
        start: new Date(2024, 5, 25),        // June 25, 2024 (all day)
        end: new Date(2024, 5, 25),
        description: 'Final submission date for the project',
      },
      {
        id: 3,
        title: 'Conference',
        start: new Date(2024, 5, 26, 9, 0),  // June 26, 2024, 9:00 AM
        end: new Date(2024, 5, 28, 17, 0),   // June 28, 2024, 5:00 PM
        description: 'Annual industry conference',
      },
      {
        id: 4,
        title: 'Workshop: Advanced JavaScript',
        start: new Date(2024, 5, 29, 13, 0), // June 29, 2024, 1:00 PM
        end: new Date(2024, 5, 29, 16, 0),   // June 29, 2024, 4:00 PM
        description: 'A hands-on workshop on advanced JavaScript topics',
      },
      {
        id: 5,
        title: 'Webinar: React Basics',
        start: new Date(2024, 6, 3, 10, 0),  // July 3, 2024, 10:00 AM
        end: new Date(2024, 6, 3, 11, 0),    // July 3, 2024, 11:00 AM
        description: 'Introduction to React for beginners',
      },
      {
        id: 6,
        title: 'Company Holiday',
        allDay: true,
        start: new Date(2024, 6, 4),         // July 4, 2024 (all day)
        end: new Date(2024, 6, 4),
        description: 'Independence Day',
      },
      {
        id: 7,
        title: 'Product Launch',
        start: new Date(2024, 6, 10, 15, 0), // July 10, 2024, 3:00 PM
        end: new Date(2024, 6, 10, 16, 0),   // July 10, 2024, 4:00 PM
        description: 'Launch event for new product line',
      },
      {
        id: 8,
        title: 'Client Meeting',
        start: new Date(2024, 6, 12, 11, 0), // July 12, 2024, 11:00 AM
        end: new Date(2024, 6, 12, 12, 0),   // July 12, 2024, 12:00 PM
        description: 'Discuss project progress with client',
      },
      {
        id: 9,
        title: 'Team Lunch',
        start: new Date(2024, 6, 13, 12, 30), // July 13, 2024, 12:30 PM
        end: new Date(2024, 6, 13, 14, 0),    // July 13, 2024, 2:00 PM
        description: 'Team bonding over lunch at a local restaurant',
      },



    ]);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



    const handleEventResize = ({ event, start, end }) => {
        const nextEvents = events.map(existingEvent => {
          return existingEvent.id === event.id
            ? { ...existingEvent, start, end }
            : existingEvent;
        });

        setEvents(nextEvents);
      };

      const handleEventDrop = ({ event, start, end }) => {
        const nextEvents = events.map(existingEvent => {
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

    const handleAddEvent = (title, description) => {
        addEvent(selectedDate, title, description);
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
      />
    </DndProvider>
    </CalendarDiv>
                    </Wrapper>
                </Container>
            </MainContainer>
            {showModal && (
                <Modal
                    onClose={closeModal}
                    onSubmit={(title, description) =>
                        handleAddEvent(title, description)
                    }
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
