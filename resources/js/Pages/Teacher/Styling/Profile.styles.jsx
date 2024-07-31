import { keyframes, styled } from "styled-components";
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;


export const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const Main = styled.main`
align-items: center;
border-radius: 10px;
box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
background-color: #fff;
display: flex;
justify-content: center;
padding: 20px;
animation: ${fadeIn} 0.8s ease-in-out;
&:hover {
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

    }
`;

export const Section = styled.section`
display: flex;
width: 600px;
max-width: 100%;
flex-direction: column;
`;

export const Title = styled.h1`
color: #6b538c;
text-decoration: underline;
align-self: center;
font: 600 32px Poppins, sans-serif;
`;

export const ProfileWrapper = styled.div`
margin-top: 40px;
@media (max-width: 991px) {
    max-width: 100%;
}
`;

export const ProfileDetails = styled.div`
gap: 20px;
display: flex;
@media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
}
`;

export const ProfileImageWrapper = styled.figure`
display: flex;
flex-direction: column;
line-height: normal;
width: 26%;
margin: 0 auto;
@media (max-width: 991px) {
    width: 100%;
    margin-top: 20px;
}
`;
export const ProfileImage = styled.img`
justify-content: center;
align-items: center;
border-radius: 10px;
border: 2px solid rgba(45, 54, 72, 1);
background-color: #edf0f7;
display: block;
transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }





@media (max-width: 991px) {
    padding: 0 20px;
}
`;

export const ClearProfileButton = styled.button`
justify-content: center;
border-radius: 12px;
background: linear-gradient(135deg, #6b538c, #a97bbf);
align-self: start;
margin-top: 20px;
color: #fff;
letter-spacing: 0.5px;
padding: 8px 16px;
font-weight: 700;
font-size: 16px;
line-height: 150%;
font-family: Roboto, sans-serif;
border: none;
cursor: pointer;
transition: background 0.3s ease, transform 0.2s ease;

&:hover {
    background: linear-gradient(135deg, #543b6f, #8e6aae);
    transform: scale(1.05);
}
`;

export const BioSection = styled.div`
display: flex;
flex-direction: column;
width: 74%;
margin-left: 20px;
@media (max-width: 991px) {
    width: 100%;
}
`;

export const BioTitle = styled.h2`
color: #2d3648;
letter-spacing: 0.1px;
font: 500 14px Poppins, sans-serif;
@media (max-width: 991px) {
    max-width: 100%;
}
`;

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
`;

export const BioLine = styled.div`
border-radius: 3px;
background-color: #260e44;
height: 16px;
`;

export const BioLineGroup = styled.div`
display: flex;
margin-top: 8px;
padding-right: 80px;
@media (max-width: 991px) {
    padding-right: 20px;
}
`;

export const SmallBioLine = styled.div`
border-radius: 3px;
background-color: #260e44;
height: 16px;
flex: 1;
`;

export const FieldTitle = styled.h2`
color: #6b538c;
letter-spacing: 0.1px;
margin-top: 20px;
font: 500 14px Poppins, sans-serif;
@media (max-width: 991px) {
    max-width: 100%;
}
`;

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
transition: border-color 0.3s ease, background-color 0.3s ease;

    &:hover {
        border-color: #6b538c;
        background-color: #f3e8ff;
    }
@media (max-width: 991px) {
    max-width: 100%;
    padding-right: 20px;
}
`;

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
transition: background-color 0.3s ease, transform 0.3s ease;

&:hover {
    background-color: #5a4376;
    transform: scale(1.03);
    cursor: pointer;
}
`;

export const SuccessMessage = styled.div`
color: green;
margin-top: 10px;
font: 500 14px Poppins, sans-serif;
`;

export const DropzoneContainer = styled.div`
border: 2px dashed #6b538c;
border-radius: 10px;
padding: 20px;
text-align: center;
color: #6b538c;
font-family: Poppins, sans-serif;
font-size: 14px;
font-weight: 500;
letter-spacing: 0.1px;
cursor: pointer;
transition: background-color 0.2s ease-in-out;

&:hover {
    background-color: #f3e8ff;
}
`;

export const SuggestionsList = styled.ul`

    border: 1px solid #ccc;
    background-color: #fff;
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
    width: 100%;
`;

export const SuggestionItem = styled.li`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
