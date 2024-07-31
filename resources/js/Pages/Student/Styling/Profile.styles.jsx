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
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    @media (max-width: 768px) {
        min-width: 100%;
    }

     &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    }
`;

export const RightContainer = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    @media (max-width: 768px) {
        min-width: 100%;
    }

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    }
`;

