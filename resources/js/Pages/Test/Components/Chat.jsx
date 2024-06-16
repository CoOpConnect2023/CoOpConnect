import * as React from "react";
import styled from "styled-components";
import SidePanel from "./SidePanel";
import NewMessage from "./NewMessage";
import TypeMessage from "./TypeMessage";
import UserPanel from "./UserPanel";
import MessageContent from "./MessageContent";

export default function Chat() {
    return (
        <MainContainer>
            <Content>
                <Column>
                    <LeftColumn>
                        <NewMessage />
                        <SidePanel />
                    </LeftColumn>
                </Column>
                <Column2>
                    <RightColumn>
                        <UserPanel />
                        <MessageContent/>
                        <TypeMessage />
                    </RightColumn>
                </Column2>
            </Content>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    justify-content: center;
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    padding: 20px;
`;

const Content = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 36%;
    margin-left: 0px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const LeftColumn = styled.div`
    align-self: stretch;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 64%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const RightColumn = styled.div`
    border-radius: 10px;
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-width: 1px;
    background-color: #fff7ff;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const Div78 = styled.div`
    margin-top: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Div79 = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0px;
    }
`;

const Column3 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 50%;
    margin-left: 0px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const Div80 = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0.5px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Div81 = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Div82 = styled.div`
    border-radius: 0px 10px 10px 10px;
    background-color: var(--Schemes-Primary, #6b538c);
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/150% Poppins, sans-serif;
    margin-top: 10px;
`;

const Div83 = styled.div`
    color: #000;
    margin-top: 10px;
    font: 12px/133% Poppins, sans-serif;
`;

const Div84 = styled.div`
    display: flex;
    margin-top: 134px;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    line-height: 150%;
    padding: 10px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Column4 = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 50%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const Div88 = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin: auto 0;
    padding: 10px;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const Div89 = styled.div`
    max-width: 350px;
    border-radius: 10px 0px 10px 10px;
    background-color: var(--Schemes-Tertiary, #7c4e7e);
    color: #fff;
    justify-content: center;
    padding: 10px;
    font: 16px/24px Poppins, sans-serif;
    margin-top: 10px;
`;

const Div90 = styled.div`
    color: #000;
    align-self: end;
    margin-top: 10px;
    font: 12px/133% Poppins, sans-serif;
`;

const Div91 = styled.div`
    align-items: end;
    align-self: end;
    display: flex;
    margin-top: 10px;
    width: 370px;
    max-width: 100%;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px;
`;

const Div95 = styled.div`
    display: flex;
    margin-top: 10px;
    width: 249px;
    max-width: 100%;
    flex-direction: column;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 10px;
`;
