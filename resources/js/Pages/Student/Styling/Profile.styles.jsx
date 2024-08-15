import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
`;

export const ProfileContainer = styled.div`
    width: 65%; /* Adjusted to take up 70% of the width */
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    @media (max-width: 768px) {
        width: 100%;
    }

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const RightContainer = styled.div`
    width: 35%; /* Adjusted to take up 30% of the width */
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    @media (max-width: 768px) {
        width: 100%;
    }

    &:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }
`;
