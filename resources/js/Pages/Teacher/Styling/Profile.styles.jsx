import styled from "styled-components";

export const Main = styled.main`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding: 20px;
`

export const Section = styled.section`
    display: flex;
    width: 600px;
    max-width: 100%;
    flex-direction: column;
`

export const Title = styled.h1`
    color: #6b538c;
    text-decoration: underline;
    align-self: center;
    font: 600 32px Poppins, sans-serif;
`

export const ProfileWrapper = styled.div`
    margin-top: 40px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const ProfileDetails = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`

export const ProfileImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 26%;
    @media (max-width: 991px) {
        width: 100%;
    }
`

export const ProfileImage = styled.img`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px solid rgba(45, 54, 72, 1);
    background-color: #edf0f7;
    display: flex;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    padding: 0 55px;
    @media (max-width: 991px) {
        margin-top: 20px;
        padding: 0 20px;
    }
`

export const BioSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
    }
`

export const BioTitle = styled.h2`
    color: #2d3648;
    letter-spacing: 0.1px;
    font: 500 14px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const BioDescription = styled.div`
    border-radius: 10px;
    border: 2px solid rgba(123, 117, 127, 1);
    background-color: #eedcff;
    display: flex;
    margin-top: 8px;
    flex-direction: column;
    padding: 12px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const BioLine = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
`

export const BioLineGroup = styled.div`
    display: flex;
    margin-top: 8px;
    padding-right: 80px;
    @media (max-width: 991px) {
        padding-right: 20px;
    }
`

export const SmallBioLine = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
    flex: 1;
`

export const FieldTitle = styled.h2`
    color: #6b538c;
    letter-spacing: 0.1px;
    margin-top: 20px;
    font: 500 14px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`

export const Input = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid rgba(38, 14, 68, 1);
    background-color: #fff7ff;
    margin-top: 8px;
    color: #7b757f;
    letter-spacing: 0.25px;
    justify-content: center;
    padding: 19px 12px;
    font: 400 14px Poppins, sans-serif;
    @media (max-width: 991px) {
        max-width: 100%;
        padding-right: 20px;
    }
`

export const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font: 700 16px Roboto, sans-serif;
`

