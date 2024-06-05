import * as React from "react";
import styled from "styled-components";

function SettingsPanel() {
    return (
        <Main>
            <Section className="account-section">
                <AccountHeader>
                    <AccountTitle>Account</AccountTitle>
                    <AccountDetail>Password</AccountDetail>
                    <AccountDetail>Password</AccountDetail>
                    <AccountDetail>Password</AccountDetail>
                </AccountHeader>
                <FormSection>
                    <FormColumn>
                        <FormContent>
                            <FormTitle>Delete Account</FormTitle>
                            <FormDetail>
                                Delete your account from the CO-OP Connect
                                platform permanently. This will remove access to
                                the account. Your account information will also
                                be deleted.
                            </FormDetail>
                        </FormContent>
                    </FormColumn>
                    <FormButtonColumn>
                        <DeleteButton>Delete Account</DeleteButton>
                    </FormButtonColumn>
                </FormSection>
            </Section>
            <SettingsSection>
                <SettingsHeader>
                    <SettingsColumn>
                        <SettingsContent>
                            <SettingsTitle>Profile Privacy</SettingsTitle>
                            <SettingsDetail>
                                Anyone can find and view the contents of your
                                profile. Your profile will be viewable from job
                                postings and search functions.
                            </SettingsDetail>
                        </SettingsContent>
                    </SettingsColumn>
                    <SettingsControls>
                        <CurrentSelection>
                            Currently Selected: Private
                        </CurrentSelection>
                        <SettingsOptions>
                            <OptionButton className="private">
                                Private
                            </OptionButton>
                            <OptionButton>Public</OptionButton>
                        </SettingsOptions>
                    </SettingsControls>
                </SettingsHeader>
            </SettingsSection>
            <DummySection>
                <DummyHeader>
                    <DummyColumn>
                        <DummyContent>
                            <DummyTitle>Dummy Container</DummyTitle>
                            <DummyDetail>
                                Lorem ipsum is a placeholder text commonly used
                                to demonstrate the visual form of a document or
                                a typeface without relying on meaningful
                                content.
                            </DummyDetail>
                        </DummyContent>
                    </DummyColumn>
                    <DummyButtonColumn>
                        <SettingsButton>Settings Button</SettingsButton>
                    </DummyButtonColumn>
                </DummyHeader>
            </DummySection>
            <DummySection>
                <DummyHeader>
                    <DummyColumn>
                        <DummyContent>
                            <DummyTitle>Dummy Container</DummyTitle>
                            <DummyDetail>
                                Lorem ipsum is a placeholder text commonly used
                                to demonstrate the visual form of a document or
                                a typeface without relying on meaningful
                                content.
                            </DummyDetail>
                        </DummyContent>
                    </DummyColumn>
                    <DummyButtonColumn>
                        <SettingsButton>Settings Button</SettingsButton>
                    </DummyButtonColumn>
                </DummyHeader>
            </DummySection>
        </Main>
    );
}

const Main = styled.main`
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    max-width: 885px;
    flex-direction: column;
    padding: 20px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    border-color: rgba(123, 117, 127, 1);
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const FormSection = styled.section`
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    margin-top: 40px;
    padding: 20px;
    display: flex;
    gap: 20px;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const AccountHeader = styled.header`
    align-items: center;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 1);
    align-self: center;
    display: flex;
    width: 494px;
    max-width: 100%;
    gap: 20px;
    font-size: 14px;
    color: #334155;
    font-weight: 500;
    line-height: 143%;
    justify-content: space-between;
    padding: 5px 10px;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const AccountTitle = styled.div`
    font-family: Inter, sans-serif;
    border-bottom: 2px solid rgba(107, 83, 140, 1);
    background-color: #fff;
    align-self: stretch;
    color: #0f172a;
    justify-content: center;
    padding: 6px 20px;
    @media (max-width: 991px) {
        white-space: normal;
    }
`;

const AccountDetail = styled.div`
    font-family: Inter, sans-serif;
    align-self: stretch;
    margin: auto 0;
`;

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 77%;
    margin-left: 0;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const FormContent = styled.article`
    display: flex;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const FormTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const FormDetail = styled.p`
    color: #7b757f;
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 600 14px/20px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const FormButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 23%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const DeleteButton = styled.button`
    justify-content: center;
    border-radius: 6px;
    background-color: #e53e3e;
    align-self: stretch;
    color: #fff;
    width: 100%;
    margin: auto 0;
    padding: 8px 16px;
    font: 600 16px/150% Inter, sans-serif;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

const SettingsSection = styled.section`
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    margin-top: 20px;
    padding: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SettingsHeader = styled.header`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const SettingsColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-left: 0;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const SettingsContent = styled.article`
    display: flex;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const SettingsTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SettingsDetail = styled.p`
    color: #7b757f;
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 600 14px/20px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SettingsControls = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const CurrentSelection = styled.div`
    color: #7b757f;
    letter-spacing: 0.4px;
    font: 600 12px/133% Poppins, sans-serif;
`;

const SettingsOptions = styled.div`
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 1);
    background-color: #fff;
    display: flex;
    margin-top: 10px;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 143%;
    justify-content: space-between;
    padding: 5px 10px;
    @media (max-width: 991px) {
        white-space: normal;
    }
`;

const OptionButton = styled.button`
    font-family: Inter, sans-serif;
    border-radius: 3px;
    background-color: ${(props) =>
        props.className === "private" ? "#6b538c" : "transparent"};
    color: ${(props) => (props.className === "private" ? "#fff" : "#334155")};
    justify-content: center;
    padding: 6px 12px;
    @media (max-width: 991px) {
        white-space: normal;
    }
`;

const DummySection = styled.section`
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    margin-top: 20px;
    padding: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const DummyHeader = styled.header`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const DummyColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const DummyContent = styled.article`
    display: flex;
    flex-direction: column;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-top: 40px;
    }
`;

const DummyTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const DummyDetail = styled.p`
    color: #7b757f;
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 600 14px/20px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const DummyButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 23%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const SettingsButton = styled.button`
    justify-content: center;
    border-radius: 6px;
    background-color: #6b538c;
    align-self: stretch;
    color: #fff;
    width: 100%;
    margin: auto 0;
    padding: 8px 16px;
    font: 600 16px/150% Inter, sans-serif;
    @media (max-width: 991px) {
        margin-top: 40px;
    }
`;

export default SettingsPanel;
