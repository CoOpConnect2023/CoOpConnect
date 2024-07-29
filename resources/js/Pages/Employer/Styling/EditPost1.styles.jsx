import styled from "styled-components";
import downarrow from "@/Pages/Images/Icon.svg";

export const Container = styled.section`
    align-self: stretch;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const Card = styled.article`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: var(--White, #fff);
    display: flex;
    justify-content: center;
    padding: 20px 10px;
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export const FormWrapper = styled.div`
    display: flex;
    margin-bottom: 257px;
    width: 720px;
    max-width: 100%;
    flex-direction: column;
    @media (max-width: 991px) {
        margin-bottom: 40px;
    }
`;

export const Title = styled.h1`
    color: var(--Schemes-Primary, #6b538c);
    align-self: center;
    font: 600 32px Poppins, sans-serif;
`;

export const Subtitle = styled.p`
    color: var(--Schemes-Outline, #7b757f);
    margin: 10px 68px 0;
    font: 500 24px/133% Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

export const Form = styled.form`
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 1);
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    color: var(--WF-Base-800, #2d3648);
    padding: 20px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const SectionTitle = styled.h2`
    color: #000;
    font: 400 32px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const FormRow = styled.div`
    display: flex;
    gap: 20px;
    margin: 20px 20px 0 0;
    @media (max-width: 991px) {
        margin-right: 10px;
        flex-wrap: wrap;
    }
`;

export const FormField = styled.div`
    display: flex;
    width: 320px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
`;

export const Label = styled.label`
    font-feature-settings: "calt" off;
    letter-spacing: -0.14px;
    font: 600 14px/114% Inter, sans-serif;
`;

export const Input = styled.input`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid var(--WF-Base-400, #cbd2e0);
    background: var(--WF-Base-White, #fff);
`;

export const Select = styled.select`
    display: flex;
    height: 48px;
    padding: 12px 44px 12px 12px;
    align-items: center;
    align-self: stretch;
    border-radius: 6px;
    border: 2px solid var(--WF-Base-400, #cbd2e0);
    background: var(--WF-Base-White, #fff);
    appearance: none;
    background-image: url(${downarrow});
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 24px;
`;

export const HorizontalRule = styled.hr`
    border: 1px solid rgba(0, 0, 0, 1);
    background-color: #000;
    margin-top: 19px;
    height: 1px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
`;

export const ActionButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border: 2px solid rgba(107, 83, 140, 1);
    border-radius: 12px;
    color: var(--Schemes-Primary, #6b538c);
    padding: 8px 16px;
    background: none;
`;

export const SubmitButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: var(--Schemes-Primary, #6b538c);
    color: var(--Schemes-On-Primary, #fff);
    white-space: nowrap;
    padding: 8px 16px;
    @media (max-width: 991px) {
        white-space: initial;
    }
`;
