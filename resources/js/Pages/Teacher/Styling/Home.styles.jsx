import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
    align-self: stretch;
    width: 100%; /* Ensure MainContainer takes up full width */
`

export const TopContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    width: 100%; /* Ensure TopContainer takes up full width */
`

export const BottomContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    width: 100%; /* Ensure BottomContainer takes up full width */
`

export const StudentsSectionContainer = styled.div`
    flex: 1; /* Allow StudentsSectionContainer to grow and fill available space */
`

export const AdminPanelContainer = styled.div`
    flex: 1; /* Allow AdminPanelContainer to grow and fill available space */
`

