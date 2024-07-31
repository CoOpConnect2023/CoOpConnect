import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    animation: ${fadeIn} 0.8s ease-in-out;
`

export const Content = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 991px) {
        flex-direction: column;
    }
`

export const FileSection = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-self: stretch;
    flex: 1 0 0;
    padding: 20px 0px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    @media (max-width: 991px) {
        padding: 0;
        width: 100%;
    }
`

export const SectionHeader = styled.header`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
`

export const TabList = styled.nav`
    display: flex;
    justify-content: space-between;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`

export const TabItem = styled.div`
    padding: 6px 20px;
    position: relative;
    &.active {
        border-bottom: 2px solid #6b538c;
        color: #0f172a;
    }
`

export const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 80px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`

export const FileContainer = styled.article`
    display: flex;
    gap: 10px;
    padding: 20px 10px;
    border: 1px solid #7b757f;
    border-radius: 10px;
    transition: transform 0.5s ease;

    &:hover {

        transform: scale(1.01);
    }
    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`

export const FileIcons = styled.div`
    display: flex;
    gap: 20px;
    border-right: 1px solid #7b757f;
    padding-right: 10px;
`

export const FileDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
`

export const FileTitle = styled.h2`
    font-weight: 500;
    font-size: 14px;
    color: #000;
`

export const FileSize = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #7b757f;
`

export const FileActions = styled.div`
    display: flex;
    gap: 10px;
    align-self: end;
`

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: ${({ outline }) => (outline ? "transparent" : "#6b538c")};
    color: ${({ outline }) => (outline ? "#6b538c" : "#fff")};
    border: ${({ outline }) => (outline ? "1px solid #6b538c" : "none")};
    transition:  transform 0.5s ease;

    &:hover {

        transform: scale(1.05);
    }

    img {
        width: 14px;
    }

    @media (max-width: 991px) {
        font-size: 12px;
        padding: 4px 8px;
    }
`

export const FormSection = styled.section`
    width: 28%;
    margin-left: 20px;
    @media (max-width: 991px) {
        margin-left: 0;
        width: 100%;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 0 auto;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: #7b757f;
`

export const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
    color: #6b538c;
`

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-top: 20px;
`

export const Input = styled.input`
    height: 48px;
    margin-top: 8px;
    border: 2px solid #7b757f;
    border-radius: 6px;
    background: #fff;
`

export const FileDropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 22px 40px;
    margin-top: 10px;
    border: 2px dashed #6b538c;
    border-radius: 10px;
    background-color: #eddcff;
    font-size: 16px;
    font-weight: 600;
    color: #6b538c;
    @media (max-width: 991px) {
        padding: 20px;
    }
`

export const DropText = styled.p`
    margin-top: 10px;
`

export const FileTypes = styled.p`
    margin-top: 10px;
    font-size: 10px;
    font-weight: 400;
`

export const SecurityNote = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
    margin-top: 10px;
`

export const SubmitButton = styled.button`
    align-self: center;
    margin-top: 40px;
    padding: 10px 24px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    background: #6b538c;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.5s ease;

    &:hover {

        transform: scale(1.04);
    }

    @media (max-width: 991px) {
        padding: 20px;
    }
`

export const DropZoneWrapper = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`

export const DropZoneContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
    }
`

export const DropZone = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px dashed rgba(107, 83, 140, 1);
    background-color: #eddcff;
    font-size: 23px;
    color: #000;
    line-height: 40px;
    padding: 40px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`

export const DropZoneText = styled.div`
    font-family: Poppins, sans-serif;
    margin-top: 10px;
    @media (max-width: 991px) {
        margin: 0 8px;
    }
`

export const DropZoneDescription = styled.p`
    color: #6b538c;
    align-self: center;
    margin-top: 10px;
    font: bold 28px Poppins, sans-serif;
`

export const PreviewImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
`

