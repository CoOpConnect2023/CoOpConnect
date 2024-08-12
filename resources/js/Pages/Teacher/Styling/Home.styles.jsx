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
  gap: 10px;
  flex: 1 1 auto; /* Allow the container to grow */
  width: 100%;
  /* Ensure it stretches to the full height of the viewport */
  padding: 5px; /* Optional: Add padding for spacing */
  box-sizing: border-box; /* Ensure padding doesn't affect width */
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  width: 100%;


  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  width: 100%;


  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`;

export const StudentsSectionContainer = styled.div`
  flex: 1;
  

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`;

export const AdminPanelContainer = styled.div`
  flex: 1;
`;
