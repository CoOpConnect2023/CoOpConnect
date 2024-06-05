import * as React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

function ReflectionsForum() {
    return (
        <NavBar header={"Reflections Upload"}>
            <Section className="forum-container">
                <Container className="form-inner-container">
                    <FormWrapper className="form-content-wrapper">
                        <Header className="forum-header">
                            Reflections Forum
                        </Header>
                        <Description className="forum-description">
                            Share your reflections with your teachers and
                            employers!
                        </Description>
                        <FormContainer>
                            <Form>
                                <Label
                                    htmlFor="reflectionInput"
                                    className="reflection-label"
                                >
                                    Type out your reflection here:
                                </Label>
                                <TextareaWrapper
                                    className="textarea-wrapper"
                                    tabIndex="0"
                                >
                                    <Textarea
                                        id="reflectionInput"
                                        className="reflection-textarea"
                                        defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                                    />
                                    <Image
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdd149d58712b078a844655053653df9d81013ce41c2123353ace40a672efdc3?apiKey=d66532d056b14640a799069157705b77&"
                                        alt=""
                                    />
                                </TextareaWrapper>
                                <Button type="submit" className="submit-button">
                                    Post Comment
                                </Button>
                            </Form>
                        </FormContainer>
                    </FormWrapper>
                </Container>
            </Section>
        </NavBar>
    );
}

const Section = styled.section`
    align-self: stretch;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    color: var(--Schemes-On-Background, #1d1a20);
    justify-content: center;
    padding: 80px 0;
`;

const Container = styled.div`
    align-items: center;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

const FormWrapper = styled.div`
    display: flex;
    width: 840px;
    max-width: 100%;
    flex-direction: column;
`;

const Header = styled.h1`
    text-decoration-line: underline;
    align-self: center;
    font: 400 36px/122% Poppins, sans-serif;
`;

const Description = styled.p`
    margin: 10px 78px 0;
    font: 400 24px/133% Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
        margin-right: 10px;
    }
`;

const FormContainer = styled.div`
    border-radius: 10px;
    border: 2px solid rgba(123, 117, 127, 1);
    background-color: var(--Schemes-Primary-Container, #eddcff);
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    font-size: 16px;
    line-height: 150%;
    padding: 20px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-family: Poppins, sans-serif;
    font-weight: 500;
    letter-spacing: 0.15px;
    align-self: center;
`;

const TextareaWrapper = styled.div`
    border-radius: 6px;
    border: 1px solid rgba(38, 14, 68, 1);
    background-color: var(--Schemes-Background, #fff7ff);
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 20px;
    padding: 36px 12px 3px 12px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const Textarea = styled.textarea`
    font-family: Poppins, sans-serif;
    border: none;
    resize: none;
    outline: none;
    width: 100%;
    height: 100px;
    background: transparent;
`;

const Image = styled.img`
    aspect-ratio: 1.54;
    object-fit: auto;
    object-position: center;
    width: 20px;
    align-self: end;
    margin-top: 21px;
`;

const Button = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: var(--Schemes-Primary, #6b538c);
    margin-top: 20px;
    color: var(--Schemes-On-Primary, #fff);
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

export default ReflectionsForum;
