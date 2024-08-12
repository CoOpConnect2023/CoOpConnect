import styled, { keyframes, createGlobalStyle } from "styled-components";

// Function to multiply base pixel value by the em value with an amplification factor
const calculateFontSize = (basePixelSize, emValue, factor = 1.5) => {
    const em = parseFloat(emValue); // Convert emValue to a number
    // If the emValue is exactly "1em", return the base size without modification
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const GlobalStyles = createGlobalStyle`
  .rbc-btn-group button {
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)}; /* Adjust the font size */
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")}; /* Change the text color */
    transition: color 0.3s, background-color 0.3s;
  }

  .rbc-btn-group button:hover {
    color: ${({ darkMode }) => (darkMode ? "#FFFFFF" : "#543b6f")}; /* Change color on hover */
  }

  .rbc-btn-group .rbc-active {
    background-color: ${({ darkMode }) => (darkMode ? "#6B538C" : "#6B538C")}; /* Active background color */
    color: #FFFFFF; /* Active text color */
  }

  .rbc-toolbar-label {
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6B538C")};
    transition: color 0.3s;
  }
`;

export const MainContainer = styled.div`
    display: flex;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    border-radius: 20px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    flex: 1 0 0;
    align-self: stretch;
    background-color: ${({ darkMode }) => (darkMode ? "#1C1C1C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    animation: ${fadeIn} 0.8s ease-in-out;
    transition: background-color 0.3s, color 0.3s;
`;

export const Container = styled.div`
    display: flex;
    border: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#e2e8f0")};
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    justify-content: center;

    width: 100%;
    margin: 0 auto;
    padding: 20px;

    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    height: 100%;
    transition: background-color 0.3s, color 0.3s;

    @media (max-width: 991px) {
        padding: 10px;
        height: auto; /* Adjust height for smaller screens */
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    justify-content: center;
    transition: color 0.3s;
`;

export const Header = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    text-decoration-line: underline;
    align-self: center;
    font: 600 ${({ fontSize }) => calculateFontSize(32, fontSize)} Poppins, sans-serif;
    transition: color 0.3s;
`;

export const CalendarWrapper = styled.div`
    border-radius: 16px;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-color: ${({ darkMode }) => (darkMode ? "#444444" : "rgba(123, 117, 127, 1)")};
    border-style: solid;
    border-width: 1px;
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 30px;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;

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
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    transition: color 0.3s;

    @media (max-width: 991px) {
        max-width: 100%;
        flex-wrap: wrap;
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
    margin-top: 12px;
    gap: -1px;
    font-size: ${({ fontSize }) => calculateFontSize(14, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    justify-content: space-between;
    padding: 40px 80px 40px 0;
    transition: color 0.3s;

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
    transition: color 0.3s;

    @media (max-width: 991px) {
        flex-wrap: wrap;
        white-space: initial;
    }
`;

export const DateCell = styled.div`
    font-variant-numeric: lining-nums tabular-nums;
    font-family: Inter, sans-serif;
    justify-content: center;
    border-color: ${({ darkMode }) => (darkMode ? "#555555" : "rgba(213, 212, 223, 1)")};
    border-style: solid;
    border-width: 1px;
    padding: ${({ fontSize }) => calculateFontSize(40, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#E0E0E0" : "#000")};
    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    transition: color 0.3s, background-color 0.3s, border-color 0.3s;

    @media (max-width: 991px) {
        white-space: initial;
        padding: ${({ fontSize }) => calculateFontSize(20, fontSize)};
    }
`;

export const TodayDateCell = styled(DateCell)`
    border: 1px solid ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#d5d4df")};
    background: ${({ darkMode }) => (darkMode ? "#6b538c" : "#6b538c")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#fff")};
`;

export const InactiveDateCell = styled(DateCell)`
    background-color: ${({ darkMode }) => (darkMode ? "#444444" : "#f2f3f7")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
`;

export const CalendarDiv = styled.div`
    width: 100%;
    min-height: 500px; /* Ensure minimum height for the calendar */
    height: 80vh; /* Adjust height as needed */
    overflow: auto; /* Enable vertical scrolling if needed */
    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    transition: background-color 0.3s, color 0.3s;

    @media (max-width: 991px) {
        min-height: 60vh; /* Adjust height for smaller screens */
    }
`;

export const EventsContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid ${({ darkMode }) => (darkMode ? "#555555" : "#ccc")};
    border-radius: 8px;
    overflow-y: auto; /* Enable vertical scrolling */
    max-height: 400px; /* Limit height for smaller screens */
    min-height: 20vh;
    background-color: ${({ darkMode }) => (darkMode ? "#2D2D2D" : "#fff")};
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
font-size: ${({ fontSize }) => fontSize};
    @media (max-width: 991px) {
        overflow-y: auto; /* Enable vertical scrolling */
        max-height: 400px; /* Limit height for smaller screens */
        min-height: 20vh;
    }
`;

export const EventsHeader = styled.h2`
    font-size: ${({ fontSize }) => calculateFontSize(24, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    margin-bottom: 20px;
    transition: color 0.3s;
`;

export const Event = styled.div`
    background-color: ${({ darkMode }) => (darkMode ? "#3C3C3C" : "#ffffff")};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    padding: 16px;
    margin-bottom: 16px;
    position: relative; /* Ensure relative positioning for absolute children */
    transition: box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s;
    font-size: ${({ fontSize }) => fontSize};

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-5px);
    }
`;

export const NoEventsMessage = styled.p`
    font-size: ${({ fontSize }) => calculateFontSize(18, fontSize)};
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#6b538c")};
    margin-top: 20px;
    transition: color 0.3s;
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
        background-color: ${({ darkMode }) => (darkMode ? "#FF4C4C" : "darkred")};
    }
`;
