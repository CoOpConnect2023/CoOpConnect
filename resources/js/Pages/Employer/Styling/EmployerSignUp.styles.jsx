import styled from "styled-components";

export const MainContainer = styled.main`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;http://127.0.0.1:8000/profile/edit
    min-height: 100vh;http://127.0.0.1:8000/profile/edit
`

export const StyledSection = styled.section`
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(123, 117, 127, 1);
    align-self: center;http://127.0.0.1:8000/profile/edit
    display: flex;
    margin-top: 40px;http://127.0.0.1:8000/profile/edit
    width: 734px;
    max-width: 100%;
    flex-direction: column;
    font-size: 14px;
    color: var(--Schemes-Primary, #6b538c);
    font-weight: 500;
    line-height: 143%;
    padding: 20px;
`

export const Title = styled.h1`
    color: #000;
    text-decoration: underline;
    font: 400 36px/122% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const Description = styled.p`
    color: #000;
    letter-spacing: 0.15px;
    margin-top: 10px;
    font: 16px/150% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    &:first-of-type {
        margin-top: 40px;
    }
`

export const FormLabel = styled.label`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.1px;
`

export const FormInput = styled.input`
    border-radius: 6px;
    border: 2px solid rgba(38, 14, 68, 1);
    background-color: var(--Schemes-Background, #fff7ff);
    margin-top: 8px;
    height: 48px;
    padding: 0 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const HelpText = styled.span`
    color: var(--WF-Base-600, #717d96);
    font-feature-settings: "calt" off;
    font-family: Inter, sans-serif;
    font-weight: 400;
    line-height: 114%;
    letter-spacing: -0.14px;
    margin-top: 10px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const FormButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background-color: var(--Schemes-Primary, #6b538c);
    align-self: start;
    margin-top: 20px;
    color: var(--Schemes-On-Primary, #fff);
    white-space: nowrap;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font: 700 16px/150% Roboto, sans-serif;
    cursor: pointer;

    @media (max-width: 991px) {
        white-space: initial;
    }
`

