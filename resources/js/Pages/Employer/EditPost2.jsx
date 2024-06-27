import * as React from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import downarrow from "@/Pages/Images/Icon.svg";
import {
    Container,
    Card,
    FormWrapper,
    Title,
    Subtitle,
    FormContainer,
    Form,
    SectionTitle,
    SectionHeading,
    SectionDescription,
    InputField,
    ProgressBar,
    ProgressItem,
    StyledInput,
    Tag,
    TagName,
    TagIcon,
    TagContainer,
    Label,
    HorizontalRule,
    ButtonGroup,
    ActionButton,
    SubmitButton,
} from "./Styling/EditPost2.styles";

function EditPost2() {
    const skills = ["Tag", "Tag", "Tag", "Tag", "Tag", "Tag", "Tag"];
    return (
        <NavBar header={"Edit Postings"}>
            <Container>
                <Card>
                    <FormWrapper>
                        <Title>Edit Your Posting</Title>
                        <Subtitle>
                            Edit your selected posting's information.
                        </Subtitle>
                        <FormContainer>
                            <SectionTitle>
                                Part 2 of 2: Job Details
                            </SectionTitle>
                            <SectionHeading>
                                Add a Job Description
                            </SectionHeading>
                            <SectionDescription>
                                Describe the contents of the job. Include
                                details about the daily tasks, requirements, and
                                expectations.
                            </SectionDescription>
                            <Form>
                                <InputField />
                                <InputField />
                                <ProgressBar>
                                    <ProgressItem />
                                    <ProgressItem />
                                </ProgressBar>
                            </Form>
                            <HorizontalRule />
                            <SectionHeading>Add Skills</SectionHeading>
                            <SectionDescription>
                                Add some skill keywords to the job.
                            </SectionDescription>
                            <Label htmlFor="skillInput">Skill to add</Label>
                            <StyledInput id="skillInput" />
                            <TagContainer>
                                {skills.map((skill, index) => (
                                    <Tag key={index}>
                                        <TagName>{skill}</TagName>
                                        <TagIcon
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4297c66e6d9622e462ebb187a46dd67cf9ee2c5dfcfd5088583249a1e3bfc3e?apiKey=d66532d056b14640a799069157705b77&"
                                            alt={`${skill} Icon`}
                                        />
                                    </Tag>
                                ))}
                            </TagContainer>
                            <HorizontalRule />
                            <ButtonGroup>
                                <ActionButton>Go Back</ActionButton>
                                <SubmitButton>Finished</SubmitButton>
                            </ButtonGroup>
                        </FormContainer>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}

export default EditPost2;
