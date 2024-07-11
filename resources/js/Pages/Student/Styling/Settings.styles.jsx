import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    gap: 20px;
    flex: 1 0 0;
    justify-content: center;
     @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`

