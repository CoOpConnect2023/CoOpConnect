import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;

export const ProfileContainer = styled.div`
    flex: 1;
    min-width: 300px;

    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

export const RightContainer = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

