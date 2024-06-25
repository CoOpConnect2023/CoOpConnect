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
    getInterviewsForInterviewer,
    postInterview,
    selectInterviewsStatus,
    selectInterviews,
} from "@/Features/interviews/interviewsSlice";
import axios from "axios"; // Don't forget to import axios

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Interviews = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    const [userId, setUserId] = useState(null);
    const [shortlists, setShortlists] = useState([]);

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
            getInterviewsForInterviewer({
                interviewerId: userId,
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
        if (interviewsStatus.postInterview === "succeeded") {
            setEvents((prevEvents) => [
                ...prevEvents,
                ...transformedInterviews(data.postInterview),
            ]);
        }
    }, [interviewsStatus.postInterview, data.postInterview]);

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
        const nextEvents = events.map((existingEvent) =>
            existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
        );

        setEvents(nextEvents);
    };

    const handleEventDrop = ({ event, start, end }) => {
        const nextEvents = events.map((existingEvent) =>
            existingEvent.id === event.id ? { ...existingEvent, start, end } : existingEvent
        );

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
        );

        closeModal();
    };

    useEffect(() => {
        const fetchShortlists = async (userId) => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/users/${userId}/shortlists`
                );
                setShortlists(response.data.shortlists);
                console.log("shortlists", response.data.shortlists);
            } catch (error) {
                console.error("Error fetching shortlists:", error);
                // Handle error gracefully
            }
        };

        if (userId) {
            fetchShortlists(userId);
        }
    }, [userId]); // Ensure useEffect runs when userId changes


    const handleDeleteClick = async (shortlist) => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/jobs/${shortlist.job.id}/shortlist`
          );
          handleShortlistDelete(shortlist.id); // Update state or perform any necessary cleanup
          console.log(response.data.message); // Optionally log the response message
        } catch (error) {
          console.error("Error deleting shortlist:", error);
          // Handle error
        }
      };

      const handleShortlistDelete = (shortlistId) => {
        const updatedShortlists = shortlists.filter((shortlist) => shortlist.id !== shortlistId);
        setShortlists(updatedShortlists);
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
                    <ShortlistsContainer>
                        <ShortlistsHeader>Applicant Shortlists</ShortlistsHeader>
                        {shortlists && shortlists.length > 0 ? (
                            shortlists.map((shortlist) => (
                                <Shortlist key={shortlist.id}>
                                    <DeleteButton onClick={() => handleDeleteClick(shortlist)}>X</DeleteButton>
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
                                </Shortlist>
                            ))
                        ) : (
                            <NoShortlistsMessage>No shortlists found</NoShortlistsMessage>
                        )}
                    </ShortlistsContainer>
                </Container>
            </MainContainer>
            {showModal && (
                <Modal
                    onClose={closeModal}
                    onSubmit={handleAddEvent}
                    defaultDate={new Date(getTodayDate())}
                    applicants={shortlists.flatMap((shortlist) => shortlist.applicants)}
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
    gap: 40px; /* Add gap between CalendarDiv and ShortlistsContainer */
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%; /* Adjusted to take full width of Container */
    max-width: 782px; /* Adjust as per your design */
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

`;

const ShortlistsContainer = styled.div`
    width: 100%; /* Take full width of Container */
    max-width: 400px; /* Adjust as per your design */
`;

const ShortlistsHeader = styled.h2`
    font-size: 24px;
    color: #6b538c;
    margin-bottom: 20px;
`;

const Shortlist = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    position: relative; /* Ensure relative positioning for absolute children */
`;

const DeleteButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    position: absolute;
    top: 10px;
    right: 10px;
`;

const ApplicantList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 8px;
`;

const ApplicantItem = styled.li`
    font-size: 16px;
    margin-bottom: 4px;
`;

const NoShortlistsMessage = styled.p`
    font-size: 18px;
    color: #6b538c;
    margin-top: 20px;
`;

export default Interviews;
