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
  align-items: flex-start;

  flex-grow: 1;

   /* Optional: Add padding for spacing */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
   /* Ensure it stretches to the full height of the viewport */
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  max-height: 70%; /* Limit the height to 65% of the viewport */
  flex-grow: 1;
  /* Allow scrolling if content overflows */

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  align-self: stretch;
  width: 100%;
   /* Limit the height to 35% of the viewport */
  height: 30%;

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
    height: 100%;
  }
`;

export const StudentsSectionContainer = styled.div`

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto; /* Ensure content inside can scroll if it overflows */

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`;

export const AdminPanelContainer = styled.div`

  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Ensure content inside can scroll if it overflows */
`;
