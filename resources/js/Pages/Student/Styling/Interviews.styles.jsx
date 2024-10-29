import styled, { keyframes, createGlobalStyle } from "styled-components";


const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number

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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};

     animation: ${fadeIn} 0.8s ease-in-out;

     @media (max-width: 991px) {

        width: 100%;
    }
`;

export const Container = styled.div`
    display: flex;
    height: 100%;
    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    flex-direction: row;
    gap: 15px;

    width: 100%;
    padding: 10px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;


    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    }

    @media (max-width: 991px) {
        padding: 0px;
        height:100%; /* Adjust height for smaller screens */
        flex-direction: column;
        width: 100%;
    }
`;

export const Wrapper = styled.div`
    width: 90%;
    display: flex;
    flex:1;
    padding: 10px;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};

     @media (max-width: 991px) {
        padding: 0px;
        height:100%; /* Adjust height for smaller screens */
        flex-direction: column;
        min-height: 400px;
        width: 100%;
    }
`;

export const Header = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    text-decoration-line: underline;
    align-self: center;
    font: 600 ${({ fontSize }) => calculateFontSize(28, fontSize)} Poppins, sans-serif;
    margin-bottom: 20px;
    @media (max-width: 991px) {
       font: 600 ${({ fontSize }) => calculateFontSize(24, fontSize)} Poppins, sans-serif;
`;

export const CalendarDiv = styled.div`
    width: 90%;
    flex: 1;
    overflow: auto; /* Enable vertical scrolling if needed */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: ${({ darkMode }) => (darkMode ? "#444444" : "rgba(123, 117, 127, 1)")};
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};

    @media (max-width: 991px) {
        min-height: 60vh; /* Adjust height for smaller screens */
        height: 60vh;
        flex: none;
        width: 100%;
    }
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Month = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    margin: auto 0;
    font: 900 ${({ fontSize }) => calculateFontSize(24, fontSize)} Inter, sans-serif;
    transition: color 0.3s;
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
    gap: -1px;
   font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    font-weight: 600;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    justify-content: space-between;
    padding: 40px 80px 40px 0;

    @media (max-width: 991px) {
        flex-wrap: wrap;
        padding-right: 20px;
        justify-content: center;
    }
`;

export const Day = styled.div`
    display: flex;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    transition: color 0.3s;
`;

export const DatesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: -1px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    justify-content: space-between;

    @media (max-width: 991px) {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
`;

export const DateCell = styled.div`
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
    justify-content: center;
    border-color: rgba(213, 212, 223, 1);
    border-style: solid;
    border-width: 1px;
    padding: ${({ fontSize }) => calculateFontSize(40, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(213, 212, 223, 0.5);
    }

    @media (max-width: 991px) {
        padding: 20px;
    }
`;

export const EventsContainer = styled.div`
display:flex;
flex-direction: column;
    width: 35%;

    padding: 10px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#ccc")};
background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
font-size: ${({ fontSize }) => fontSize};
    border-radius: 8px;
    overflow-y: auto; /* Enable vertical scrolling */
     /* Limit height for smaller screens */
    max-height: 85vh;

    @media (max-width: 991px) {
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 400px; /* Limit height for smaller screens */
        min-height: 20vh;
        width:100%;
    }
`;

export const EventsHeader = styled.h2`
    margin-bottom: 5px;
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
`;

export const Event = styled.div`
  background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#ffffff")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
  padding: 16px;
  margin-bottom: 16px;
  position: relative; /* Ensure relative positioning for absolute children */
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  /* Ensure text wrapping */
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

export const NoEventsMessage = styled.div`
    margin-top: 10px;
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    color: #999;
`;

export const DeleteButton = styled.button`
    background-color: ${({ darkMode }) => (darkMode ? "darkred" : "red")};
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    position: absolute;
    top: 10px;
    right: 10px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: darkred;
    }
`;


export const GlobalStyles = createGlobalStyle`
  /* Style all buttons in the date navigation (Month, Week, Day, Today, etc.) */
  .rbc-btn-group button {
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#FFF" : "#6B538C")}; /* Main color for labels */
    transition: color 0.3s, background-color 0.3s;
  }

  .rbc-btn-group button:hover {
    color: ${({ darkMode }) => (darkMode ? "#FFFFFF" : "#543b6f")}; /* Hover color */
  }

  /* Active button style */
  .rbc-btn-group .rbc-active {
    background-color: ${({ darkMode }) => (darkMode ? "#6B538C" : "#6B538C")};
    color: #FFFFFF; /* Ensure text stays white on active */
  }

  /* Toolbar label color (e.g., displaying current date or view mode) */
  .rbc-toolbar-label {
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};
    transition: color 0.3s;
  }
`;


export const PurpleButton = styled.button`
  background-color: #B6A1E5;
  color: #fff;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: ${({ fontSize }) => fontSize || '1em'};
  margin-top: 10px;

  &:hover {
    background-color: #5b2a8b;
  }
`;
