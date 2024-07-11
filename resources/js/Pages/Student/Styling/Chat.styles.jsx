import styled from "styled-components";






export const MainContainer = styled.div`
    justify-content: center;
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    padding: 20px;
`;

export const Content = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 36%;
    margin-left: 0;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const LeftColumn = styled.div`
    align-self: stretch;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

export const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 64%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`;

export const RightColumn = styled.div`
    border-radius: 10px;
    border: 1px solid rgba(123, 117, 127, 1);
    background-color: #fff7ff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

export const MessageContainer = styled.div`
    height: 60vh;
    @media (max-width: 991px) {
        height: auto;
        max-height: 60vh;
    }
`;

export const ScrollableContainer = styled.div`
    overflow-y: auto;
    @media (max-width: 991px) {
        max-height: 60vh;
        overflow-y: auto;
    }
`;
