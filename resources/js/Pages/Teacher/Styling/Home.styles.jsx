import styled, { keyframes } from "styled-components";

// Define the keyframes for the slide-in animations
const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  max-width: 100%;
  margin-top: -20px;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    display: grid;
    grid-template-rows: 65% auto 35%; /* Top container 65%, gap, Bottom container 35% */
    grid-template-columns: 100%; /* Full width */
    height: 88vh; /* Fill the viewport height */
    grid-gap: 5px; /* Add a gap of 20px between the top and bottom containers */
  }

  @media (max-width: 991px) {
    grid-template-rows: auto auto; /* Allow rows to adjust to content */
    width: 100%;
    flex-direction: column;
    height: auto; /* Let height adjust to content */
  }
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  margin: 0;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    grid-row: 1 / 2; /* Position in the top row */
    height: 100%; /* Fill the allocated height */
    width: 100%; /* Full width */
  }

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
   
    gap: 15px; /* Increase gap for better spacing on mobile */
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0;
  gap: 10px;
  box-sizing: border-box;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    grid-row: 3 / 4; /* Position in the bottom row */
    height: 100%; /* Fill the allocated height */
    width: 100%; /* Full width */
  }

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
    margin-top: 10px; /* Remove negative margin on mobile */
    gap: 15px; /* Increase gap for better spacing on mobile */
  }
`;

export const StudentsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    width: 70%; /* Take up 70% of the width */
    height: 100%; /* Fill the allocated height */
  }

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
    padding: 0 10px; /* Add padding to prevent content overflow */
  }
`;

export const StatusSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    width: 30%; /* Take up 30% of the width */
    height: 100%; /* Fill the allocated height */
  }

  @media (max-width: 991px) {
    width: 100%;
    padding: 0 10px; /* Add padding to prevent content overflow */
  }
`;

export const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (min-width: 992px) { /* Apply grid layout on desktop */
    grid-column: 1 / -1; /* Span across the full width */
    width: 100%;
    height: 100%; /* Fill the allocated height */
  }

  @media (max-width: 991px) {
    width: 100%;
    padding: 0 10px; /* Add padding to prevent content overflow */
  }
`;
