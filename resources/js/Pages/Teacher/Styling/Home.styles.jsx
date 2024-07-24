import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    width: 100%;
    
`

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
`

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
`

export const StudentsSectionContainer = styled.div`
    flex: 1;

    @media (max-width: 991px) {
   flex-direction: column;
    width: 100%; /* Ensure it takes the full width */
  }
`

export const AdminPanelContainer = styled.div`
    flex: 1;
`

