import * as React from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { Link } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateJobFormData,
    selectJobFormData,
} from "@/Features/jobs/jobsSlice";
import { Inertia } from "@inertiajs/inertia";
import {
    Container,
    Card,
    FormWrapper,
    Title,
    Subtitle,
    Form,
    SectionTitle,
    FormRow,
    FormField,
    Label,
    Input,
    Select,
    HorizontalRule,
    SubmitButton,
    BackButton,
    ButtonContainerPost,
} from "./Styling/Post1.styles";

function Post1() {
    const dispatch = useDispatch();
    const jobFormData = useSelector(selectJobFormData);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));
    };

    return (
        <NavBar header={"Posting Jobs"}>
            <Container darkMode={darkMode} fontSize={fontSize}>
                <Card darkMode={darkMode} fontSize={fontSize}>
                    <FormWrapper darkMode={darkMode} fontSize={fontSize}>
                        <Title darkMode={darkMode} fontSize={fontSize}>Create a New Posting</Title>
                        <Subtitle darkMode={darkMode} fontSize={fontSize}>
                            Hire amazing students through CO-OP Connect!
                        </Subtitle>
                        <Form darkMode={darkMode} fontSize={fontSize}>
                            <SectionTitle darkMode={darkMode} fontSize={fontSize}>
                                Part 1 of 2: Basic Posting Information
                            </SectionTitle>
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="jobTitle">
                                        Job Title *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="title"
                                        name="title"
                                        aria-label="Job Title"
                                        value={jobFormData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="companyName">
                                        Company *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="company"
                                        name="company"
                                        aria-label="Company Name"
                                        value={jobFormData.company}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <FormRow darkMode={darkMode} fontSize={fontSize}>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label  darkMode={darkMode} fontSize={fontSize} htmlFor="workplaceType">
                                        Workplace Type *
                                    </Label>
                                    <Select darkMode={darkMode} fontSize={fontSize}
                                        id="jobType"
                                        name="jobType"
                                        aria-label="Workplace Type"
                                        value={jobFormData.jobType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Onsite">Onsite</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </Select>
                                </FormField>
                                <FormField darkMode={darkMode} fontSize={fontSize}>
                                    <Label darkMode={darkMode} fontSize={fontSize} htmlFor="jobLocation">
                                        Job Location *
                                    </Label>
                                    <Input darkMode={darkMode} fontSize={fontSize}
                                        type="text"
                                        id="location"
                                        name="location"
                                        aria-label="Job Location"
                                        value={jobFormData.location}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <HorizontalRule darkMode={darkMode} fontSize={fontSize} />
                            <ButtonContainerPost darkMode={darkMode} fontSize={fontSize}>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/home">
                                    <BackButton darkMode={darkMode} fontSize={fontSize} tabIndex="0">
                                        Go Back
                                    </BackButton>
                                </Link>
                                <Link darkMode={darkMode} fontSize={fontSize} href="/employer/post2">
                                    <SubmitButton darkMode={darkMode} fontSize={fontSize} tabIndex="0">
                                        Continue
                                    </SubmitButton>
                                </Link>
                            </ButtonContainerPost>
                        </Form>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}

export default Post1;
