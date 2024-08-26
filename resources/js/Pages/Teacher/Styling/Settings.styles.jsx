import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    gap: 20px;
    flex: 1;

     @media (max-width: 768px) {
        flex-direction: column;


        gap: 10px;
        min-height: 80vh;

    }
`

