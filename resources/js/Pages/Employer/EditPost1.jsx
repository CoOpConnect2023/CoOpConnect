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
    Form,
    SectionTitle,
    FormRow,
    FormField,
    Label,
    Input,
    Select,
    HorizontalRule,
    ButtonGroup,
    ActionButton,
    SubmitButton,
} from "./Styling/EditPost1.styles";

function EditPost1() {
    return (
        <NavBar header={"Edit Posting"}>
            <Container>
                <Card>
                    <FormWrapper>
                        <Title>Edit Your Posting</Title>
                        <Subtitle>
                            Edit your selected posting's information.
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
                                        id="jobTitle"
                                        name="jobTitle"
                                        aria-label="Job Title"
                                    />
                                </FormField>
                                <FormField>
                                    <Label htmlFor="companyName">
                                        Company *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        aria-label="Company Name"
                                    />
                                </FormField>
                            </FormRow>
                            <FormRow>
                                <FormField>
                                    <Label htmlFor="workplaceType">
                                        Workplace Type *
                                    </Label>
                                    <Select
                                        id="workplaceType"
                                        name="workplaceType"
                                        aria-label="Workplace Type"
                                    >
                                        <option value="onsite">Onsite</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                    </Select>
                                </FormField>
                                <FormField>
                                    <Label htmlFor="jobLocation">
                                        Job Location *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="jobLocation"
                                        name="jobLocation"
                                        aria-label="Job Location"
                                    />
                                </FormField>
                            </FormRow>
                            <HorizontalRule />
                            <ButtonGroup>
                                <ActionButton>Go Back</ActionButton>
                                <SubmitButton>Finished</SubmitButton>
                            </ButtonGroup>
                        </Form>
                    </FormWrapper>
                </Card>
            </Container>
        </NavBar>
    );
}

export default EditPost1;
