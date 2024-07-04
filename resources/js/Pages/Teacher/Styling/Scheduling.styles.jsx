import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex: 1 0 0;
    align-self: stretch;
    background-color: var(--Schemes-Background, #fff7ff);
`;

export const Container = styled.div`
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

export const Wrapper = styled.div`
    display: flex;
    width: 782px;
    max-width: 100%;
    flex-direction: column;
`;

export const Header = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    text-decoration-line: underline;
    align-self: center;
    font: 600 32px Poppins, sans-serif;
`;

export const CalendarWrapper = styled.div`
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

export const CalendarHeader = styled.div`
    justify-content: space-between;
    display: flex;
    width: 100%;
    gap: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
    }
`;

export const Month = styled.div`
    color: var(--Schemes-Primary, #6b538c);
    margin: auto 0;
    font: 900 24px Inter, sans-serif;
`;

export const NavIcons = styled.div`
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 16px;
`;

export const Icon = styled.img`
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 30px;
    cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
    filter: ${({ isDisabled }) =>
        isDisabled ? "grayscale(100%) brightness(150%)" : "none"};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

export const DaysOfWeek = styled.div`
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

export const Day = styled.div`
    display: flex;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
`;

export const DatesGrid = styled.div`
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

export const DateCell = styled.div`
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

export const TodayDateCell = styled(DateCell)`
    border: 1px solid var(--Stroke, #d5d4df);
    background: var(--Schemes-Primary, #6b538c);
    color: #fff; // Ensures the text is readable
`;

export const InactiveDateCell = styled(DateCell)`
    background-color: var(--Inactive, #f2f3f7);
`;

export const CalendarDiv = styled.div`
background-color: #ffffff;
height: 80vh;
margin-bottom: 3vh;
margin-top: 3vh;

`;

export const EventsContainer = styled.div`
  width: 100%; /* Take full width of Container */
  max-width: 400px; /* Adjust as per your design */
  overflow-y: auto; /* Make it scrollable */
height: 80vh;
padding: 1vh;
`;

export const EventsHeader = styled.h2`
  font-size: 24px;
  color: #6b538c;
  margin-bottom: 20px;
`;

export const Event = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  position: relative; /* Ensure relative positioning for absolute children */
`;

export const NoEventsMessage = styled.p`
  font-size: 18px;
  color: #6b538c;
  margin-top: 20px;
`;

export const DeleteButton = styled.button`
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
