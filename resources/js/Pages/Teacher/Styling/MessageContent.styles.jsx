import styled from "styled-components";






export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px; /* Reduced margin */
    align-items: ${({ isCurrentUser }) =>
        isCurrentUser ? "flex-end" : "flex-start"};
`;

export const Message = styled.div`
    border-radius: ${({ isCurrentUser }) =>
        isCurrentUser ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
    background-color: ${({ isCurrentUser }) =>
        isCurrentUser ? "#6b538c" : "#7c4e7e"};
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/150% Poppins, sans-serif;
    margin-top: 5px; /* Reduced margin */
    width: fit-content;

`;

export const Timestamp = styled.div`
    color: ${({ darkMode }) => (darkMode ? "#EDDCFF" : "#773dc3")};

    margin-top: 5px;
    font: 12px/133% Poppins, sans-serif;
    width: fit-content;
    margin-bottom: 5px; /* Reduced margin */
`;
