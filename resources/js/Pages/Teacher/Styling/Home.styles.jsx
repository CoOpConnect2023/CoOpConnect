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


  @media (max-width: 991px) {

    width: 100vw;
    flex-direction: column;
    height: auto; /* Let height adjust to content */
     /* Add padding to ensure content doesn't hit the edges */
  }
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  box-sizing: border-box;
  height: 70%;
  margin: 0;


  @media (max-width: 991px) {
    flex-direction: column;
    align-self: center;
    width: 100vw;
    gap: 15px; /* Increase gap for better spacing on mobile */
    /* Add padding to prevent content overflow */
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
margin: 0;
 height: 30%;
 max-height: 30vh;
  gap: 10px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100vw;
    align-self: center;
    margin-top: 5px; /* Remove negative margin on mobile */
    gap: 10px; /* Increase gap for better spacing on mobile */
    padding: 10px; /* Add padding to prevent content overflow */
  }
`;

export const StudentsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100vw;
    align-self: center;
    padding: 10px; /* Add padding to prevent content overflow */
  }
`;

export const AdminPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 991px) {
    width: 100vw;
    align-self: center;
    padding: 10px; /* Add padding to prevent content overflow */
  }
`;
