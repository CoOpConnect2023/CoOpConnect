import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const ScheduleInterviews = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const renderCalendar = (month, year) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const prevDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        const prevMonthDays = new Date(year, month, 0).getDate();
        const nextMonthDays = 42 - (daysInMonth + prevDays);

        const daysArray = [
            ...Array(prevDays)
                .fill(null)
                .map((_, i) => ({
                    day: prevMonthDays - prevDays + i + 1,
                    isInCurrentMonth: false,
                })),
            ...Array(daysInMonth)
                .fill(null)
                .map((_, i) => ({ day: i + 1, isInCurrentMonth: true })),
            ...Array(nextMonthDays)
                .fill(null)
                .map((_, i) => ({ day: i + 1, isInCurrentMonth: false })),
        ];

        return daysArray;
    };

    const handlePrevMonth = () => {
        const today = new Date();
        if (
            !(
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
            )
        ) {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const daysArray = renderCalendar(currentMonth, currentYear);

    const today = new Date();
    const isPrevDisabled =
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

    return (
        <NavBar header={"Interviews"}>
            <MainContainer>
                <Container>
                    <Wrapper>
                        <Header>Schedule your Interviews</Header>
                        <CalendarWrapper>
                            <CalendarHeader>
                                <Month>
                                    {new Date(
                                        currentYear,
                                        currentMonth
                                    ).toLocaleDateString("en-us", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </Month>
                                <NavIcons>
                                    <Icon
                                        loading="lazy"
                                        src="https://img.icons8.com/ios-glyphs/30/000000/chevron-left.png"
                                        onClick={handlePrevMonth}
                                        isDisabled={isPrevDisabled}
                                    />
                                    <Icon
                                        loading="lazy"
                                        src="https://img.icons8.com/ios-glyphs/30/000000/chevron-right.png"
                                        onClick={handleNextMonth}
                                        isDisabled={false}
                                    />
                                </NavIcons>
                            </CalendarHeader>
                            <DaysOfWeek>
                                <Day>Mo</Day>
                                <Day>Tu</Day>
                                <Day>We</Day>
                                <Day>Th</Day>
                                <Day>Fr</Day>
                                <Day>Sa</Day>
                                <Day>Su</Day>
                            </DaysOfWeek>
                            <DatesGrid>
                                {daysArray.map((date, idx) => {
                                    const isToday =
                                        date.day === today.getDate() &&
                                        currentMonth === today.getMonth() &&
                                        currentYear === today.getFullYear();

                                    if (date.isInCurrentMonth) {
                                        return isToday ? (
                                            <TodayDateCell key={idx}>
                                                {date.day}
                                            </TodayDateCell>
                                        ) : (
                                            <DateCell key={idx}>
                                                {date.day}
                                            </DateCell>
                                        );
                                    } else {
                                        return (
                                            <InactiveDateCell key={idx}>
                                                {date.day}
                                            </InactiveDateCell>
                                        );
                                    }
                                })}
                            </DatesGrid>
                        </CalendarWrapper>
                    </Wrapper>
                </Container>
            </MainContainer>
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

const CalendarWrapper = styled.div`
    border-radius: 16px;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 30px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
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

export default ScheduleInterviews;
