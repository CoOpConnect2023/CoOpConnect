import styled from "styled-components";


export const Main = styled.main`
    align-self: stretch;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    max-width: 885px;

    @media (max-width: 991px) {
        padding: 10px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    border-color: rgba(123, 117, 127, 1);

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const FormSection = styled.section`
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

export const AccountHeader = styled.header`
    align-items: center;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 1);
    align-self: center;
    display: flex;
    width: 100%;
    max-width: 494px;
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

export const AccountTitle = styled.div`
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

export const AccountDetail = styled.div`
    font-family: Inter, sans-serif;
    align-self: stretch;
    margin: auto 0;
    cursor: pointer;
    border-bottom: ${props => props.active ? '2px solid rgba(107, 83, 140, 1)' : 'none'};
`;

export const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 77%;
    margin-left: 0;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const FormContent = styled.article`
    display: flex;
    flex-direction: column;

    @media (max-width: 991px) {
        margin-top: 20px;
    }
`;

export const FormTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const FormDetail = styled.p`
    color: #7b757f;
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 600 14px/20px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const FormButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 23%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`;

export const DeleteButton = styled.button`
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
        margin-top: 20px;
    }
`;

export const SettingsSection = styled.section`
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    margin-top: 20px;
    padding: 20px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SettingsHeader = styled.header`
    gap: 20px;
    display: flex;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const SettingsColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-left: 0;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const SettingsContent = styled.article`
    display: flex;
    flex-direction: column;

    @media (max-width: 991px) {
        margin-top: 20px;
    }
`;

export const SettingsTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SettingsDetail = styled.p`
    color: #7b757f;
    letter-spacing: 0.25px;
    margin-top: 10px;
    font: 600 14px/20px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SettingsControls = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`;

export const CurrentSelection = styled.div`
    text-align: center;
    color: #7b757f;
    letter-spacing: 0.4px;
    font: 600 12px/133% Poppins, sans-serif;
`;

export const SettingsOptions = styled.div`
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
        flex-wrap: wrap;
    }
`;

export const OptionButton = styled.button`
    font-family: Inter, sans-serif;
    border-radius: 3px;
    background-color: ${(props) =>
        props.className === "private" || props.className === "public" ? "#6b538c" : "transparent"};
    color: ${(props) => (props.className === "private" || props.className === "public" ? "#fff" : "#334155")};
    justify-content: center;
    padding: 6px 12px;
    cursor: pointer;

    @media (max-width: 991px) {
        white-space: normal;
    }
`;


export const DummySection = styled.section`
    border-color: rgba(123, 117, 127, 1);
    border-style: solid;
    border-bottom-width: 1px;
    padding: 20px;
    display: flex;
    margin-top: 20px;
    gap: 20px;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

export const SettingsButton = styled.button`
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
        margin-top: 20px;
    }
`;

export const PasswordChangeForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

export const FormField = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 14px;
    color: #334155;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4a90e2;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    align-self: flex-start;

    &:hover {
        background-color: #357abd;
    }
`;

export const Message = styled.p`
    color: ${props => props.error ? 'red' : 'green'};
    font-size: 14px;
`;
