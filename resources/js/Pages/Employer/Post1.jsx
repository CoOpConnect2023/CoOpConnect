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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateJobFormData({ [name]: value }));
    };

    return (
        <NavBar header={"Posting Jobs"}>
            <Container>
                <Card>
                    <FormWrapper>
                        <Title>Create a New Posting</Title>
                        <Subtitle>
                            Hire amazing students through CO-OP Connect!
                        </Subtitle>
                        <Form>
                            <SectionTitle>
                                Part 1 of 2: Basic Posting Information
                            </SectionTitle>
                            <FormRow>
                                <FormField>
                                    <Label htmlFor="jobTitle">
                                        Job Title *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        name="title"
                                        aria-label="Job Title"
                                        value={jobFormData.title}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                                <FormField>
                                    <Label htmlFor="companyName">
                                        Company *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        name="company"
                                        aria-label="Company Name"
                                        value={jobFormData.company}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField>
                                    <Label htmlFor="workplaceType">
                                        Workplace Type *
                                    </Label>
                                    <Select
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
                                <FormField>
                                    <Label htmlFor="jobLocation">
                                        Job Location *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="location"
                                        name="location"
                                        aria-label="Job Location"
                                        value={jobFormData.location}
                                        onChange={handleInputChange}
                                    />
                                </FormField>
                            </FormRow>
                            <HorizontalRule />
                            <ButtonContainerPost>
                                <Link href="/employer/home">
                                    <BackButton tabIndex="0">
                                        Go Back
                                    </BackButton>
                                </Link>
                                <Link href="/employer/post2">
                                    <SubmitButton tabIndex="0">
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
